import { useState } from 'react';
import { useSelector } from 'react-redux';

// stripe imports
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

// local stripe utils
import { createCustomer } from '../../services/stripeUtils';

export default function Payment({ setShowPayment }) {
  // stripe
  const stripe = useStripe();
  const elements = useElements();

  const sessionUser = useSelector((state) => state.session.user);

  const [errors, setErrors] = useState([]);
  const [name, setName] = useState(
    `${sessionUser.firstName} ${sessionUser.lastName}`
  );
  const [email, setEmail] = useState(sessionUser.email);
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [zip, setZip] = useState('');

  const [isProcessing, setProcessingTo] = useState();

  async function onSubmit(e) {
    e.preventDefault();
    const billingDetails = {
      name,
      email,
      address: {
        city,
        line1: address,
        state,
        postal_code: zip,
      },
    };

    setProcessingTo(true);

    // createCustomer(billingDetails.address);

    // const cardElement = elements.getElement('card');

    // try {
    //   // const { data: clientSecret } = await axios.post('/api/payment_intents', {
    //   //   amount: price * 100,
    //   // });

    //   const res = await fetch(`/api/payment_intents`, {
    //     // not sure if this is formatted right; guessed based on the axios example
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify({ amount: 100 }),
    //   });

    //   const { data: clientSecret } = await res.json();

    //   const paymentMethodReq = await stripe.createPaymentMethod({
    //     type: 'card',
    //     card: cardElement,
    //     billing_details: billingDetails,
    //   });

    //   if (paymentMethodReq.error) {
    //     setErrors(paymentMethodReq.error.message);
    //     setProcessingTo(false);
    //     return;
    //   }

    //   const { error } = await stripe.confirmCardPayment(clientSecret, {
    //     payment_method: paymentMethodReq.paymentMethod.id,
    //   });

    //   if (error) {
    //     setErrors(error.message);
    //     setProcessingTo(false);
    //     return;
    //   }

    //   // onSuccessfulCheckout();
    // } catch (err) {
    //   setErrors(err.message);
    // }
    // console.log(billingDetails);
  }

  const cardElementOptions = {
    style: {
      base: {
        fontSize: '1.2rem',
        backgroundColor: 'white',
        '::placeholder': {
          fontSize: '1.2rem',
        },
      },
      invalid: {
        color: 'rgb(173, 0, 0)',
        iconColor: 'rgb(173, 0, 0)',
      },
      complete: {},
    },
    hidePostalCode: true, // maybe not needed
  };

  return (
    <div className='site__sub-section form-container'>
      <h2 className='tertiary-title cntr-txt-sml-margin'>
        Access all tests - $5 per month
      </h2>
      <form className='form' onSubmit={onSubmit}>
        <div className='site__sub-section__data'>
          <div className='errors-container'>
            {errors.map((error) => (
              <div key={error}>{error}</div>
            ))}
          </div>
          <div className='form__row'>
            <input
              name='name'
              type='text'
              placeholder='Name'
              onChange={(e) => setName(e.target.value)}
              value={name}
              className='form__input'
            ></input>
            <input
              name='email'
              type='text'
              placeholder='Email'
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              className='form__input'
            ></input>
          </div>
          <div className='form__row'>
            <input
              name='address'
              type='text'
              placeholder='Address'
              onChange={(e) => setAddress(e.target.value)}
              value={address}
              className='form__input'
            ></input>
          </div>
          <div className='form__row'>
            <input
              name='city'
              type='text'
              placeholder='City'
              onChange={(e) => setCity(e.target.value)}
              value={city}
              className='form__input'
            ></input>
          </div>
          <div className='form__row'>
            <input
              name='state'
              type='text'
              placeholder='State'
              onChange={(e) => setState(e.target.value)}
              value={state}
              className='form__input'
            ></input>
            <input
              name='zip'
              type='number'
              placeholder='Zip'
              onChange={(e) => setZip(e.target.value)}
              value={zip}
              className='form__input'
            ></input>
          </div>
          <div className='form-row payment-row'>
            {/* <div className='payment-input'> */}
            <CardElement options={cardElementOptions} />
            {/* </div> */}
          </div>
        </div>
        <div className='form__row buttons-grp-colLrg-rowSml'>
          <button
            className='primary-button form__button dashboard__button'
            type='submit'
            disabled={isProcessing}
          >
            {isProcessing ? 'Processing...' : 'Subscribe'}
          </button>
          <button
            className='secondary-button form__button dashboard__button'
            type='button'
            onClick={() => setShowPayment(false)}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
