import React, { useState } from 'react';
import ParticipantsRegistrationForm from './components/participantsRegistrationForm/ParticipantsRegistrationForm';
import ParticipantsTable from './components/participantsTable/ParticipantsTable';

export const DataContext = React.createContext();

function App() {
  const [dataItems, setDataItems] = useState(true);
  return (
    <DataContext.Provider value={{ dataItems, setDataItems }}>
      <ParticipantsRegistrationForm />
      <ParticipantsTable />
    </DataContext.Provider>
  );
}

export default App;
