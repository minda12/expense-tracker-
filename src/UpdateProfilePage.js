import React, { useRef, useContext, useState, useEffect } from 'react';
import './UpdateProfilePage.css';
import Context from './Context';

function UpdateProfilePage() {
  const nameRef = useRef();
  const urlRef = useRef();
  const ctx = useContext(Context);
  const [error, setError] = useState('');
  const [dataSent, setDataSent] = useState(false);

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyArD3lDfcX1bE3lth-QcbvWxCb3Vc3FEpg', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            idToken: ctx.Token,
          }),
        });

        if (!res.ok) {
          const errorMessage = await res.json();
          throw new Error(errorMessage.error.message);
        }

        const data = await res.json();
        console.log(data);
      

        nameRef.current.value =  data.users[0].displayName
        urlRef.current.value = data.users[0].photoUrl
vff



      } catch (error) {
        console.error(error);
        setError(error.message);
      }
    };

    getData();
  }, [ctx.Token]);

  const submitHandler = async (e) => {
    e.preventDefault();

    const updatedData = {
      name: nameRef.current.value,
      url: urlRef.current.value,
    };
    console.log(updatedData);

    try {
      const res = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyArD3lDfcX1bE3lth-QcbvWxCb3Vc3FEpg', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          idToken: ctx.Token,
          displayName: updatedData.name,
          photoUrl: updatedData.url,
          returnSecureToken: true,
        }),
      });

      if (!res.ok) {
        const errorMessage = await res.json();
        throw new Error(errorMessage.error.message);
      }

      nameRef.current.value = '';
      urlRef.current.value = '';
      setDataSent(true);
      setError('');
    } catch (error) {
      setError(error.message);
      console.error(error);
      setDataSent(false);
    }
  };

  return (
    <div className='cont'>
      <div className='body'>
        <h1>Update Profile</h1>
        {error && <h2 style={{ color: 'white', backgroundColor: 'red' }}>{error}</h2>}
        {dataSent && !error && <h2>Profile Updated</h2>}

        <form onSubmit={submitHandler}>
          <div>
            <label htmlFor="name">Name:</label>
            <input ref={nameRef} type="text" id="name" name="name" />
          </div>
          <div>
            <label htmlFor="url">Photo Profile URL:</label>
            <input ref={urlRef} type="text" id="url" name="url" />
          </div>

          <button type="submit">Update Profile</button>
        </form>
      </div>
    </div>
  );
}

export default UpdateProfilePage;
