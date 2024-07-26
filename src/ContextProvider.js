import React,{useState,useEffect,useContext} from 'react'
import Login from './Login'
import Context from './Context'


function ContextProvider({children}) {

  
  const [login,setLogin] = useState(false)
  const [token, setToken] = useState('');
  const ctx = useContext(Context)


   const Loggedin =()=>{

        setLogin(true)
   }
   const setTokenHandler = (token) => {
    setToken(token);
  };

  const data={
    Token:token,
    isLoggedIn:login,
    SetLogin:setLogin,
    SetToken:setTokenHandler

  }

  return (
    <Context.Provider  value ={data}>
       {children}
    </Context.Provider>
  )
}

export default ContextProvider