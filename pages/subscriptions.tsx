import { observer } from 'mobx-react-lite';
import Link from 'next/link';
import { useContext } from 'react';
import Dashboard from '../components/dashboard';
import accountContext from '../utils/account-store-context';

export default observer(function Subscriptions({}) {
  const { accountStore } = useContext(accountContext);
  const paymentMethod = accountStore.getPaymentMethod();

  return (
    <Dashboard>
      <h1>Active subscriptions</h1>
      <div
        className="rounded_shadow_box active_subscriptions_status"
        style={{ margin: '0px 0px 40px 0px' }}
      >
        {paymentMethod
          ? `You already have a subscription with payment method (${paymentMethod.card_type}, ${paymentMethod.masked_card_number})`
          : 'You have no active subscriptions'}
      </div>
      <Link href="/subscribe/">
        <div className="default_button">
          {paymentMethod ? 'replace payment method' : '+ add subscription'}{' '}
        </div>
      </Link>
    </Dashboard>
  );
});
