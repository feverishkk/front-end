import React from 'react'
import { isUserLoggedIn } from '../../Services/AccountServices'

const WelcomeComponent = () => {

  const isAuth = isUserLoggedIn();

  return (
    <div className='container'>
      <br /> <br />
      <div className='row'>
        <div className='col-md-6 offset-md-3'>
          {
            isAuth && "Welcome!!!!Welcome!!!!Welcome!!!!Welcome!!!!Welcome!!!!Welcome!!!!Welcome!!!!Welcome!!!!Welcome!!!!Welcome!!!!"
          }
          
        </div>
      </div>
    </div>
  )
}

export default WelcomeComponent