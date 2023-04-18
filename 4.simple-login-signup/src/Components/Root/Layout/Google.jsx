import React, { useState } from 'react';
import app from '../../../Firebase/firebase.config';
import {GoogleAuthProvider, getAuth, signInWithPopup, signOut} from 'firebase/auth';


const auth = getAuth(app);
const Google = () => {
    const [msg,setMsg] = useState(''); 
    const [err,setErr] = useState('');
    const [user,setUser] = useState('');
    const googleProvider = new GoogleAuthProvider();

    const googleHandle = event =>{
        signInWithPopup(auth, googleProvider)
        .then (result => {
            const loggedUser = result.user;
            setUser(loggedUser);
            console.log(loggedUser);
            setMsg("Successfully Logged In");
            setErr("");
        })
        .catch(error => console.log(error));
        setMsg("");
        setErr("Login Failed");

    }
    const googleLogout = () =>{
        signOut(auth)
        .then(res=> {
            console.log(res);
           setUser("");
            setMsg("Successfully Logout");
            setErr("");
        })
        .catch(error=>{
            console.log(error);
            setErr("Logout Failed");
            setMsg("");
        }
            )
    }


    return (
        <div>
            <h2 className='p-3 m-2'>Google Login</h2>
            {
                user ?
            <button className='btn btn-warning border-dark rounded-3 p-3 m-2 ' onClick={googleLogout} >Logout</button> :
            <button className='btn btn-info border-dark rounded-3 p-3 m-2 ' onClick={googleHandle} >Login with Google</button>
} 
            { user && 
            <div>
                  <h4>User: {user.displayName}</h4>
                  <p>Email: {user.email}</p>
                  <img src={user.photoURL} alt="photo" />
            </div>
}         
   <p className='text-center text-success'>{msg}</p>
   <p className='text-center text-danger'>{err}</p>
        </div>
    );
};

export default Google;