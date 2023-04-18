import { createUserWithEmailAndPassword, getAuth, sendEmailVerification, updateProfile } from 'firebase/auth';
import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Link } from 'react-router-dom';
import app from '../../../Firebase/firebase.config';


const auth= getAuth(app);
const Register = () => {
    const [success,setSuccess] = useState('');
    const[err, setErr] = useState('');

    const formHandle = (event) => {
        event.preventDefault();
        const form = event.target;
        const name = form.name.value;
        const email = form.email.value;
        const password = form.password.value;
        const confirm_pass = form.confirm_password.value; 
       
        console.log(name,email,password,confirm_pass);

setErr("");
setSuccess("");
        if(!/[a-zA-Z0-9]$/.test(password)){
            alert("Password Must follow the proper format");
        
            return
        } 

        else if(password !== confirm_pass){
            alert("Password Did not match");
  
    
            return
        }
        else if(password.length < 6){
            alert("Password must be at least 6 characters long");
         
            return

        }

        createUserWithEmailAndPassword(auth,email,password)
        .then(result => {
            const loggedUser = result.user;
            console.log(loggedUser);
            setSuccess("Successfully Registered");
            setErr("");
            form.reset();
            emailVerification(loggedUser);
            userName(loggedUser,name);

        })
        .catch(error => {
            setSuccess("");
            setErr("Registration Failed");
            alert(error)
        })

    }
    const emailVerification = (user) =>{
        sendEmailVerification(user)
        .then(res=> {
            alert("Check your email for verification");
        })
        .catch(error => 
            {
                console.error(error);
            })
    }
    const userName =(user, name) => {
        updateProfile(user, {
            displayName: name,
          })
          .then (res => {
            alert("User Profile updated");
          })
          .catch(error => {
            alert("User profile is not updated");
          })
    } 

    return (
        <div className='p-3 bg-primary m-5 border rounded-3'>
            <h3>Please Register</h3>
            <Form onSubmit={formHandle}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Name</Form.Label>
        <Form.Control type="text" placeholder="Enter Name" name="name" required />
       
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter email" name="email" required />
       
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Enter Password" name="password" required/>
      </Form.Group>
      <Form.Group className="mb-3" >
        <Form.Label>Confirm Password</Form.Label>
        <Form.Control type="password" placeholder="Re-enter Password" name="confirm_password"/>
      </Form.Group>
    
      <p className='p-2'>Already Have an Account?<Link to="/login" className='btn btn-link text-white'>please Login</Link>  </p>
      <Button variant="info" type="submit">
        Sign Up
      </Button>
      <p>{err}</p>
      <p>{success}</p>
    </Form>
    
        </div>
    );
};

export default Register;<h1>Register</h1>