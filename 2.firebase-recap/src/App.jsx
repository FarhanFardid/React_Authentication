import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import app from './firebase.config'
import {GoogleAuthProvider, getAuth, signInWithPopup, signOut} from 'firebase/auth'


const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
function App() {
  const [user, setUser] = useState(null);
  const handleGoogle = () => {
    signInWithPopup(auth, googleProvider)
    .then(result => {
      const loggedUser = result.user;
      setUser(loggedUser);
      console.log(loggedUser);
    })
    .catch(error => {
      console.log(error);
    })
  } 

  const handleLogout = () => {
    signOut(auth)
    .then(result => {
      setUser(null);
    })
    .catch(error => console.log(error))
  }



  return (
    <div className="App">
   
     
      <h1>React & Firebase</h1>
      {user ?
      <button onClick={handleLogout}>Logout</button> :
      <button onClick={handleGoogle}>Google Login</button>
      }
   
     { user && <div>
    <h2>User: {user.displayName}</h2>
    <p>Email: {user.email}</p>
    <img src={user.photoURL} alt="image" />
   </div>
}
      </div>
    
   
  )
}

export default App
