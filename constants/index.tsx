import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  TicketType,
  TicketStatus,
  IssuerType,
  Prisma,
  PredictionType,
} from '@prisma/client';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { faCreditCard, faUser } from '@fortawesome/pro-duotone-svg-icons';
import {
  faFacebookF,
  faInstagram,
  faThreads,
  faTiktok,
  faXTwitter,
} from '@fortawesome/free-brands-svg-icons';

export * from './prompts';
export * from './loadingMessages';
export * from './ticketTimelines';

export const PRIVATE_COMPANY_IDS = ['horizon', 'parkingEye'] as const;

export const TRANSPORT_AUTHORITY_IDS = ['tfl'] as const;

export const LOCAL_AUTHORITY_IDS = [
  'hartlepool',
  'middlesbrough',
  'redcar-and-cleveland',
  'stockton-on-tees',
  'darlington',
  'halton',
  'warrington',
  'blackburn-with-darwen',
  'blackpool',
  'kingston-upon-hull-city-of',
  'east-riding-of-yorkshire',
  'north-east-lincolnshire',
  'north-lincolnshire',
  'york',
  'derby',
  'leicester',
  'rutland',
  'nottingham',
  'herefordshire-county-of',
  'telford-and-wrekin',
  'stoke-on-trent',
  'bath-and-north-east-somerset',
  'bristol-city-of',
  'north-somerset',
  'south-gloucestershire',
  'plymouth',
  'torbay',
  'swindon',
  'peterborough',
  'luton',
  'southend-on-sea',
  'thurrock',
  'medway',
  'bracknell-forest',
  'west-berkshire',
  'reading',
  'slough',
  'windsor-and-maidenhead',
  'wokingham',
  'milton-keynes',
  'brighton-and-hove',
  'portsmouth',
  'southampton',
  'isle-of-wight',
  'county-durham',
  'cheshire-east',
  'cheshire-west-and-chester',
  'shropshire',
  'cornwall',
  'isles-of-scilly',
  'wiltshire',
  'bedford',
  'central-bedfordshire',
  'northumberland',
  'bournemouth-christchurch-and-poole',
  'dorset',
  'aylesbury-vale',
  'chiltern',
  'south-bucks',
  'wycombe',
  'cambridge',
  'east-cambridgeshire',
  'fenland',
  'huntingdonshire',
  'south-cambridgeshire',
  'allerdale',
  'barrow-in-furness',
  'carlisle',
  'copeland',
  'eden',
  'south-lakeland',
  'amber-valley',
  'bolsover',
  'chesterfield',
  'derbyshire-dales',
  'erewash',
  'high-peak',
  'north-east-derbyshire',
  'south-derbyshire',
  'east-devon',
  'exeter',
  'mid-devon',
  'north-devon',
  'south-hams',
  'teignbridge',
  'torridge',
  'west-devon',
  'eastbourne',
  'hastings',
  'lewes',
  'rother',
  'wealden',
  'basildon',
  'braintree',
  'brentwood',
  'castle-point',
  'chelmsford',
  'colchester',
  'epping-forest',
  'harlow',
  'maldon',
  'rochford',
  'tendring',
  'uttlesford',
  'cheltenham',
  'cotswold',
  'forest-of-dean',
  'gloucester',
  'stroud',
  'tewkesbury',
  'basingstoke-and-deane',
  'east-hampshire',
  'eastleigh',
  'fareham',
  'gosport',
  'hart',
  'havant',
  'new-forest',
  'rushmoor',
  'test-valley',
  'winchester',
  'broxbourne',
  'dacorum',
  'hertsmere',
  'north-hertfordshire',
  'three-rivers',
  'watford',
  'ashford',
  'canterbury',
  'dartford',
  'dover',
  'gravesham',
  'maidstone',
  'sevenoaks',
  'folkestone-and-hythe',
  'swale',
  'thanet',
  'tonbridge-and-malling',
  'tunbridge-wells',
  'burnley',
  'chorley',
  'fylde',
  'hyndburn',
  'lancaster',
  'pendle',
  'preston',
  'ribble-valley',
  'rossendale',
  'south-ribble',
  'west-lancashire',
  'wyre',
  'blaby',
  'charnwood',
  'harborough',
  'hinckley-and-bosworth',
  'melton',
  'north-west-leicestershire',
  'oadby-and-wigston',
  'boston',
  'east-lindsey',
  'lincoln',
  'north-kesteven',
  'south-holland',
  'south-kesteven',
  'west-lindsey',
  'breckland',
  'broadland',
  'great-yarmouth',
  'kings-lynn-and-west-norfolk',
  'north-norfolk',
  'norwich',
  'south-norfolk',
  'corby',
  'daventry',
  'east-northamptonshire',
  'kettering',
  'northampton',
  'south-northamptonshire',
  'wellingborough',
  'craven',
  'hambleton',
  'harrogate',
  'richmondshire',
  'ryedale',
  'scarborough',
  'selby',
  'ashfield',
  'bassetlaw',
  'broxtowe',
  'gedling',
  'mansfield',
  'newark-and-sherwood',
  'rushcliffe',
  'cherwell',
  'oxford',
  'south-oxfordshire',
  'vale-of-white-horse',
  'west-oxfordshire',
  'mendip',
  'sedgemoor',
  'south-somerset',
  'cannock-chase',
  'east-staffordshire',
  'lichfield',
  'newcastle-under-lyme',
  'south-staffordshire',
  'stafford',
  'staffordshire-moorlands',
  'tamworth',
  'babergh',
  'ipswich',
  'mid-suffolk',
  'elmbridge',
  'epsom-and-ewell',
  'guildford',
  'mole-valley',
  'reigate-and-banstead',
  'runnymede',
  'spelthorne',
  'surrey-heath',
  'tandridge',
  'waverley',
  'woking',
  'north-warwickshire',
  'nuneaton-and-bedworth',
  'rugby',
  'stratford-on-avon',
  'warwick',
  'adur',
  'arun',
  'chichester',
  'crawley',
  'horsham',
  'mid-sussex',
  'worthing',
  'bromsgrove',
  'malvern-hills',
  'redditch',
  'worcester',
  'wychavon',
  'wyre-forest',
  'st-albans',
  'welwyn-hatfield',
  'east-hertfordshire',
  'stevenage',
  'east-suffolk',
  'west-suffolk',
  'somerset-west-and-taunton',
  'bolton',
  'bury',
  'manchester',
  'oldham',
  'rochdale',
  'salford',
  'stockport',
  'tameside',
  'trafford',
  'wigan',
  'knowsley',
  'liverpool',
  'st-helens',
  'sefton',
  'wirral',
  'barnsley',
  'doncaster',
  'rotherham',
  'sheffield',
  'newcastle-upon-tyne',
  'north-tyneside',
  'south-tyneside',
  'sunderland',
  'birmingham',
  'coventry',
  'dudley',
  'sandwell',
  'solihull',
  'walsall',
  'wolverhampton',
  'bradford',
  'calderdale',
  'kirklees',
  'leeds',
  'wakefield',
  'gateshead',
  'city-of-london',
  'barking-and-dagenham',
  'barnet',
  'bexley',
  'brent',
  'bromley',
  'camden',
  'croydon',
  'ealing',
  'enfield',
  'greenwich',
  'hackney',
  'hammersmith-and-fulham',
  'haringey',
  'harrow',
  'havering',
  'hillingdon',
  'hounslow',
  'islington',
  'kensington-and-chelsea',
  'kingston-upon-thames',
  'lambeth',
  'lewisham',
  'merton',
  'newham',
  'redbridge',
  'richmond-upon-thames',
  'southwark',
  'sutton',
  'tower-hamlets',
  'waltham-forest',
  'wandsworth',
  'westminster',
  'buckinghamshire',
  'north-northamptonshire',
  'west-northamptonshire',
  'bournemouth',
  'poole',
  'northumberland',
  'christchurch',
  'east-dorset',
  'north-dorset',
  'purbeck',
  'west-dorset',
  'weymouth-and-portland',
  'east-hertfordshire',
  'st-albans',
  'stevenage',
  'welwyn-hatfield',
  'taunton-deane',
  'west-somerset',
  'forest-heath',
  'st-edmundsbury',
  'suffolk-coastal',
  'waveney',
  'gateshead',
  'cumberland',
  'westmorland-and-furness',
  'north-yorkshire',
  'somerset',
] as const;

export type LocalAuthorityId = (typeof LOCAL_AUTHORITY_IDS)[number];
export type PrivateCompanyId = (typeof PRIVATE_COMPANY_IDS)[number];
export type TransportAuthorityId = (typeof TRANSPORT_AUTHORITY_IDS)[number];

export type LocalAuthority = {
  id: LocalAuthorityId;
  name: string;
  region: string;
  type: IssuerType;
  websiteUrl: string;
  matchPatterns: RegExp[];
};

export type PrivateCompany = {
  id: PrivateCompanyId;
  name: string;
  type: IssuerType;
  matchPatterns: RegExp[];
};

export type TransportAuthority = {
  id: TransportAuthorityId;
  name: string;
  type: IssuerType;
  matchPatterns: RegExp[];
};

export const NAVIGATION_ITEMS = [
  {
    id: '1',
    label: 'Account',
    component: (
      <FontAwesomeIcon
        icon={faUser as IconProp}
        size="xl"
        className="text-black"
      />
    ),
    href: '/account',
  },
  {
    id: '2',
    label: 'Billing',
    component: (
      <FontAwesomeIcon
        icon={faCreditCard as IconProp}
        size="xl"
        className="text-black"
      />
    ),
    href: '/billing',
  },
];

export const AUTHENTICATED_PATHS = [
  '/dashboard',
  '/account',
  /\/ticket\/[a-zA-Z0-9]+/,
  '/billing',
  '/upload',
];

export const TICKET_TYPE: Record<TicketType, string> = {
  [TicketType.PARKING_CHARGE_NOTICE]: 'Parking Charge Notice',
  [TicketType.PENALTY_CHARGE_NOTICE]: 'Penalty Charge Notice',
};

export const TICKET_STATUS: Record<TicketStatus, string> = {
  [TicketStatus.REDUCED_PAYMENT_DUE]: 'Reduced Payment Due',
  [TicketStatus.FULL_PAYMENT_DUE]: 'Full Payment Due',
  [TicketStatus.NOTICE_TO_OWNER_SENT]: 'Notice to Owner Sent',

  // Appeals Process
  [TicketStatus.APPEALED]: 'Appealed',
  [TicketStatus.APPEAL_ACCEPTED]: 'Appeal Accepted',
  [TicketStatus.APPEAL_REJECTED]: 'Appeal Rejected',

  // Post-Notice Appeals (Tribunal/POPLA)
  [TicketStatus.TRIBUNAL_APPEAL_IN_PROGRESS]: 'Tribunal Appeal In Progress',
  [TicketStatus.TRIBUNAL_APPEAL_ACCEPTED]: 'Tribunal Appeal Accepted',
  [TicketStatus.TRIBUNAL_APPEAL_REJECTED]: 'Tribunal Appeal Rejected',

  // Escalation
  [TicketStatus.ORDER_FOR_RECOVERY]: 'Order for Recovery',
  [TicketStatus.CCJ_PENDING]: 'CCJ Pending',
  [TicketStatus.CCJ_ISSUED]: 'CCJ Issued',

  // Resolution
  [TicketStatus.PAID]: 'Paid',
  [TicketStatus.CANCELLED]: 'Cancelled',
};

export const LOCAL_AUTHORITIES: ReadonlyArray<LocalAuthority> = [
  {
    id: 'lewisham',
    name: 'Lewisham',
    region: 'London',
    type: IssuerType.COUNCIL,
    websiteUrl: 'https://lewisham.gov.uk',
    matchPatterns: [/lewisham/i],
  },
  {
    id: 'lambeth',
    name: 'Lambeth',
    region: 'London',
    type: IssuerType.COUNCIL,
    websiteUrl: 'https://lambeth.gov.uk',
    matchPatterns: [/lambeth/i],
  },
  {
    id: 'camden',
    name: 'Camden',
    region: 'London',
    type: IssuerType.COUNCIL,
    websiteUrl: 'https://camden.gov.uk',
    matchPatterns: [/camden/i],
  },
  {
    id: 'hackney',
    name: 'Hackney',
    region: 'London',
    type: IssuerType.COUNCIL,
    websiteUrl: 'https://hackney.gov.uk',
    matchPatterns: [/hackney/i],
  },
  {
    id: 'islington',
    name: 'Islington',
    region: 'London',
    type: IssuerType.COUNCIL,
    websiteUrl: 'https://islington.gov.uk',
    matchPatterns: [/islington/i],
  },
] as const;

export const PRIVATE_COMPANIES: ReadonlyArray<PrivateCompany> = [
  {
    id: 'horizon',
    name: 'Horizon Parking',
    type: IssuerType.PRIVATE_COMPANY,
    matchPatterns: [/horizon parking/i, /horizon/i],
  },
  {
    id: 'parkingEye',
    name: 'ParkingEye',
    type: IssuerType.PRIVATE_COMPANY,
    matchPatterns: [/parking\s*eye/i, /parkingeye ltd/i],
  },
] as const;

export const TRANSPORT_AUTHORITIES: ReadonlyArray<TransportAuthority> = [
  {
    id: 'tfl',
    name: 'Transport for London',
    type: IssuerType.TFL,
    matchPatterns: [/transport for london/i, /tfl/i],
  },
] as const;

export type AutomationIssuerId =
  | LocalAuthorityId
  | PrivateCompanyId
  | TransportAuthorityId;

export const AUTOMATIONS: Partial<
  Record<
    AutomationIssuerId,
    {
      challengeUrl: string;
      verifyUrl: string;
    }
  >
> = {
  lewisham: {
    challengeUrl: 'https://pcnevidence.lewisham.gov.uk/pcnonline/index.php',
    verifyUrl: 'https://pcnevidence.lewisham.gov.uk/pcnonline/index.php',
  },
  horizon: {
    challengeUrl: 'https://horizonparkingportal.co.uk/#manage',
    verifyUrl: 'https://horizonparkingportal.co.uk/#manage',
  },
};

export const ISSUERS = [
  ...LOCAL_AUTHORITIES,
  ...PRIVATE_COMPANIES,
  ...TRANSPORT_AUTHORITIES,
] as const;

// Helper to check if an issuer supports automation
export const isAutomationSupported = (
  issuerId: string,
): issuerId is AutomationIssuerId =>
  !!AUTOMATIONS[issuerId as AutomationIssuerId];

export const findIssuer = (text: string) =>
  ISSUERS.find((issuer) =>
    issuer.matchPatterns.some((pattern: RegExp) => pattern.test(text)),
  );

export const COUNCIL_CHALLENGE_REASONS = {
  CONTRAVENTION_DID_NOT_OCCUR: {
    id: 'CONTRAVENTION_DID_NOT_OCCUR',
    label: 'The contravention did not occur',
    description:
      'Use this if you believe no parking violation actually took place',
  },
  NOT_VEHICLE_OWNER: {
    id: 'NOT_VEHICLE_OWNER',
    label: 'I was not the owner of the vehicle at the time',
    description:
      'Select if you had sold or transferred the vehicle before the ticket was issued',
  },
  VEHICLE_STOLEN: {
    id: 'VEHICLE_STOLEN',
    label: 'The vehicle had been taken without consent',
    description:
      'Use if the vehicle was reported as stolen at the time of the contravention',
  },
  HIRE_FIRM: {
    id: 'HIRE_FIRM',
    label: 'We are a hire firm and will provide details of the hirer',
    description: 'For vehicle rental companies only',
  },
  EXCEEDED_AMOUNT: {
    id: 'EXCEEDED_AMOUNT',
    label: 'The PCN exceeded the amount applicable',
    description:
      'Use if you believe the fine amount is higher than legally allowed',
  },
  ALREADY_PAID: {
    id: 'ALREADY_PAID',
    label: 'The PCN has been paid',
    description: 'Select if you have already paid this penalty',
  },
  INVALID_TMO: {
    id: 'INVALID_TMO',
    label: 'The Traffic Management Order is invalid',
    description:
      'Use if you believe the parking restriction itself is not legally valid',
  },
  PROCEDURAL_IMPROPRIETY: {
    id: 'PROCEDURAL_IMPROPRIETY',
    label: 'There has been a procedural impropriety',
    description:
      'Select if proper procedures were not followed when issuing the ticket',
  },
} as const;

export const PRIVATE_CHALLENGE_REASONS = {
  NO_BREACH_CONTRACT: {
    id: 'NO_BREACH_CONTRACT',
    label: 'No breach of contract occurred',
    description: 'The parking terms and conditions were not breached',
  },
  NOT_VEHICLE_KEEPER: {
    id: 'NOT_VEHICLE_KEEPER',
    label: 'I was not the keeper/owner of the vehicle at the time',
    description:
      'The vehicle was sold/transferred before the ticket was issued',
  },
  VEHICLE_STOLEN: {
    id: 'VEHICLE_STOLEN',
    label: 'The vehicle was stolen/taken without consent',
    description: 'The vehicle was reported as stolen at the time',
  },
  UNCLEAR_SIGNAGE: {
    id: 'UNCLEAR_SIGNAGE',
    label: 'Signs were unclear or inadequate',
    description: 'Parking terms were not clearly displayed or visible',
  },
  BROKEN_EQUIPMENT: {
    id: 'BROKEN_EQUIPMENT',
    label: 'Payment equipment was not working',
    description: 'Parking meters, machines or apps were faulty',
  },
  MITIGATING_CIRCUMSTANCES: {
    id: 'MITIGATING_CIRCUMSTANCES',
    label: 'Mitigating circumstances',
    description: 'Emergency situations or other exceptional circumstances',
  },
  ALREADY_PAID: {
    id: 'ALREADY_PAID',
    label: 'Payment was made correctly',
    description: 'You paid for parking and can provide evidence',
  },
  EXCESSIVE_CHARGE: {
    id: 'EXCESSIVE_CHARGE',
    label: 'The charge is excessive',
    description: 'The penalty amount is not a genuine pre-estimate of loss',
  },
} as const;

export type CouncilChallengeReason = keyof typeof COUNCIL_CHALLENGE_REASONS;
export type PrivateChallengeReason = keyof typeof PRIVATE_CHALLENGE_REASONS;

export const getChallengeReasons = (issuerType: IssuerType) => {
  switch (issuerType) {
    case IssuerType.COUNCIL:
    case IssuerType.TFL:
      return COUNCIL_CHALLENGE_REASONS;
    case IssuerType.PRIVATE_COMPANY:
      return PRIVATE_CHALLENGE_REASONS;
    default:
      throw new Error(`Unknown issuer type: ${issuerType}`);
  }
};

export const CONTRAVENTION_CODES = {
  '01': {
    code: '01',
    description: 'Parked in a restricted street during prescribed hours',
    suffixes: ['a', 'j', 'o', 'y', 'z'],
    notes:
      'Code-specific suffixes apply. Suffixes y and z for disabled badge holders only.',
  },
  '02': {
    code: '02',
    description:
      'Parked or loading/unloading in a restricted street where waiting and loading/unloading restrictions are in force',
    suffixes: ['a', 'j', 'o'],
    notes: 'Code-specific suffixes apply.',
  },
  '12': {
    code: '12',
    description:
      "Parked in a residents' or shared use parking place or zone without a valid virtual permit or clearly displaying a valid physical permit or voucher or pay and display ticket issued for that place where required, or without payment of the parking charge",
    suffixes: ['a', 'r', 's', 't', 'u', 'w', 'y', '4'],
    notes: 'Code-specific suffixes apply.',
  },
  '14': {
    code: '14',
    description:
      "Parked in an electric vehicles' charging place during restricted hours without charging",
    suffixes: ['a', 'y', '8', '9'],
    notes: '',
  },
  '16': {
    code: '16',
    description:
      'Parked in a permit space or zone without a valid virtual permit or clearly displaying a valid physical permit where required',
    suffixes: [
      'a',
      'b',
      'd',
      'e',
      'h',
      'q',
      's',
      't',
      'w',
      'x',
      'y',
      'z',
      '4',
      '5',
      '6',
      '9',
    ],
    notes:
      "Code-specific suffixes apply. Suffix 's' only for use where bay is completely non-resident.",
  },
  '18': {
    code: '18',
    description:
      'Using a vehicle in a parking place in connection with the sale or offering or exposing for sale of goods when prohibited',
    suffixes: [
      'a',
      'b',
      'c',
      'd',
      'e',
      'f',
      'g',
      'h',
      'm',
      'p',
      'r',
      's',
      'v',
      'x',
      'y',
      '1',
      '2',
      '3',
      '5',
      '6',
      '7',
      '8',
      '9',
    ],
    notes: '',
  },
  '20': {
    code: '20',
    description:
      'Parked in a part of a parking place marked by a yellow line where waiting is prohibited',
    suffixes: [],
    notes: '',
  },
  '21': {
    code: '21',
    description: 'Parked wholly or partly in a suspended bay or space',
    suffixes: [
      'a',
      'b',
      'c',
      'd',
      'e',
      'f',
      'g',
      'h',
      'l',
      'm',
      'n',
      'p',
      'q',
      'r',
      's',
      'u',
      'v',
      'x',
      'y',
      '1',
      '2',
      '5',
      '6',
      '7',
      '8',
      '9',
    ],
    notes: '',
  },
  '23': {
    code: '23',
    description:
      'Parked in a parking place or area not designated for that class of vehicle',
    suffixes: [
      'a',
      'b',
      'c',
      'd',
      'e',
      'f',
      'g',
      'h',
      'k',
      'l',
      'p',
      'r',
      's',
      'v',
      'w',
      'x',
      'y',
      '1',
      '2',
      '3',
      '7',
      '8',
      '9',
    ],
    notes: 'Suffix required to fully describe contravention',
  },
  '25': {
    code: '25',
    description:
      'Parked in a loading place or bay during restricted hours without loading',
    suffixes: ['n', '2'],
    notes: 'On-street loading bay or place',
  },
  '26': {
    code: '26',
    description:
      'Parked in a special enforcement area more than 50cm from the edge of the carriageway and not within a designated parking place',
    suffixes: ['n'],
    notes: '',
  },
  '27': {
    code: '27',
    description:
      'Parked in a special enforcement area adjacent to a footway, cycle track or verge lowered to meet the level of the carriageway',
    suffixes: ['n', 'o'],
    notes: '',
  },
  '28': {
    code: '28',
    description:
      'Parked in a special enforcement area on part of the carriageway raised to meet the level of a footway, cycle track or verge',
    suffixes: ['n', 'o'],
    notes: '',
  },
  '40': {
    code: '40',
    description:
      "Parked in a designated disabled person's parking place without displaying a valid disabled person's badge",
    suffixes: ['n'],
    notes: '',
  },
  '41': {
    code: '41',
    description:
      'Stopped in a parking place designated for diplomatic vehicles',
    suffixes: [],
    notes: '',
  },
  '42': {
    code: '42',
    description: 'Parked in a parking place designated for police vehicles',
    suffixes: [],
    notes: '',
  },
  '43': {
    code: '43',
    description: 'Stopped on a cycle docking station parking place',
    suffixes: [],
    notes: '',
  },
  '45': {
    code: '45',
    description: 'Stopped on a taxi rank',
    suffixes: ['n', 'w'],
    notes: "'Stopped' may be varied to 'waiting'",
  },
  '46': {
    code: '46',
    description: 'Stopped where prohibited (on a red route or clearway)',
    suffixes: ['n'],
    notes: '',
  },
  '47': {
    code: '47',
    description: 'Stopped on a restricted bus stop or stand',
    suffixes: ['j', 'n'],
    notes: '',
  },
  '48': {
    code: '48',
    description:
      'Stopped in a restricted area outside a school, a hospital or a fire, police or ambulance station when prohibited',
    suffixes: ['j'],
    notes: 'CCTV can be used on a restricted area outside a school only',
  },
  '49': {
    code: '49',
    description: 'Parked wholly or partly on a cycle track or lane',
    suffixes: ['j'],
    notes: '',
  },
  '55': {
    code: '55',
    description:
      'A commercial vehicle parked in a restricted street in contravention of the overnight waiting ban',
    suffixes: [],
    notes: '',
  },
  '56': {
    code: '56',
    description:
      'Parked in contravention of a commercial vehicle waiting restriction',
    suffixes: [],
    notes: 'Non-overnight waiting restriction',
  },
  '57': {
    code: '57',
    description: 'Parked in contravention of a bus ban',
    suffixes: [],
    notes: 'Non-overnight waiting restriction',
  },
  '61': {
    code: '61',
    description:
      'A heavy commercial vehicle wholly or partly parked on a footway, verge or land between two carriageways',
    suffixes: ['1', '2', '4', 'c', 'g', 'n'],
    notes: 'Code-specific suffixes apply',
  },
  '62': {
    code: '62',
    description:
      'Parked with one or more wheels on or over a footpath or any part of a road other than a carriageway',
    suffixes: ['1', '2', '4', 'c', 'g', 'n'],
    notes: 'Code-specific suffixes apply',
  },
  '99': {
    code: '99',
    description:
      'Stopped on a pedestrian crossing or crossing area marked by zigzags',
    suffixes: ['n', 'o'],
    notes: 'Pedestrian crossings',
  },
  '70': {
    code: '70',
    description:
      'Parked in a loading place or bay during restricted hours without loading',
    suffixes: [],
    notes: 'Off-street loading areas',
  },
  '71': {
    code: '71',
    description:
      "Parked in an electric vehicles' charging place during restricted hours without charging",
    suffixes: [],
    notes: 'Off-street car parks',
  },
  '74': {
    code: '74',
    description:
      'Using a vehicle in a parking place in connection with the sale or offering or exposing for sale of goods when prohibited',
    suffixes: ['p', 'r', 's'],
    notes: 'Off-street car parks',
  },
  '78': {
    code: '78',
    description: 'Parked wholly or partly in a suspended bay or space',
    suffixes: [
      'a',
      'b',
      'd',
      'e',
      'f',
      'g',
      'h',
      'k',
      'l',
      'p',
      'q',
      'u',
      'v',
      '1',
      '5',
      '6',
      '7',
      '8',
      '9',
    ],
    notes: 'Off-street car parks',
  },
  '81': {
    code: '81',
    description:
      'Parked in a restricted area in an off-street car park or housing estate',
    suffixes: ['o'],
    notes: 'Off-street car parks',
  },
  '85': {
    code: '85',
    description:
      'Parked without a valid virtual permit or clearly displaying a valid physical permit where required',
    suffixes: ['a', 'b', 't', 'r', 'w', 'y', 'z', '4', '5'],
    notes: 'Off-street car parks. Code-specific suffixes apply',
  },
  '87': {
    code: '87',
    description:
      "Parked in a designated disabled person's parking place without displaying a valid disabled person's badge",
    suffixes: [],
    notes: 'Off-street car parks',
  },
  '89': {
    code: '89',
    description:
      'Vehicle parked exceeds maximum weight or height or length permitted',
    suffixes: [],
    notes: 'Off-street car parks',
  },
  '91': {
    code: '91',
    description:
      'Parked in a car park or area not designated for that class of vehicle',
    suffixes: ['c', 'g'],
    notes: 'Off-street car parks',
  },
  '92': {
    code: '92',
    description: 'Parked causing an obstruction',
    suffixes: ['o'],
    notes: 'Off-street car parks',
  },
} as const;

export const CONTRAVENTION_CODES_OPTIONS: ReadonlyArray<{
  value: string;
  label: string;
}> = Object.entries(CONTRAVENTION_CODES).flatMap(([code, data]) => {
  // Create base code option
  const options = [
    {
      value: code,
      label: `${code} - ${data.description}`,
    },
  ];

  // Add suffix variations
  if (data.suffixes) {
    data.suffixes.forEach((suffix) => {
      options.push({
        value: `${code}${suffix}`,
        label: `${code}${suffix} - ${data.description}`,
      });
    });
  }

  return options;
});

export const CHATGPT_MODEL = 'gpt-4o';

export const STRIPE_API_VERSION = '2025-05-28.basil';

export const DUMMY_TICKET: Prisma.TicketGetPayload<{
  include: {
    vehicle: true;
    prediction: true;
  };
}> = {
  id: '1',
  pcnNumber: 'PCN12345678',
  contraventionCode: '01',
  location: {
    line1: '123 High Street',
    line2: '',
    city: 'London',
    county: 'Greater London',
    postcode: 'SW1A 1AA',
    country: 'United Kingdom',
    coordinates: {
      latitude: 51.5074,
      longitude: -0.1278,
    },
  },
  issuedAt: new Date('2025-02-28'),
  contraventionAt: new Date('2025-02-28'),
  observedAt: new Date('2025-02-28'),
  status: TicketStatus.REDUCED_PAYMENT_DUE,
  type: TicketType.PENALTY_CHARGE_NOTICE,
  initialAmount: 70,
  issuer: 'Local Council',
  issuerType: IssuerType.COUNCIL,
  vehicleId: '1',
  verified: false,
  createdAt: new Date('2025-02-28'),
  updatedAt: new Date('2025-02-28'),
  extractedText: '',
  statusUpdatedAt: new Date('2025-02-28'),
  statusUpdatedBy: 'system',
  prediction: {
    id: '1',
    type: PredictionType.CHALLENGE_SUCCESS,
    percentage: 75,
    numberOfCases: 0,
    confidence: 0.8,
    metadata: {},
    createdAt: new Date('2025-02-28'),
    updatedAt: new Date('2025-02-28'),
    ticketId: '1',
    lastUpdated: new Date('2025-02-28'),
  },
  vehicle: {
    id: '1',
    userId: 'user1',
    make: 'Toyota',
    model: 'Corolla',
    bodyType: 'Sedan',
    fuelType: 'Petrol',
    year: 2020,
    color: 'Silver',
    registrationNumber: 'AB12 CDE',
    active: true,
    notes: '',
    createdAt: new Date('2025-01-01'),
    updatedAt: new Date('2025-01-01'),
  },
};

export const DUMMY_TICKETS_LIST: Prisma.TicketGetPayload<{
  include: {
    vehicle: {
      select: {
        id: true;
        registrationNumber: true;
      };
    };
    prediction: true;
  };
}>[] = [
  {
    id: '1',
    pcnNumber: 'PCN12345678',
    contraventionCode: '01',
    location: {
      line1: '123 High Street',
      line2: '',
      city: 'London',
      county: 'Greater London',
      postcode: 'SW1A 1AA',
      country: 'United Kingdom',
      coordinates: {
        latitude: 51.5074,
        longitude: -0.1278,
      },
    },
    issuedAt: new Date('2025-02-28'),
    contraventionAt: new Date('2025-02-28'),
    observedAt: new Date('2025-02-28'),
    status: TicketStatus.REDUCED_PAYMENT_DUE,
    type: TicketType.PENALTY_CHARGE_NOTICE,
    initialAmount: 70,
    issuer: 'Local Council',
    issuerType: IssuerType.COUNCIL,
    vehicleId: '1',
    verified: false,
    createdAt: new Date('2025-02-28'),
    updatedAt: new Date('2025-02-28'),
    extractedText: '',
    statusUpdatedAt: new Date('2025-02-28'),
    statusUpdatedBy: 'system',
    vehicle: {
      id: '1',
      registrationNumber: 'AB12 CDE',
    },
    prediction: {
      id: '1',
      type: PredictionType.CHALLENGE_SUCCESS,
      percentage: 75,
      numberOfCases: 0,
      confidence: 0.8,
      metadata: {},
      createdAt: new Date('2025-02-28'),
      updatedAt: new Date('2025-02-28'),
      ticketId: '1',
      lastUpdated: new Date('2025-02-28'),
    },
  },
  {
    id: '2',
    pcnNumber: 'PCN87654321',
    contraventionCode: '12',
    location: {
      line1: '45 Shopping Centre Car Park',
      line2: 'Level 2',
      city: 'London',
      county: 'Greater London',
      postcode: 'W1T 1JY',
      country: 'United Kingdom',
      coordinates: {
        latitude: 51.5152,
        longitude: -0.1315,
      },
    },
    issuedAt: new Date('2025-02-15'),
    contraventionAt: new Date('2025-02-15'),
    observedAt: new Date('2025-02-15'),
    status: TicketStatus.PAID,
    type: TicketType.PARKING_CHARGE_NOTICE,
    initialAmount: 50,
    issuer: 'Private Parking Company',
    issuerType: IssuerType.PRIVATE_COMPANY,
    vehicleId: '2',
    verified: true,
    createdAt: new Date('2025-02-15'),
    updatedAt: new Date('2025-02-15'),
    extractedText: '',
    statusUpdatedAt: new Date('2025-02-15'),
    statusUpdatedBy: 'system',
    vehicle: {
      id: '2',
      registrationNumber: 'EF34 GHI',
    },
    prediction: {
      id: '2',
      type: PredictionType.CHALLENGE_SUCCESS,
      percentage: 75,
      numberOfCases: 0,
      confidence: 0.8,
      metadata: {},
      createdAt: new Date('2025-02-15'),
      updatedAt: new Date('2025-02-15'),
      ticketId: '2',
      lastUpdated: new Date('2025-02-15'),
    },
  },
  {
    id: '3',
    pcnNumber: 'PCN23456789',
    contraventionCode: '23',
    location: {
      line1: '78 Residential Zone B',
      line2: '',
      city: 'London',
      county: 'Greater London',
      postcode: 'E1 6AN',
      country: 'United Kingdom',
      coordinates: {
        latitude: 51.5194,
        longitude: -0.0738,
      },
    },
    issuedAt: new Date('2025-01-10'),
    contraventionAt: new Date('2025-01-10'),
    observedAt: new Date('2025-01-10'),
    status: TicketStatus.NOTICE_TO_OWNER_SENT,
    type: TicketType.PENALTY_CHARGE_NOTICE,
    initialAmount: 120,
    issuer: 'County Council',
    issuerType: IssuerType.COUNCIL,
    vehicleId: '3',
    verified: false,
    createdAt: new Date('2025-01-10'),
    updatedAt: new Date('2025-01-10'),
    extractedText: '',
    statusUpdatedAt: new Date('2025-01-10'),
    statusUpdatedBy: 'system',
    vehicle: {
      id: '3',
      registrationNumber: 'CD56 EFG',
    },
    prediction: {
      id: '3',
      type: PredictionType.CHALLENGE_SUCCESS,
      percentage: 75,
      numberOfCases: 0,
      confidence: 0.8,
      metadata: {},
      createdAt: new Date('2025-01-10'),
      updatedAt: new Date('2025-01-10'),
      ticketId: '3',
      lastUpdated: new Date('2025-01-10'),
    },
  },
  {
    id: '4',
    pcnNumber: 'PCN34567890',
    contraventionCode: '16',
    location: {
      line1: '92 Main Road',
      line2: 'Corner of Church Street',
      city: 'London',
      county: 'Greater London',
      postcode: 'SE1 9SG',
      country: 'United Kingdom',
      coordinates: {
        latitude: 51.5031,
        longitude: -0.0876,
      },
    },
    issuedAt: new Date('2025-03-05'),
    contraventionAt: new Date('2025-03-05'),
    observedAt: new Date('2025-03-05'),
    status: TicketStatus.APPEALED,
    type: TicketType.PENALTY_CHARGE_NOTICE,
    initialAmount: 90,
    issuer: 'City Council',
    issuerType: IssuerType.COUNCIL,
    vehicleId: '4',
    verified: false,
    createdAt: new Date('2025-03-05'),
    updatedAt: new Date('2025-03-05'),
    extractedText: '',
    statusUpdatedAt: new Date('2025-03-05'),
    statusUpdatedBy: 'system',
    vehicle: {
      id: '4',
      registrationNumber: 'GH78 IJK',
    },
    prediction: {
      id: '4',
      type: PredictionType.CHALLENGE_SUCCESS,
      percentage: 75,
      numberOfCases: 0,
      confidence: 0.8,
      metadata: {},
      createdAt: new Date('2025-03-05'),
      updatedAt: new Date('2025-03-05'),
      ticketId: '4',
      lastUpdated: new Date('2025-03-05'),
    },
  },
  {
    id: '5',
    pcnNumber: 'PCN45678901',
    contraventionCode: '99',
    location: {
      line1: '156 High Street Bus Lane',
      line2: '',
      city: 'London',
      county: 'Greater London',
      postcode: 'N1 7QP',
      country: 'United Kingdom',
      coordinates: {
        latitude: 51.5385,
        longitude: -0.0963,
      },
    },
    issuedAt: new Date('2025-03-10'),
    contraventionAt: new Date('2025-03-10'),
    observedAt: new Date('2025-03-10'),
    status: TicketStatus.TRIBUNAL_APPEAL_IN_PROGRESS,
    type: TicketType.PENALTY_CHARGE_NOTICE,
    initialAmount: 110,
    issuer: 'Transport for London',
    issuerType: IssuerType.TFL,
    vehicleId: '5',
    verified: true,
    createdAt: new Date('2025-03-10'),
    updatedAt: new Date('2025-03-10'),
    extractedText: '',
    statusUpdatedAt: new Date('2025-03-10'),
    statusUpdatedBy: 'system',
    vehicle: {
      id: '5',
      registrationNumber: 'LM90 NOP',
    },
    prediction: {
      id: '5',
      type: PredictionType.CHALLENGE_SUCCESS,
      percentage: 75,
      numberOfCases: 0,
      confidence: 0.8,
      metadata: {},
      createdAt: new Date('2025-03-10'),
      updatedAt: new Date('2025-03-10'),
      ticketId: '5',
      lastUpdated: new Date('2025-03-10'),
    },
  },
];

export const USER_SIGNATURE_PATH = 'users/%s/profile/signature.svg';

export const STORAGE_PATHS = {
  // Temporary uploads (auto-cleanup after 48 hours)
  TEMP_UPLOAD: 'temp/%s/%s.%s', // temp/{userId}/{timestamp}.{extension}

  // User profile files
  USER_AVATAR: 'users/%s/profile/avatar.%s',
  USER_SIGNATURE: 'users/%s/profile/signature.svg',

  // Ticket-related files (organized by ticketId)
  TICKET_IMAGE: 'users/%s/tickets/%s/images/ticket-front.%s',
  TICKET_FORM: 'users/%s/tickets/%s/forms/%s-%s-%s-%s.pdf',
  TICKET_EVIDENCE: 'users/%s/tickets/%s/evidence/evidence-%s.jpg',
  TICKET_SCREENSHOT: 'users/%s/tickets/%s/evidence/screenshots/%s-%s.png',

  // Letter files (stored under the associated ticket)
  LETTER_IMAGE: 'users/%s/tickets/%s/letters/%s/images/letter-front.%s',

  // Automation files (stored under the associated ticket)
  AUTOMATION_SCREENSHOT: 'users/%s/tickets/%s/automation/screenshots/%s-%s.png',
  AUTOMATION_EVIDENCE:
    'users/%s/tickets/%s/automation/evidence/evidence-%s.jpg',

  // Legacy paths for backward compatibility (deprecated)
  USER_IMAGE: 'users/%s/image.%s',
  USER_TICKET_FORM: 'users/%s/tickets/%s/forms/%s-%s-%s-%s.pdf',
};

export const SOCIAL_LINKS = [
  {
    id: 'instagram',
    label: 'Instagram',
    href: 'https://instagram.com/parkingticketpal',
    icon: faInstagram,
  },
  {
    id: 'facebook',
    label: 'Facebook',
    href: 'https://facebook.com/parkingticketpal',
    icon: faFacebookF,
  },
  {
    id: 'tiktok',
    label: 'TikTok',
    href: 'https://tiktok.com/@parkingticketpal',
    icon: faTiktok,
  },
  {
    id: 'x',
    label: 'X',
    href: 'https://x.com/parkingticketpal',
    icon: faXTwitter,
  },
  {
    id: 'threads',
    label: 'Threads',
    href: 'https://threads.net/@parkingticketpal',
    icon: faThreads,
  },
  // {
  //   id: 'youtube',
  //   label: 'YouTube',
  //   href: 'https://youtube.com/@parkingticketpal',
  //   icon: faYoutube,
  // },
  // {
  //   id: 'whatsapp',
  //   label: 'WhatsApp',
  //   href: 'https://wa.me/parkingticketpal',
  //   icon: faWhatsapp,
  // }
];
