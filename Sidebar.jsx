 
import React, { useState } from 'react';
import './Sidebar.css';  

const Sidebar = () => {
  const [activeItem, setActiveItem] = useState('Dashboards');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // State for mobile menu

   
  const navItems = [
    { name: 'Dashboards', textIcon: '🏠' }, 
    { name: 'Academic', textIcon: '🎓' },
    { name: 'Users', textIcon: '👤' },
    { name: 'Security', textIcon: '🔒' },
   // { name: 'Billing & Plans', textIcon: '💳' },
    //{ name: 'Email', textIcon: '✉️' },
    //{ name: 'Chat', textIcon: '💬' },
    { name: 'Calendar', textIcon: '📅' },
    { name: 'Events', textIcon: '🗓️' },
    //{ name: 'Invoice', textIcon: '🧾' },
    //{ name: 'Roles & Permiss..', textIcon: '⚙️' },
  ];

  // Function to handle clicks and log to console
  const handleItemClick = (itemName) => {
    setActiveItem(itemName);
    setIsSidebarOpen(false); // Close sidebar on item click for mobile
    console.log(`Sidebar item clicked: ${itemName}`);
    // Add more specific functionality here for each item if needed
  };

  return (
    // Conditional class for mobile responsiveness
    <aside className={`sidebar ${isSidebarOpen ? 'open' : ''}`}>
      {/* Mobile menu toggle button */}
      <button className="menu-toggle-button" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
        ☰ {/* Hamburger icon */}
      </button>

      <div className="sidebar-header">
        {/* Removed logo image */}
        <span className="sidebar-title">Uptoskills</span> {/* The 'A demo' text from the image */}
      </div>
      <nav className="sidebar-nav">
        <ul>
          {navItems.map((item) => (
            <li
              key={item.name}
              className={activeItem === item.name ? 'active' : ''}
              onClick={() => handleItemClick(item.name)} // Use the new click handler
            >
              <div className="nav-item-content">
                <span className="nav-text-icon">{item.textIcon}</span> {/* Using text-based "icon" */}
                <span>{item.name}</span>
              </div>
            </li>
          ))}
        </ul>
      </nav>
      
      
    </aside>
  );
};

export default Sidebar;