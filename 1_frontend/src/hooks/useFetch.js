import { useState, useEffect } from 'react';
import axios from 'axios';
import { API } from '../api';

const useFetch = (method, endpoint, id, participantData) => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState('');

  useEffect(() => {
    switch (method) {
      case 'GET': {
        axios
          .get(`${API}${endpoint}`)
          .then((result) => {
            setData(result.data);
            setLoading(false);
          })
          .catch((err) => setError(err));
        break;
      }
      case 'POST': {
        axios
          .post(`${API}${endpoint}`, participantData)
          .then((result) => {
            setData(result.data.data);
            setMessage(result.data.message);
            setLoading(false);
          })
          .catch((err) => setError(err));
        break;
      }
      case 'PUT': {
        axios.put(`${API}${endpoint}/${id}`, participantData).then((result) => {
          setData(result.data.data);
          setMessage(result.data.message);
          setLoading(false);
        });
        break;
      }
      case 'DELETE': {
        axios
          .delete(`${API}${endpoint}/${id}`)
          .then((result) => {
            setData(result.data.data);
            setMessage(result.data.message);
            setLoading(false);
          })
          .catch((err) => setError(err));
        break;
      }
      default:
    }
  }, [method, endpoint, id, participantData]);
  return [loading, data, error, message];
};

export default useFetch;
