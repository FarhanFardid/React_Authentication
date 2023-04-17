import { getAuth, sendPasswordResetEmail, signInWithEmailAndPassword } from 'firebase/auth';
import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import app from '../firebase.config';

const auth= getAuth(app);
const Login = () => {
    const[error,setError] = useState('');
    const [success,setSuccess]= useState('');
    const emailRef= useRef();


    const formLogin= event =>{
        event.preventDefault();
        const form = event.target;
        const email = form.email.value;
        const password =form.password.value;
        console.log(email, password);

        signInWithEmailAndPassword(auth,email,password)
        .then(res => {
             const loggedUser = res.user;
             console.log(loggedUser);
             setSuccess('Successfully Logged in');
             setError('');
            form.reset();
                })
        .catch(error => {
            console.error(error);
            setError("Failed to Log in");
            setSuccess('');
        })
    }

    const resetPass = () =>{
        const email = (emailRef.current.value);
        if(!email){
            alert("please provide email for reset password")
        }

        sendPasswordResetEmail(auth, email)
        .then(res => {
            console.log(res);
            alert("Please check your email")
        })
        .catch(error => {
            console.log(error);
        })
    }
    return (
        <div>
              <h2 className='text-center'>Please Login</h2>
        <form onSubmit={formLogin} >
            <label  htmlFor="email" >E-Mail: </label>
            <input  type="email" name="email" ref={emailRef} placeholder='Enter Email' />

            <label htmlFor="password">Password</label>
            <input type="password" name='password' placeholder='Enter password' />

            <input className='sub-btn' type="submit" value="Login" />

            <p>Don't have an account? <Link to="/register-rbs">Please Register</Link></p>

            <p className='text-center'>Forgot Password? <small><button onClick={resetPass} className='btn btn-link'>Reset Password</button> </small></p>
        </form>
    
        <p className='text-center text-warning'>{error}</p>
        <p className='text-center text-success'>{success}</p>
        </div>
    );
};

export default Login;