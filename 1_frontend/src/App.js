import React, { useState, useEffect } from 'react';
import ParticipantsRegistrationForm from './components/participantsRegistrationForm/ParticipantsRegistrationForm';
import ParticipantsTable from './components/participantsTable/ParticipantsTable';
import useFetch from './hooks/useFetch';

function App() {
  const [method, setMethod] = useState('');
  const [participantData, setParticipantData] = useState(null);
  const [id, setId] = useState(null);
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
  };

  const updateParticipantData = (participantId, participantData) => {
    console.log(participantId, participantData);
  };

  const deleteParticipantData = (participantId) => {
    setId(participantId);
    setMethod('DELETE');
  };

  return (
    <div>
      <ParticipantsRegistrationForm createData={createParticipantData} />
      <ParticipantsTable
        data={data}
        loading={loading}
        error={error}
        deleteData={deleteParticipantData}
        updateData={updateParticipantData}
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
    </div>
  );
}

export default App;
