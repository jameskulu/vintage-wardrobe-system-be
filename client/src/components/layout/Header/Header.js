import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <div>
            <Link className="btn btn-primary" to="/login" role="button">
                Login
            </Link>
            <Link className="btn btn-primary" to="/signup" role="button">
                SignUp
            </Link>
        </div>
    );
};

export default Header;
