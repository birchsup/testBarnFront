import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './Header.css';
import logo from '../assets/logo.webp'; // Убедитесь, что путь к логотипу правильный

const Header = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const isActive = (path) => location.pathname === path;

    return (
        <header className="app-header">
            <div className="header-logo" onClick={() => navigate('/')}>
                <img src={logo} alt="TestBarn Logo" className="logo-image" />
                TestBarn
            </div>
            <nav className="header-nav">
                <button
                    className={`header-button ${isActive('/testcases') ? 'active' : ''}`}
                    onClick={() => navigate('/testcases')}
                >
                    All Tests
                </button>
                <button
                    className={`header-button ${isActive('/create') ? 'active' : ''}`}
                    onClick={() => navigate('/create')}
                >
                    Create Test Case
                </button>
                <button
                    className={`header-button ${isActive('/test-suites') ? 'active' : ''}`}
                    onClick={() => navigate('/test-suites')}
                >
                    List Of Test Suites
                </button>
                <button
                    className={`header-button ${isActive('/createTestRun') ? 'active' : ''}`}
                    onClick={() => navigate('/createTestRun')}
                >
                    Create Test Run
                </button>
            </nav>
        </header>
    );
};

export default Header;
