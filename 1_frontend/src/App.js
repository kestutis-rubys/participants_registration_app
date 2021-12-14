import React, { useState, useEffect } from 'react';
import ParticipantsForm from './components/participantsForm/ParticipantsForm';
import ParticipantsTable from './components/participantsTable/ParticipantsTable';
import useFetch from './hooks/useFetch';

export const UpdatingData = React.createContext();
export const ShowUpdatingDataForm = React.createContext();

function App() {
  const [method, setMethod] = useState('');
  const [participantData, setParticipantData] = useState(null);
  const [id, setId] = useState(null);
  const [showUpdatingForm, setShowUpdatingForm] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [dataUpdating, setDataUpdating] = useState(false);
  const [loading, data, error, message] = useFetch(
    method,
    'participants',
    id,
    participantData
  );

  useEffect(() => {
    setMethod('GET');
  }, [data]);

  const createParticipantData = (participantData) => {
    setMethod('POST');
    setParticipantData(participantData);
    setShowMessage(true);
    setShowUpdatingForm(false);
  };

  const collectParticipantDataForUpdate = (participantId, participantData) => {
    setId(participantId);
    setParticipantData(participantData);
    dataUpdating ? setDataUpdating(true) : setDataUpdating(true);
    setShowUpdatingForm(true);
  };

  const updateParticipantData = (updatingId, participantData) => {
    setId(updatingId);
    setParticipantData(participantData);
    setMethod('PUT');
    setShowUpdatingForm(false);
  };

  const deleteParticipantData = (participantId) => {
    setId(participantId);
    setMethod('DELETE');
    setShowUpdatingForm(false);
  };
  return (
    <UpdatingData.Provider value={{ dataUpdating, setDataUpdating }}>
      <ShowUpdatingDataForm.Provider
        value={{ showUpdatingForm, setShowUpdatingForm }}
      >
        <div className='class-main-container'>
          <div className='class-main-container__container'>
            <ParticipantsForm
              createData={createParticipantData}
              inputText='Enter'
            />
            <ParticipantsTable
              data={data}
              loading={loading}
              error={error}
              deleteData={deleteParticipantData}
              collectData={collectParticipantDataForUpdate}
            />
          </div>
          <div className='class-main-container__message'>
            {showMessage && loading ? (
              <p className='class-main-container__message-text'>Saving...</p>
            ) : error ? (
              <p className='class-main-container__message-text'>{error}</p>
            ) : (
              <p className='class-main-container__message-text'> {message} </p>
            )}
          </div>

          {showUpdatingForm && (
            <div className='class-main-container__update-form'>
              <ParticipantsForm
                inputText='Update'
                updatingName={participantData.name}
                updatingSurname={participantData.surname}
                updatingEmail={participantData.email}
                updatingAge={participantData.date - participantData.age}
                updatingId={id}
                updateData={updateParticipantData}
              />
            </div>
          )}
        </div>
      </ShowUpdatingDataForm.Provider>
    </UpdatingData.Provider>
  );
}

export default App;
