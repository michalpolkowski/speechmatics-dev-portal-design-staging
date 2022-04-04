import { observer } from 'mobx-react-lite';
import Link from 'next/link';
import { useContext } from 'react';
import Dashboard from '../components/dashboard';
import accountContext from '../utils/account-store-context';

export default observer(function Subscriptions({ }) {
  const { accountStore } = useContext(accountContext);
  const paymentMethod = accountStore.getPaymentMethod();

  return (
    <Dashboard>
      <h1>Active subscriptions</h1>
      <div className="rounded_shadow_box active_subscriptions_status">
        <p className='subtitle'>
          {paymentMethod
            ? `You already have a subscription with payment method (${paymentMethod.card_type}, ${paymentMethod.masked_card_number})`
            : 'You have no active subscriptions'}
        </p>
      </div>
      <div className='divide_line divide_line__top'></div>
      <Link href="/subscribe/">
        <div className="default_button">
          {paymentMethod ? 'replace payment method' : '+ add subscription'}{' '}
        </div>
      </Link>

      <div className='content_wrapper billing_information'>
        <div className='grid payment_card_grid'>
          <div className=''>
            <h2>Payment card active </h2>
            <p>Visa ending 1234 expiring on 05/23</p>
            <a className='button button__primary button__extended my-4'>Update Card</a>
            <p>To delete your card, please <a href='#'>click here</a></p>
          </div>

          <div className='payment_card payment_card__-not-disabled'>

            <div className='payment_card__back'>
              <div className='payment_card__stripe'></div>
              <div className='payment_card__signature'></div>
            </div>

            <div className='payment_card__front'>
              <img className='self-end block rounded' src="/assets/logo-visa.svg" />
              <img className='self-start mt-1 block' src="/assets/card-chip.svg" />
              <div className='payment_card__numbers'>
                <div>XXXX</div>
                <div>XXXX</div>
                <div>XXXX</div>
                <div className='last_four_digits'>6345</div>
              </div>
              <p className='self-end text-white payment_card__expiry'><span className='uppercase opacity-50 mr-1'> Expiry date</span> 22/23</p>
            </div>

          </div>

        </div>

        <div className='divide_line'></div>
        <div className='center_cta'>
          <img className='w-9 h-9 block' src="/assets/icon-pricing.svg" />
          <h2>View our pricing</h2>
          <a className='button button__primary-outline extended'>Update Card</a>
        </div>

      </div>


    </Dashboard>


  );

});
