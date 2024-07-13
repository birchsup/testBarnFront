import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Header.css';

const Header = () => {
    const navigate = useNavigate();

    return (
        <header className="app-header">
            <div className="header-logo" onClick={() => navigate('/')}>
                TestBarn
            </div>
            <nav className="header-nav">
                <button className="header-button" onClick={() => navigate('/testcases')}>All Tests</button>
                <button className="header-button" onClick={() => navigate('/create')}>Create Test Case</button>
            </nav>
        </header>
    );
};

export default Header;
