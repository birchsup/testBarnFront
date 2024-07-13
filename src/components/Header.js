import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Header.css';
import logo from '../assets/logo.png'; // Убедитесь, что путь к логотипу правильный

const Header = () => {
    const navigate = useNavigate();

    return (
        <header className="app-header">
            <div className="header-logo" onClick={() => navigate('/')}>
                <img src={logo} alt="TestBarn Logo" className="logo-image" />
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
