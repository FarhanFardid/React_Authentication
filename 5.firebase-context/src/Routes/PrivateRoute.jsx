import  { useContext } from 'react';
import { AuthContext } from '../providers/AuthProvider';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({children}) => {
   const {user,loading} = useContext(AuthContext);

   if(loading){
    return <h2>Data is Loading,Please wait</h2>
   }
   if(user){
    return children;
   }
   else{
    return <Navigate to="/login" replace={true}></Navigate>
   }
    
};

export default PrivateRoute;