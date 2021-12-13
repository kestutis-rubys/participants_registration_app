import React, { useState, useContext } from 'react';
import { UpdatingData } from '../../App';

const ParticipantsRegistrationForm = ({
  createData,
  updatingName,
  updatingSurname,
  updatingEmail,
  updatingAge,
  updatingId,
  updateData,
  inputText,
}) => {
  const [name, setName] = useState(updatingName);
  const [surname, setSurname] = useState(updatingSurname);
  const [email, setEmail] = useState(updatingEmail);
  const [age, setAge] = useState(updatingAge);
  const { dataUpdating, setDataUpdating } = useContext(UpdatingData);

  const submitHandler = (e) => {
    e.preventDefault();
    setName(name.trim().toLocaleLowerCase());
    setSurname(surname.trim().toLocaleLowerCase());
    setEmail(email.trim().toLocaleLowerCase());
    setAge(age);
    const participant = {
      name: name,
      surname: surname,
      email: email,
      age: age,
    };
    // clean input fields
    setName('');
    setSurname('');
    setEmail('');
    setAge('');
    if (dataUpdating) {
      setDataUpdating(false);
      return updateData(updatingId, participant);
    } else {
      return createData(participant);
    }
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
          <input data-set={updatingId} type='submit' value={inputText} />
        </div>
      </form>
    </>
  );
};

export default ParticipantsRegistrationForm;
