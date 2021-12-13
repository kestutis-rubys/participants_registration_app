import React, { useState, useEffect } from 'react';
import ParticipantsForm from './components/participantsForm/ParticipantsForm';
import ParticipantsTable from './components/participantsTable/ParticipantsTable';
import useFetch from './hooks/useFetch';

export const UpdatingData = React.createContext();

function App() {
  const [method, setMethod] = useState('');
  const [participantData, setParticipantData] = useState(null);
  const [id, setId] = useState(null);
  const [showUpdatingForm, setShowUpdatingForm] = useState(false);
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
    setShowUpdatingForm(false);
  };

  const collectParticipantDataForUpdate = (participantId, participantData) => {
    setId(participantId);
    setParticipantData(participantData);
    setDataUpdating(!dataUpdating);
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
      <ParticipantsForm createData={createParticipantData} inputText='Enter' />
      <ParticipantsTable
        data={data}
        loading={loading}
        error={error}
        deleteData={deleteParticipantData}
        collectData={collectParticipantDataForUpdate}
      />
      <div>
        {loading ? (
          <p>Saving...</p>
        ) : error ? (
          <p>{error}</p>
        ) : (
          <p> {message} </p>
        )}
      </div>
      <div>
        {showUpdatingForm && (
          <ParticipantsForm
            inputText='Update'
            updatingName={participantData.name}
            updatingSurname={participantData.surname}
            updatingEmail={participantData.email}
            updatingAge={participantData.date - participantData.age}
            updatingId={id}
            updateData={updateParticipantData}
          />
        )}
      </div>
    </UpdatingData.Provider>
  );
}

export default App;
