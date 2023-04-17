import React, { useState } from 'react';
import "./Register.css"

import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import app from '../../firebase.config';

const Register = () => {
    const [msg,setMsg] = useState('');
    const [err,setErr] = useState('');
  
    const auth = getAuth(app);

    const formSubmit= event =>{
      
        event.preventDefault();
        const email = event.target.email.value;
        const password =event.target.password.value;
        console.log(email, password);

        createUserWithEmailAndPassword(auth, email, password)
       .then (res=> {
        const loggedUser = res.user;
        console.log(loggedUser);
        setErr('');
        setMsg("Successfully Registered");
    event.target.reset( );
       })        
       .catch(error => {
        console.log(error);
        setMsg('');
        setErr('Registration Failed');
       })

    }
        return (
        <div>
            <h2 className='text-center'>Registration Form</h2>
        <form  onSubmit={formSubmit}>
            <label  htmlFor="email" >E-Mail: </label>
            <input  type="email" name="email" placeholder='Enter Email'  required/>

            <label htmlFor="password">Password</label>
            <input type="password" name='password' placeholder='Enter password' />

            <input className='sub-btn' type="submit" value="Register" required />
        

        </form>
        <p className='text-warning text-center'>{err}</p>
        <p className='text-info text-center'>{msg}</p>
        </div>
    );
};

export default Register;