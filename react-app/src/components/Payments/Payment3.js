import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

// import thunk
import { togglePremium } from '../../store/session';

// import context
import { usePaymentsContext } from '../../pages/Payments';

// local stripe utils
// import { createCustomer } from '../../services/stripeUtils'; // maybe use this!!!!!!!!!!!!!!!!!!!!!

// // start from $6 here: https://stripe.com/docs/billing/subscriptions/fixed-price#create-customer
// // also remember to use if !errors.length somewhere before and/or inbetween payment and customer or other way around

export default function Payment1() {
  const history = useHistory();
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const { billingInfo, paymentMethod } = usePaymentsContext();

  const [errors, setErrors] = useState([]);
  const [isProcessing, setProcessingTo] = useState();

  async function handleSubscribe() {
    setErrors([]);
    setProcessingTo(true);
    // https://stripe.com/docs/billing/subscriptions/fixed-price#create-customer
  }

  useEffect(() => {
    if (!billingInfo || !paymentMethod) history.push('/payments/1');
  }, [billingInfo, paymentMethod, history]);

  if (!billingInfo || !paymentMethod) return null;

  const {
    brand,
    last4,
    exp_month,
    exp_year,
  } = paymentMethod.paymentMethod.card;

  return (
    <>
      <h2 className='tertiary-title cntr-txt-sml-margin'>
        Confirm Information
      </h2>
      <div className='site__sub-section__data'>
        <div className='errors-container'>
          {errors.map((error) => (
            <div key={error}>{error}</div>
          ))}
        </div>
        <div className='site__sub-section__data'>
          <p>Billing Information</p>
          <p className='tertiary-text indented-tight-text'>
            {billingInfo.name}
          </p>
          <p className='tertiary-text indented-tight-text'>
            {billingInfo.address.line1}
          </p>
          <p className='tertiary-text indented-tight-text'>
            {billingInfo.address.city}, {billingInfo.address.state}{' '}
            {billingInfo.address.postal_code}
          </p>
          <p className='tertiary-text indented-tight-text'>
            {billingInfo.email}
          </p>
          <p>Payment Method</p>
          <p className='tertiary-text indented-tight-text'>
            {brand.charAt(0).toUpperCase() + brand.slice(1)}: ***
            {last4}, Exp: {exp_month}/{exp_year}
          </p>
        </div>
      </div>
      <div className='form__row buttons-grp-colLrg-rowSml'>
        <button
          className='primary-button form__button dashboard__button'
          disabled={isProcessing || errors.length}
          onClick={() => {}}
        >
          {isProcessing && !errors.length ? 'Processing...' : 'Subscribe'}
        </button>
        <button
          className='secondary-button form__button dashboard__button'
          type='button'
          onClick={() => history.push('/payments/1')}
        >
          Start Over
        </button>
        <button
          className='delete-button form__button dashboard__button'
          type='button'
          onClick={() => history.push('/profile')}
        >
          Cancel
        </button>
      </div>
    </>
  );
}
