-- CreateEnum
CREATE TYPE "TicketType" AS ENUM ('PARKING_CHARGE_NOTICE', 'PENALTY_CHARGE_NOTICE');

-- CreateEnum
CREATE TYPE "LetterType" AS ENUM ('INITIAL_NOTICE', 'NOTICE_TO_OWNER', 'CHARGE_CERTIFICATE', 'ORDER_FOR_RECOVERY', 'CCJ_NOTICE', 'FINAL_DEMAND', 'BAILIFF_NOTICE', 'APPEAL_RESPONSE', 'GENERIC');

-- CreateEnum
CREATE TYPE "MediaType" AS ENUM ('IMAGE', 'VIDEO', 'AUDIO');

-- CreateEnum
CREATE TYPE "TicketStatus" AS ENUM ('REDUCED_PAYMENT_DUE', 'FULL_PAYMENT_DUE', 'NOTICE_TO_OWNER_SENT', 'APPEALED', 'APPEAL_REJECTED', 'APPEAL_ACCEPTED', 'TRIBUNAL_APPEAL_IN_PROGRESS', 'TRIBUNAL_APPEAL_ACCEPTED', 'TRIBUNAL_APPEAL_REJECTED', 'ORDER_FOR_RECOVERY', 'CCJ_PENDING', 'CCJ_ISSUED', 'PAID', 'CANCELLED');

-- CreateEnum
CREATE TYPE "IssuerType" AS ENUM ('COUNCIL', 'TFL', 'PRIVATE_COMPANY');

-- CreateEnum
CREATE TYPE "SubscriptionType" AS ENUM ('BASIC', 'PRO');

-- CreateEnum
CREATE TYPE "ReminderType" AS ENUM ('REDUCED_PAYMENT_DUE', 'FULL_PAYMENT_DUE', 'APPEAL_DEADLINE', 'NOTICE_TO_OWNER_RESPONSE', 'CHARGE_CERTIFICATE_RESPONSE', 'FORM_DEADLINE', 'OUT_OF_TIME_NOTICE');

-- CreateEnum
CREATE TYPE "NotificationType" AS ENUM ('EMAIL', 'SMS', 'ALL');

-- CreateEnum
CREATE TYPE "TransactionType" AS ENUM ('PURCHASE', 'CONSUME');

-- CreateEnum
CREATE TYPE "ProductType" AS ENUM ('PAY_PER_TICKET', 'PRO_MONTHLY', 'PRO_ANNUAL');

-- CreateEnum
CREATE TYPE "MediaSource" AS ENUM ('ISSUER', 'TICKET', 'LETTER', 'USER');

-- CreateEnum
CREATE TYPE "FormType" AS ENUM ('PE2', 'PE3', 'TE7', 'TE9');

-- CreateEnum
CREATE TYPE "PredictionType" AS ENUM ('CHALLENGE_SUCCESS');

-- CreateEnum
CREATE TYPE "VerificationType" AS ENUM ('VEHICLE', 'TICKET');

-- CreateEnum
CREATE TYPE "VerificationStatus" AS ENUM ('VERIFIED', 'UNVERIFIED', 'FAILED');

-- CreateEnum
CREATE TYPE "AmountIncreaseSourceType" AS ENUM ('LETTER', 'MANUAL_UPDATE', 'SYSTEM');

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phoneNumber" TEXT,
    "address" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "signatureUrl" TEXT,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "vehicles" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "make" TEXT NOT NULL,
    "model" TEXT NOT NULL,
    "bodyType" TEXT NOT NULL,
    "fuelType" TEXT NOT NULL,
    "year" INTEGER NOT NULL,
    "color" TEXT NOT NULL,
    "registrationNumber" TEXT NOT NULL,
    "notes" TEXT,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "vehicles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tickets" (
    "id" TEXT NOT NULL,
    "pcnNumber" TEXT NOT NULL,
    "contraventionCode" TEXT NOT NULL,
    "location" JSONB NOT NULL,
    "issuedAt" TIMESTAMP(3) NOT NULL,
    "contraventionAt" TIMESTAMP(3) NOT NULL,
    "observedAt" TIMESTAMP(3),
    "status" "TicketStatus" NOT NULL DEFAULT 'REDUCED_PAYMENT_DUE',
    "type" "TicketType" NOT NULL,
    "initialAmount" INTEGER NOT NULL,
    "currentAmount" INTEGER,
    "statusUpdatedAt" TIMESTAMP(3),
    "statusUpdatedBy" TEXT,
    "issuer" TEXT NOT NULL,
    "issuerType" "IssuerType" NOT NULL,
    "verified" BOOLEAN NOT NULL DEFAULT false,
    "vehicleId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "tickets_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "media" (
    "id" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "description" TEXT,
    "type" "MediaType" NOT NULL,
    "source" "MediaSource" NOT NULL,
    "ticketId" TEXT,
    "letterId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "media_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "letters" (
    "id" TEXT NOT NULL,
    "type" "LetterType" NOT NULL,
    "ticketId" TEXT NOT NULL,
    "extractedText" TEXT NOT NULL,
    "summary" TEXT NOT NULL,
    "sentAt" TIMESTAMP(3),
    "parsedStatus" "TicketStatus",
    "parsedAmount" INTEGER,
    "parsedAt" TIMESTAMP(3),
    "appealId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "letters_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "appeals" (
    "id" TEXT NOT NULL,
    "ticketId" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "letterId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "appeals_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "subscriptions" (
    "id" TEXT NOT NULL,
    "type" "SubscriptionType" NOT NULL DEFAULT 'BASIC',
    "stripeCustomerId" TEXT,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "subscriptions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "reminders" (
    "id" TEXT NOT NULL,
    "type" "ReminderType" NOT NULL,
    "notificationType" "NotificationType" DEFAULT 'EMAIL',
    "ticketId" TEXT NOT NULL,
    "sendAt" TIMESTAMP(3) NOT NULL,
    "sentAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "reminders_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "forms" (
    "id" TEXT NOT NULL,
    "ticketId" TEXT NOT NULL,
    "formType" "FormType" NOT NULL,
    "fileName" TEXT NOT NULL,
    "fileUrl" TEXT NOT NULL,
    "dueAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "forms_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "predictions" (
    "id" TEXT NOT NULL,
    "ticketId" TEXT NOT NULL,
    "type" "PredictionType" NOT NULL DEFAULT 'CHALLENGE_SUCCESS',
    "percentage" INTEGER NOT NULL DEFAULT 75,
    "numberOfCases" INTEGER NOT NULL DEFAULT 0,
    "confidence" DOUBLE PRECISION NOT NULL DEFAULT 0.8,
    "lastUpdated" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "metadata" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "predictions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "amount_increases" (
    "id" TEXT NOT NULL,
    "ticketId" TEXT NOT NULL,
    "amount" INTEGER NOT NULL,
    "reason" TEXT,
    "sourceType" "AmountIncreaseSourceType" NOT NULL,
    "sourceId" TEXT,
    "effectiveAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "letterId" TEXT,

    CONSTRAINT "amount_increases_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "verifications" (
    "id" TEXT NOT NULL,
    "type" "VerificationType" NOT NULL,
    "status" "VerificationStatus" NOT NULL DEFAULT 'UNVERIFIED',
    "verifiedAt" TIMESTAMP(3),
    "metadata" JSONB,
    "vehicleId" TEXT,
    "ticketId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "verifications_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "vehicles_registrationNumber_key" ON "vehicles"("registrationNumber");

-- CreateIndex
CREATE UNIQUE INDEX "tickets_pcnNumber_key" ON "tickets"("pcnNumber");

-- CreateIndex
CREATE UNIQUE INDEX "appeals_ticketId_key" ON "appeals"("ticketId");

-- CreateIndex
CREATE UNIQUE INDEX "subscriptions_stripeCustomerId_key" ON "subscriptions"("stripeCustomerId");

-- CreateIndex
CREATE UNIQUE INDEX "subscriptions_userId_key" ON "subscriptions"("userId");

-- CreateIndex
CREATE INDEX "reminders_ticketId_sendAt_idx" ON "reminders"("ticketId", "sendAt");

-- CreateIndex
CREATE UNIQUE INDEX "predictions_ticketId_key" ON "predictions"("ticketId");

-- CreateIndex
CREATE UNIQUE INDEX "amount_increases_letterId_key" ON "amount_increases"("letterId");

-- CreateIndex
CREATE INDEX "amount_increases_ticketId_effectiveAt_idx" ON "amount_increases"("ticketId", "effectiveAt");

-- CreateIndex
CREATE UNIQUE INDEX "verifications_vehicleId_key" ON "verifications"("vehicleId");

-- CreateIndex
CREATE UNIQUE INDEX "verifications_ticketId_key" ON "verifications"("ticketId");

-- CreateIndex
CREATE UNIQUE INDEX "verifications_type_vehicleId_ticketId_key" ON "verifications"("type", "vehicleId", "ticketId");

-- AddForeignKey
ALTER TABLE "vehicles" ADD CONSTRAINT "vehicles_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tickets" ADD CONSTRAINT "tickets_vehicleId_fkey" FOREIGN KEY ("vehicleId") REFERENCES "vehicles"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "media" ADD CONSTRAINT "media_letterId_fkey" FOREIGN KEY ("letterId") REFERENCES "letters"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "media" ADD CONSTRAINT "media_ticketId_fkey" FOREIGN KEY ("ticketId") REFERENCES "tickets"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "letters" ADD CONSTRAINT "letters_ticketId_fkey" FOREIGN KEY ("ticketId") REFERENCES "tickets"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "letters" ADD CONSTRAINT "letters_appealId_fkey" FOREIGN KEY ("appealId") REFERENCES "appeals"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "appeals" ADD CONSTRAINT "appeals_ticketId_fkey" FOREIGN KEY ("ticketId") REFERENCES "tickets"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "subscriptions" ADD CONSTRAINT "subscriptions_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reminders" ADD CONSTRAINT "reminders_ticketId_fkey" FOREIGN KEY ("ticketId") REFERENCES "tickets"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "forms" ADD CONSTRAINT "forms_ticketId_fkey" FOREIGN KEY ("ticketId") REFERENCES "tickets"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "predictions" ADD CONSTRAINT "predictions_ticketId_fkey" FOREIGN KEY ("ticketId") REFERENCES "tickets"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "amount_increases" ADD CONSTRAINT "amount_increases_ticketId_fkey" FOREIGN KEY ("ticketId") REFERENCES "tickets"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "amount_increases" ADD CONSTRAINT "amount_increases_letterId_fkey" FOREIGN KEY ("letterId") REFERENCES "letters"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "verifications" ADD CONSTRAINT "verifications_vehicleId_fkey" FOREIGN KEY ("vehicleId") REFERENCES "vehicles"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "verifications" ADD CONSTRAINT "verifications_ticketId_fkey" FOREIGN KEY ("ticketId") REFERENCES "tickets"("id") ON DELETE CASCADE ON UPDATE CASCADE;
