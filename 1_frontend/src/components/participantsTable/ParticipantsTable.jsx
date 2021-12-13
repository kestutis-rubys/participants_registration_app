import React, { useState, useEffect, useContext } from 'react';
import useFetch from '../../hooks/useFetch';
import Button from '../Button/Button';
import { DataContext } from '../../App';
import ParticipantUpdateModal from '../participantUpdateModal/ParticipantUpdateModal';

const ParticipantsTable = () => {
  const { dataItems, setDataItems } = useContext(DataContext);
  const [method, setMethod] = useState('');
  const [id, setId] = useState(null);
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [email, setEmail] = useState('');
  const [age, setAge] = useState('');
  const [participantData, setParticipantData] = useState(null);

  const [loading, data, error, message] = useFetch(
    method,
    'participants',
    id,
    participantData
  );

  // get current year
  const currentYear = new Date().getFullYear();

  useEffect(() => {
    if (dataItems) {
      setMethod('GET');
      setParticipantData(data);
      setDataItems(!dataItems);
    }
  }, [data, dataItems, setDataItems]);

  const updateParticipantData = (e) => {
    const participantId = e.target.dataset.set;
    setId(participantId);
    const tableBodyTr = document.querySelectorAll('tr');
    tableBodyTr.forEach((item) => {
      if (item.id === participantId) {
        setId(item.id);
        setName(item.children[0].innerText.split(' ')[0]);
        setSurname(item.children[0].innerText.split(' ')[1]);
        setEmail(item.children[1].innerText);
        setAge(item.children[2].innerText);
      }
    });
    // setMethod('PUT');
  };

  const deleteParticipantData = (e) => {
    setId(e.target.dataset.set);
    setMethod('DELETE');
    setDataItems(!dataItems);
  };
  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Name and surname</th>
            <th>Email address</th>
            <th>Year of birth</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item._id} id={item._id}>
              <td>
                {item.name.charAt(0).toUpperCase() +
                  item.name.slice(1) +
                  ' ' +
                  item.surname.charAt(0).toUpperCase() +
                  item.surname.slice(1)}
              </td>
              <td>{item.email}</td>
              <td>{currentYear - item.age}</td>
              <td>
                <Button
                  text='Update'
                  action={updateParticipantData}
                  dataSet={item._id}
                />
              </td>
              <td>
                <Button
                  text='Delete'
                  action={deleteParticipantData}
                  dataSet={item._id}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <ParticipantUpdateModal
        id={id}
        name={name}
        surname={surname}
        email={email}
        age={age}
      />
    </div>
  );
};

export default ParticipantsTable;
