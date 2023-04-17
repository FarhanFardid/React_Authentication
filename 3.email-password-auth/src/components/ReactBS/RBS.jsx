import { createUserWithEmailAndPassword, getAuth, sendEmailVerification, updateProfile } from 'firebase/auth';
import React, { useState } from 'react';import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import app from '../../firebase.config';
import { Link } from 'react-router-dom';

const auth = getAuth(app);
const RBS = () => {
const [err,setErr] = useState('');
const [success,setSuccess]  = useState('');
const formSubmit = event =>{
        event.preventDefault();
        const email = event.target.email.value; 
        const password = event.target.password.value; 
        const name = event.target.name.value;

        console.log(name,email,password);
        if(!/^(\S)(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z])/.test(password))
        {
            setErr("Password should contain a lowercase and a uppercase character a digits");
            event.target.reset();
            return;
        }
        createUserWithEmailAndPassword(auth, email,password)
        .then(res => {
            const loggedUser= res.user;
            console.log(loggedUser);
            setSuccess("Successfully Registered");
            event.target.reset();
            setErr('');
            sendVerificationMail(loggedUser);
            userName(loggedUser,name);
        })
        .catch(error => {
            console.log(error);
            setErr("Registration Failed");
            setSuccess('');
            
        })
    }

    const sendVerificationMail = user =>{
      sendEmailVerification(user)
      .then(res=>
        {
          console.log(res);
          alert("Please Verify your mail");
        })
    }
    const userName = (user,name) => {
      updateProfile(user, {
        displayName: name  })
        .then(res=> {
          console.log(res);
        })
        .catch(error =>{
          console.log(error);
        })


    }
    return (
        <div>
                <Form onSubmit={formSubmit} className='text-center w-25'>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Name</Form.Label>
        <Form.Control type="text" name="name" placeholder="Enter Name" />
      
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" name="email" placeholder="Enter email" />
      
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" name="password" placeholder="Password" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicCheckbox">
     
      </Form.Group>
      <Button variant="primary" type="submit">
        Submit
      </Button>
      <p>Already have an account? <Link to="/login">Please Login</Link></p>
    </Form>
    <p className='text-center text-warning'>{err}</p>
    <p className='text-center text-info'>{success}</p>
        </div>
    );
};

export default RBS;