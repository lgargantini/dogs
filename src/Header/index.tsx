//create header component
import React from 'react';
import './index.css';

const Header = () => {
    return (
        <header className="App-header">
                <p>
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