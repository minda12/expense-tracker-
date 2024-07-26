import React from 'react'
import './Welcome.css'
import {useHistory} from 'react-router-dom'

function Welcome() {

  const history = useHistory()


  const updateProfile =() =>{
     history.push('/UpdateProfilePage')
  }
  return (
    <div className='containerr'>
    <div className=' welcome'>Welcome to Expense Tracker</div>
    <div className='profile-info'><button onClick={updateProfile}>Your Profile is not Complete </button></div>
    </div>

  )
}

export default Welcome