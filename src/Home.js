import React, { useState, useRef,useContext,useEffect } from 'react';
import Header from './Header';
import './Home.css';
import Context from './Context';




function Home() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordRef2 = useRef();
  const [halt, setHalt] = useState(false);

  const [error, setError] = useState('');
  const [Result, setResult] = useState('');
  

  const ctx = useContext(Context)
  
  console.log("comming from home js ctx",ctx)



  const ToggleLogin = () => {
   ctx.SetLogin(!ctx.isLoggedIn)
    setError(''); 
    emailRef.current.value='';
    passwordRef.current.value='';
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    console.log(emailRef.current.value);
    console.log(passwordRef.current.value);
    
    const data = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };

    if (!ctx.isLoggedIn) {
      if (passwordRef2.current.value !== passwordRef.current.value) {
        console.log('password not matching');  
        setHalt(true);
        setTimeout(() => {
          setHalt(false);
        }, 2000);
        return;
      }
    }

    let url = ctx.isLoggedIn
      ? 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyArD3lDfcX1bE3lth-QcbvWxCb3Vc3FEpg'
      : 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyArD3lDfcX1bE3lth-QcbvWxCb3Vc3FEpg';
      
    try {
      const res = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: data.email,
          password: data.password,
          returnSecureToken: true,
        }),
      });

      const result = await res.json();
      console.log('response received', result);

      if (!res.ok) {
        throw new Error(result.error.message || 'Something went wrong');
      }
      
      
      console.log('Successfully logged in/signed up', result);

      
      ctx.SetToken(result.idToken)
      console.log("token",result.idToken)

      setResult(result)
    } catch (error) {
      console.log('here error');
      console.error('Error:', error.message);
      setError(error.message);
    }
  };

  return (
    <>
      <Header />
      <div className='container'>
        <h2>{ctx.isLoggedIn ? 'LOGIN' : 'SIGNUP'}</h2>
        {halt && <p><strong>Error:</strong> Password Mismatch</p>}
        {error && <p style={{ color: 'red' }}>Error: {error}</p>}
        {Result.email && <p>{`${Result.email} Succesfully Signed in`}</p>}
        <form onSubmit={submitHandler} className='form'>
          <span className='input'>
            <label>Email</label>
            <input ref={emailRef} type='email' placeholder='Enter username here' required />
          </span>
          <span className='input'>
            <label>Password</label>
            <input ref={passwordRef} type='password' placeholder='Enter password here' required />
          </span>
          {!ctx.isLoggedIn && (
            <span className='input'>
              <label>Confirm Password</label>
              <input ref={passwordRef2} type='password' placeholder='Confirm password here' required />
            </span>
          )}
          <button type='submit' className='submit'>{ctx.isLoggedIn ? 'LogIn' : 'Signup'}</button>
        </form>
      </div>

      <div className='login'>
        <span>{ctx.isLoggedIn ? 'New user? Create an account' : 'Have an Account?'} <button onClick={ToggleLogin} className='submit'>{ctx.isLoggedIn ?  'Signup':'Login'}</button></span>
      </div>
    </>
  );
}

export default Home;
