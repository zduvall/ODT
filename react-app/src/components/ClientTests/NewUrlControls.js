import { useState } from 'react';
import { useSelector } from 'react-redux';

// import cryptojs
import CryptoJS from 'crypto-js';

// import components
import ModalNewUrl from './ModalNewUrl';

// import context
import { useClientTestsContext } from './index';

// import tests
import tests from '../../assets';

// import css
import './ClientTests.css';

export default function NewUrlControls() {
  // store and context
  const sessionUser = useSelector((state) => state.session.user);
  const { client } = useClientTestsContext();

  // state
  const [test, setTest] = useState({ code: '' });
  const [newUrl, setNewUrl] = useState('');
  const [showModal, setShowModal] = useState(false);

  function onSubmit(e) {
    e.preventDefault();

    const userId = sessionUser.id;
    const clientId = client.id;

    const encURL = CryptoJS.SHA3(`${clientId}x$${test.code}%-${userId}5z`)
      .toString()
      .slice(0, 15);

    const url = `${process.env.NODE_ENV === 'production' ? 'https://' : ''}${
      window.location.host
    }/test/${test.code}/${userId}/${clientId}/${encURL}`;

    setNewUrl(url);
    setShowModal(true);
  }

  return (
    <>
      {showModal && (
        <ModalNewUrl
          showModal={showModal}
          setShowModal={setShowModal}
          newUrl={newUrl}
          client={client}
          test={test}
        />
      )}
      <div className='site__sub-section client-tests__sub-section'>
        <form className='new-url-controls__form' onSubmit={onSubmit}>
          <button type='submit' className='primary-button'>
            New Link
          </button>
          <select
            value={test.code}
            onChange={(e) => {
              setTest(tests[e.target.value]);
            }}
            className='form__input'
            required
          >
            <option disabled value=''>
              - Tests -
            </option>
            {Object.values(tests).map((test) => (
              <option value={test.code} key={test.code}>
                {test.abbr}
              </option>
            ))}
          </select>
        </form>
      </div>
    </>
  );
}
