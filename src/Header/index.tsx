//create header component
import React from 'react';
import './index.css';

const Header = () => {
    return (
        <header className="main-header">
            <h1 className="header-title">Breeds</h1>
            <p className='header-logo'>
                <span role="img" aria-label="heart">
                    ❤️
                </span>
                <span role="img" aria-label="dog">
                    🐶
                </span>
            </p>
        </header>
    );
}

export default Header;