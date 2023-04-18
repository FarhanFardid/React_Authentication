import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <div>
            <Link className='text-decoration-none ps-5 fw-bold fs-large' to="/">Home</Link>
            <Link className='text-decoration-none ps-5 fw-bold fs-large' to="/google">Google</Link>
            <Link className='text-decoration-none ps-5 fw-bold fs-large' to="/github">Github</Link>
            <Link className='text-decoration-none ps-5 fw-bold fs-large' to="/register">Register</Link>
            <Link className='text-decoration-none ps-5 fw-bold fs-large' to="/login">Login</Link>
        </div>
    );
};

export default Header;