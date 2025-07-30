// src/components/Header.jsx
import React from 'react';
import './Header.css'; // Create this CSS file

const Header = () => {
  // Functions to handle clicks and log to console
  const handleSearchChange = (e) => {
    console.log('Search input:', e.target.value);
    // Add logic for real-time search filtering here
  };

  const handleIconButtonClick = (buttonName) => {
    console.log(`${buttonName} button clicked`);
    // Add specific functionality for each header icon button here
  };

  return (
    <header className="header">
      {/* Search Bar */}
      <div className="search-bar">
        <span className="search-text-icon">🔍</span> {/* Using emoji as "icon" */}
        <input type="text" placeholder="Q Search..." onChange={handleSearchChange} />
      </div>

      {/* Right-hand Icons and User Profile */}
      <div className="header-right">
        <button className="icon-button" onClick={() => handleIconButtonClick('Notification')}>🔔</button> {/* Using emoji as "icon" */}
        <button className="icon-button" onClick={() => handleIconButtonClick('Message')}>✉️</button> {/* Using emoji as "icon" */}
        <button className="icon-button" onClick={() => handleIconButtonClick('Apps')}>🧩</button> {/* Using emoji as "icon" */}
        <div className="user-profile">
          {/* Removed user avatar image */}
          <span className="user-text-icon">👤</span> {/* Using emoji as "icon" */}
        </div>
      </div>
    </header>
  );
};

export default Header;