import { SubscriptionType } from '@prisma/client';
import PageWrap from '@/components/PageWrap/PageWrap';
import SubscribeButton from '@/components/buttons/SubscribeButton/SubscribeButton';
import ManageSubscriptionButton from '@/components/buttons/ManageSubscriptionButton/ManageSubscriptionButton';
import { getSubscription } from '../actions';

const BillingPage = async () => {
  const subscription = await getSubscription();

  return (
    <PageWrap>
      <h1>Billing</h1>
      {subscription?.type === SubscriptionType.PRO ? (
        <>
          <h1>You are subscribed to Pro</h1>
          <ManageSubscriptionButton />
        </>
      ) : (
        <>
          <h1>Join PCNs</h1>
          <SubscribeButton />
        </>
      )}
    </PageWrap>
  );
};

export default BillingPage;
