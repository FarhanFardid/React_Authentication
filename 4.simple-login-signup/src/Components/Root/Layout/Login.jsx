import { getAuth, sendPasswordResetEmail, signInWithEmailAndPassword } from 'firebase/auth';
import React, { useRef, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Link } from 'react-router-dom';
import app from '../../../Firebase/firebase.config';

const auth= getAuth(app);
const Login = () => {

    const [success,setSuccess] = useState('');
    const [err,setErr] = useState('');
    const [show,setShow] = useState('false');
        const emailRef = useRef();

    const loginHandle = event =>{
        event.preventDefault();
        const form  = event.target;
        const email = form.email.value;
        const password = form.password.value;
        console.log(email,password);

        signInWithEmailAndPassword(auth,email,password)
        .then (res=> {
            const loggedUser = res.user;
            setSuccess("successfully Logged In");
            setErr("");
        })
        .catch(error => {
            console.log(error);
            setErr("Log in Failed");
            setSuccess("");
        } )
    }

    const resetPass =  () =>{
        const email = emailRef.current.value;
        if(!email){
            alert("please provide email to reset the password");
        }
        sendPasswordResetEmail(auth,email)
        .then(res => {
            alert("check email for password");
        })
        .catch(error=> {
            console.log(error);
        })

    }

    const displayPass = () =>{
        setShow(!show);
    }
    return (
        <div className='p-3 bg-primary m-5 border rounded-3'>
            <h3>Please Login</h3>
            <Form onSubmit={loginHandle}>
    
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter email" ref={emailRef} name="email" required />
       
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type={show ? "password" : "text"} placeholder="Enter Password" name="password" required/> <small className='ts-xs display-inline ' onClick={displayPass}>Show Password</small> 
        
      </Form.Group>
      <p className='p-2'>Don't Have an Account?<Link to="/register" className='btn btn-link text-white'>please Register</Link>  </p>

      <p className='text-center'>Forgot Password? <small><button onClick={resetPass} className='btn btn-link text-white'>Reset Password</button> </small></p>
    
      <Button variant="info" type="submit">
        Sign In
      </Button>
      <p className='text-center text-warning p-2'>{err}</p>
      <p className='text-center p-2'>{success}</p>
    </Form>
        </div>
    );
};

export default Login;