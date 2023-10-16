import React, { useState } from 'react';
import { registerUser } from '../../Services/AccountServices';

const RegisterComponent = () => {

    const[userName, setUserName] = useState('');
    const[userEmail, setUserEmail] = useState('');
    const[password, setPassword] = useState('');
    const[confirmPassword, setConfirmPassword] = useState('');
    const[userAddr, setUserAddr] = useState('');
    const[userPostNumber, setUserPostNumber] = useState('');
    const[userMobileNumber, setUserMobileNumber] = useState('');
    const[userBirthday, setUserBirthday] = useState('');

    function handleRegistrationForm(e){

        e.preventDefault();

        const register = {userName, userEmail, password, confirmPassword, userAddr, userPostNumber, userMobileNumber, userBirthday}

        console.log(register);

        registerUser(register).then((response) => {
            console.log(response.data);
        }).catch(error => {
            console.error(error);
        })
    }


  return (
    <div className='container'>
    <br /> <br />
    <div className='row'>
        <div className='col-md-6 offset-md-3'>
            <div className='card'>
                <div className='card-header'>
                    <h2 className='text-center'> User Registration Form </h2>
                </div>
                <div className='card-body'>
                    <form>
                        
                        <div className='row mb-3'>
                            <label className='col-md-3 control-label'> User Name </label>
                            <div className='col-md-9'>
                                <input placeholder='Enter User Name' value={userName} type='text' name='userName' 
                                        className='form-control' onChange={(e)=>setUserName(e.target.value)} />
                            </div>
                        </div>
                        <div className='row mb-3'>
                            <label className='col-md-3 control-label'> Email </label>
                            <div className='col-md-9'>
                                <input placeholder='Enter Email' value={userEmail} type='text' name='UserEmail' 
                                        className='form-control' onChange={(e)=>setUserEmail(e.target.value)} />
                            </div>
                        </div>
                        <div className='row mb-3'>
                            <label className='col-md-3 control-label'> Mobile Number </label>
                            <div className='col-md-9'>
                                <input placeholder='Enter Mobile Number' value={userMobileNumber} type='text' name='userMobileNumber' 
                                        className='form-control' onChange={(e)=>setUserMobileNumber(e.target.value)} />
                            </div>
                        </div>
                        <div className='row mb-3'>
                            <label className='col-md-3 control-label'> Birthday </label>
                            <div className='col-md-9'>
                                <input placeholder='Enter Birthday' value={userBirthday} type='text' name='userBirthday' 
                                        className='form-control' onChange={(e)=>setUserBirthday(e.target.value)} />
                            </div>
                        </div>
                        <div className='row mb-3'>
                            <label className='col-md-3 control-label'> Addr </label>
                            <div className='col-md-9'>
                                <input placeholder='Enter Addr' value={userAddr} type='text' name='userAddr' 
                                        className='form-control' onChange={(e)=>setUserAddr(e.target.value)} />
                            </div>
                        </div>
                        <div className='row mb-3'>
                            <label className='col-md-3 control-label'> Post Number </label>
                            <div className='col-md-9'>
                                <input placeholder='Enter Post Number' value={userPostNumber} type='text' name='userPostNumber' 
                                        className='form-control' onChange={(e)=>setUserPostNumber(e.target.value)} />
                            </div>
                        </div>
                        <div className='row mb-3'>
                            <label className='col-md-3 control-label'> Password </label>
                            <div className='col-md-9'>
                                <input placeholder='Enter Password' value={password} type='password' name='password' 
                                        className='form-control' onChange={(e)=>setPassword(e.target.value)} />
                            </div>
                        </div>
                        <div className='row mb-3'>
                            <label className='col-md-3 control-label'> Confirm Password </label>
                            <div className='col-md-9'>
                                <input placeholder='Re Enter Confirm Password' value={confirmPassword} type='password' name='confirmPassword' 
                                        className='form-control' onChange={(e)=>setConfirmPassword(e.target.value)} />
                            </div>
                        </div>

                        <div className='form-group mb-3'>
                            <button className='btn btn-primary' onClick={ (e) => handleRegistrationForm(e) } > Submit </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</div>
  )
}

export default RegisterComponent