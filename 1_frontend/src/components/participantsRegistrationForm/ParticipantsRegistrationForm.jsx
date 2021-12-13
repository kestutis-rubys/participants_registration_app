import React, { useState, useContext } from 'react';
import useFetch from '../../hooks/useFetch';
import { DataContext } from '../../App';

const ParticipantsRegistrationForm = () => {
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [email, setEmail] = useState('');
  const [age, setAge] = useState('');
  const [participantData, setParticipantData] = useState([]);
  const [method, setMethod] = useState('');
  const [showMessage, setShowMessage] = useState(false);
  const { dataItems, setDataItems } = useContext(DataContext);

  const [loading, data, error] = useFetch(
    method,
    'participants',
    null,
    participantData
  );

  const submitHandler = (e) => {
    e.preventDefault();
    const participant = {
      name: name.trim().toLocaleLowerCase(),
      surname: surname.trim().toLocaleLowerCase(),
      email: email.trim().toLocaleLowerCase(),
      age: age,
    };
    console.log(participant);
    setMethod('POST');
    setParticipantData(participant);
    setShowMessage(true);
    setDataItems(!dataItems);
    // clean input fields
    // setName('');
    // setSurname('');
    // setEmail('');
    // setAge('');
  };

  return (
    <>
      <form onSubmit={submitHandler}>
        <div>
          <label htmlFor='name'>Name</label>
          <br />
          <input
            type='text'
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor='surname'>Surame</label>
          <br />
          <input
            type='text'
            value={surname}
            onChange={(e) => setSurname(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor='email'>Email</label>
          <br />
          <input
            type='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor='age'>Age</label>
          <br />
          <input
            type='number'
            value={age}
            onChange={(e) => setAge(e.target.value)}
          />
        </div>
        <div>
          <input type='submit' value='Enter' />
        </div>
      </form>
      <div>
        {showMessage && loading ? (
          <p>Saving...</p>
        ) : error ? (
          <p>{error}</p>
        ) : (
          <p>{data.message}</p>
        )}
      </div>
    </>
  );
};

export default ParticipantsRegistrationForm;
