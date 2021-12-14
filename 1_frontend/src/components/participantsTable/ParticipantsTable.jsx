import React from 'react';
import Button from '../Button/Button';
// import css
import './ParticipantsTable.css';

const ParticipantsTable = ({
  data,
  loading,
  error,
  deleteData,
  collectData,
}) => {
  // GET CURRENT YEAR
  const currentYear = new Date().getFullYear();
  let number = 1;

  // UPDATE PARTICIPANT DATA
  const collectParticipantData = (e) => {
    const participantId = e.target.dataset.set;
    let participantData;
    const tableBodyTr = document.querySelectorAll('tr');
    tableBodyTr.forEach((item) => {
      if (item.id === participantId) {
        participantData = {
          name: item.children[1].innerText.split(' ')[0],
          surname: item.children[1].innerText.split(' ')[1],
          email: item.children[2].innerText,
          age: item.children[3].innerText,
          date: currentYear,
        };
      }
    });
    return collectData(participantId, participantData);
  };

  // DELETE PARTICIPANT DATA
  const deleteParticipantData = (e) => {
    const id = e.target.dataset.set;
    return deleteData(id);
  };

  return (
    <div className='class-participants-table'>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>No.</th>
              <th>Name and surname</th>
              <th>Email address</th>
              <th>Year of birth</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item._id} id={item._id}>
                <td>{number++}.</td>
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
                    action={collectParticipantData}
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
      )}
    </div>
  );
};

export default ParticipantsTable;
