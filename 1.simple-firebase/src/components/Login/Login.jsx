import React, { useState } from 'react';
import {GithubAuthProvider, GoogleAuthProvider, getAuth, signInWithPopup, signOut} from 'firebase/auth'
import app from '../../firebase/firebase.init';

const Login = () => {
    const [user,setUser] = useState(null);
    const auth = getAuth(app);
    const googleProvider = new GoogleAuthProvider();
    const githubProvider = new GithubAuthProvider();


    const handleGoogleLog = () =>{

       signInWithPopup (auth, googleProvider)
       .then((result) => {
        const loggedUser = result.user;
        setUser(loggedUser);
        console.log(loggedUser);
       })
       .catch ((error) => {
        console.log("error", error.message);
       })
    }

    const handleGithubLog =() =>{
        signInWithPopup(auth, githubProvider)
        .then (res => {
            const loggedUser= res.user;
            setUser(loggedUser);
            console.log(loggedUser);
        })
    }

    const handleSignOut = () => {
        signOut(auth)
        .then (result => {
            setUser(null);
            console.log(result);
        })
        .catch(error => console.log(error));
    }
    return (
        <div>
            <h2>This is login Page</h2>
            { user ? 
            <button onClick={handleSignOut}>Sign Out</button> :
           <div> <button onClick={handleGoogleLog}>Google Login</button>
           <button onClick={handleGithubLog}>GitHub Login</button></div>
            }

           { user && <div>
                <h3>User: {user.displayName}</h3>
                <p>Email: {user.email ? user.email : "farhanfardid62@gmail.com"} </p>
                <img src={user.photoURL} alt="" />
            </div>}
        </div>
    );
};

export default Login;