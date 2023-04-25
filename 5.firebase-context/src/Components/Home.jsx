import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";


const Home = () => {
    const {user} = useContext(AuthContext);
    console.log(user);
    return (
        <div>
            <h2>This is home {user && <span>{user}</span> }</h2>
            <p></p>
        </div>
    );
};

export default Home;