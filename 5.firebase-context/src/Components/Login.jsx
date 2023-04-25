import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../providers/AuthProvider";



const Login = () => {
    const {signUser,googleLogin} = useContext(AuthContext);

const handleLogin = event =>{
    event.preventDefault();
    const form  = event.target;
    const email = form.email.value;
    const password = form.password.value;
    console.log(email,password);

    signUser(email,password)
    .then (result => {
        const loggedUser = result.user;
        console.log(loggedUser);
        form.reset();
    })
    .catch(error => {
        console.log(error);
    })

}

const loginGoogle = () =>{
  googleLogin()
  .then(result => {
    const loggedUser = result.user;
    console.log(loggedUser);
  })
  .catch(error => {console.log(error)})

}

    return (
        <div>
           <div className="hero min-h-screen bg-base-200">
  <div className="hero-content flex-col p-3">
    <div className="text-center lg:text-left">
      <h1 className="text-5xl font-bold">Login now!</h1>
      
    </div>
    <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
      <form onSubmit={handleLogin} className="card-body">
        <div className="form-control">
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input type="email" placeholder="Email" name="email" className="input input-bordered" required/>
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Password</span>
          </label>
          <input type="password" placeholder="Password" name="password" className="input input-bordered" />
          <label className="label">
            <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
          </label>
          <label className="label">
         <Link to="/register" className="label-text-alt link link-hover text-blue-700">New to website? please Register</Link>
       </label>
        </div>
        <div className="form-control mt-6">
          <button className="btn btn-primary m-2">Login</button>
          <button onClick = {loginGoogle} className="btn btn-primary m-1">Login with Google</button>
        </div>
      </form>
    </div>
  </div>
</div>
        </div>
    );
};

export default Login;