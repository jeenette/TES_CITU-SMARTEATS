// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes, } from 'react-router-dom';
import Menuitem from './Menuitem';
import Inventory from './Inventory';
import ViewAllMenuItems from './Viewallitems';
import './App.css';
import InventoryList from './Inventorytable';
import logo from './white_background.png'; // Import your logo image
import Registration from './Register';
import Home from './Home';
import Login from './Login';


const App = () => {
    return (
        <Router>
            <div>
                <nav>
                    <h1>
                        <img src={logo} alt="Logo" style={{ width: '50px', height: '50px', marginRight: '10px' }} /> {/* Adjust size as needed */}
                        CITU - SMART EATS
                    </h1>
                    <ul>
                    <a href="/menuitem" className="button">Menu Item</a>
                    <a href="/inventory" className="button">Inventory</a>
                    </ul>
                </nav>
                <Routes>
                    <Route path="/menuitem" element={<Menuitem />} />
                    <Route path="/view-all" element={<ViewAllMenuItems />} />
                    <Route path="/inventory" element={<Inventory />} />
                    <Route path="/inventory-table" element={<InventoryList />} />
                    <Route path="/register" element={<Registration />} />
                    <Route path="/home" element={<Home/>} />
                    <Route path="/login" element={<Login/>}/>
                </Routes>
            </div>
        </Router>
    );
};

export default App;
