import {useState} from 'react';

export default () => {
  const [data, setdata] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [status, setStatus] = useState(null);

  // Get Mathod
  const getData = async url => {
    setLoading(true);
    await fetch(url)
      .then(res => {
        setStatus(res.status);
        return res.json();
      })
      .then(res => {
        setdata(res);
        setLoading(false);
      })
      .catch(error => {
        setError(true);
      });
  };

  // Post Mathod
  const postData = async (url = '', data = {}) => {
    setLoading(true);
    await fetch(url, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
      body: JSON.stringify(data),
    })
      .then(res => {
        if (!res.ok) {
          setLoading(false);
          const message = `Error : ${res.status}`;
          throw new Error(message);
        } else {
          setStatus(res.status);
          setLoading(false);
          return res.json();
        }
      })
      .then(res => setdata(res.data))
      .catch(err => {
        setError(err);
        setLoading(false);
      });
  };

  // PUT mathod
  const putData = async (url = '', data = {}) => {
    setLoading(true);
    await fetch(url, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
      body: JSON.stringify(data),
    })
      .then(res => {
        if (!res.ok) {
          setLoading(false);
          const message = `Error : ${res.status}`;
          throw new Error(message);
        } else {
          setStatus(res.status);
          setLoading(false);
          return res.json();
        }
      })
      .then(res => setdata(res.data))
      .catch(err => {
        setError(err);
        setLoading(false);
      });
  };

  return {getData, postData, putData, data, loading, error, status};
};
