import React, { useState } from 'react';
import useFetch from '../../hooks/useFetch';

const ParticipantsRegistrationForm = () => {
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [email, setEmail] = useState('');
  const [age, setAge] = useState('');
  const [participantData, setParticipantData] = useState([]);
  const [method, setMethod] = useState('');

  const [loading, data, error] = useFetch(
    method,
    'participants',
    null,
    participantData
  );

  const submitHandler = (e) => {
    e.preventDefault();
    const participant = {
      name: name,
      surname: surname,
      email: email,
      age: age,
    };
    setMethod('POST');
    setParticipantData(participant);
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
    </>
  );
};

export default ParticipantsRegistrationForm;
