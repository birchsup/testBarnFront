import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Header.css';
import logo from '../assets/logo.webp'; // Убедитесь, что путь к логотипу правильный

const Header = () => {
    const navigate = useNavigate();

    return (
        <header className="app-header">
            <div className="header-left">
                <div className="header-logo" onClick={() => navigate('/')}>
                    <img src={logo} alt="TestBarn Logo" className="logo-image"/>
                    TestBarn
                </div>
                <nav className="header-nav">
                    <button className="header-button" onClick={() => navigate('/testcases')}>All Tests</button>
                    <button className="header-button" onClick={() => navigate('/create')}>Create Test Case</button>
                    <button className="header-button" onClick={() => navigate('/createTestSuite')}>Create Test Suite
                    </button>
                    <button className="header-button" onClick={() => navigate('/createTestRun')}>Create Test Run
                    </button>
                </nav>
            </div>
        </header>
    );
};

export default Header;
