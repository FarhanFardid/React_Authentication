import React, { createContext, useEffect, useState } from 'react';
import app from '../Firebase/firebase.config';
import {GoogleAuthProvider, createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut} from 'firebase/auth';
export const AuthContext = createContext(null); 

const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
const AuthProvider = ({children}) => {
    const [user,setUser] = useState(null);
    const [loading,setLoading] = useState(true);

    const createUser = (email,password) => {
       return createUserWithEmailAndPassword(auth,email,password);
    }

     const signUser = (email,password)=> {
        return signInWithEmailAndPassword(auth,email,password);
     }

      const logOut = () =>{
       return signOut(auth);
      }

      const googleLogin = () =>{
        return signInWithPopup(auth,googleProvider);
      }


     useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, currentUser => {
            console.log(currentUser);
            setUser(currentUser);
            setLoading(false);
        });

        return () => {
            unsubscribe();
        }
     },[])

    const authInfo = {user,createUser,signUser,logOut,loading,googleLogin};
  
    return (
        <AuthContext.Provider value ={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;