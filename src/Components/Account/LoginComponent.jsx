import React, { useState } from 'react'
import { loginUser, saveLoggedInUser } from '../../Services/AccountServices';
import { useNavigate } from 'react-router-dom';

const LoginComponent = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigator = useNavigate();

    async function loginHandler(e){
        e.preventDefault();
        console.log(email, password);

        await loginUser(email, password).then((response)=>{
            console.log(response);

            saveLoggedInUser(response.data);

            navigator('/welcome');
            window.location.reload(false);
        }).catch( error => {
            console.error(error);
        });
        
    }

  return (
    <div className='container'>
        <br /> <br />
        <div className='row'>
            <div className='col-md-6 offset-md-3'>
                <div className='card'>
                    <div className='card-header'>
                        <h2 className='text-center'> User Login Form </h2>
                    </div>
                    <div className='card-body'>
                        <form>
                            
                            <div className='row mb-3'>
                                <label className='col-md-3 control-label'> User Email </label>
                                <div className='col-md-9'>
                                    <input placeholder='Enter email' value={email} type='text' name='email' 
                                            className='form-control' onChange={(e)=>setEmail(e.target.value)} />
                                </div>
                            </div>

                            <div className='row mb-3'>
                                <label className='col-md-3 control-label'> Password </label>
                                <div className='col-md-9'>
                                    <input placeholder='Enter Password' value={password} type='password' name='password' 
                                            className='form-control' onChange={(e)=>setPassword(e.target.value)} />
                                </div>
                            </div>

                            <div className='form-group mb-3'>
                                <button className='btn btn-primary' onClick={ (e) => loginHandler(e) } > Submit </button>
                            </div>

                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default LoginComponent