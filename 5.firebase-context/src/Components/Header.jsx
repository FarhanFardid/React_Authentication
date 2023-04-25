import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../providers/AuthProvider";

const Header = () => {

  const {user,logOut} = useContext(AuthContext);

  const handleSignout = () =>{
    logOut()
    .then(() =>{})
    .catch(error => {console.log(error)})
  }

  return (
    <div>
      <div className="navbar bg-primary text-primary-content justify-between px-5">
        <a className="btn btn-ghost normal-case text-xl ">FireBase Auth Context</a>
      <Link className="btn btn-ghost normal-case text-xl" to="/">Home</Link>
      <Link className="btn btn-ghost normal-case text-xl" to="/orders">Orders</Link>
     
      <Link className="btn btn-ghost normal-case text-xl" to="/register">Register</Link>
      {user ? <>  <button onClick={handleSignout} className="btn btn-ghost normal-case text-xl ">SignOut</button> <span>{user.email}</span>  </>  :   <Link className="btn btn-ghost normal-case text-xl" to="/login">Sign In</Link>}
      </div>
    </div>
  );
};

export default Header;
