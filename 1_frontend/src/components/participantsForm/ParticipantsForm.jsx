import React, { useState, useContext } from 'react';
import { UpdatingData } from '../../App';
import { ShowUpdatingDataForm } from '../../App';
// import css
import './ParticipantsForm.css';

const ParticipantsForm = ({
  createData,
  updatingName,
  updatingSurname,
  updatingEmail,
  updatingAge,
  updatingId,
  updateData,
  inputText,
}) => {
  const [name, setName] = useState(updatingName ? updatingName : '');
  const [surname, setSurname] = useState(
    updatingSurname ? updatingSurname : ''
  );
  const [email, setEmail] = useState(updatingEmail ? updatingEmail : '');
  const [age, setAge] = useState(updatingAge ? updatingAge : '');
  const { dataUpdating, setDataUpdating } = useContext(UpdatingData);
  const { showUpdatingForm, setShowUpdatingForm } =
    useContext(ShowUpdatingDataForm);

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
      <form className='class-participants-form' onSubmit={submitHandler}>
        <div className='class-participants-form__field'>
          <label
            className='class-participants-form__field-label'
            htmlFor='name'
          >
            Name
          </label>
          <input
            className='class-participants-form__field-input'
            type='text'
            value={name}
            onChange={(e) => setName(e.target.value)}
            required={true}
          />
        </div>
        <div className='class-participants-form__field'>
          <label
            className='class-participants-form__field-label'
            htmlFor='surname'
          >
            Surame
          </label>
          <input
            className='class-participants-form__field-input'
            type='text'
            value={surname}
            required={true}
            onChange={(e) => setSurname(e.target.value)}
          />
        </div>
        <div className='class-participants-form__field'>
          <label
            className='class-participants-form__field-label'
            htmlFor='email'
          >
            Email
          </label>
          <input
            className='class-participants-form__field-input'
            type='email'
            value={email}
            required={true}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className='class-participants-form__field'>
          <label className='class-participants-form__field-label' htmlFor='age'>
            Age
          </label>
          <input
            className='class-participants-form__field-input'
            type='number'
            value={age}
            required={true}
            onChange={(e) => setAge(e.target.value)}
          />
        </div>
        <div className='class-participants-form__field'>
          <input
            className='class-participants-form__field-submit'
            data-set={updatingId}
            type='submit'
            value={inputText}
          />
        </div>
        {showUpdatingForm && (
          <span
            onClick={() => setShowUpdatingForm(false)}
            className='class-participants-form__exit'
          >
            ???
          </span>
        )}
      </form>
    </>
  );
};

export default ParticipantsForm;
