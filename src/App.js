// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes, } from 'react-router-dom';
import Menuitem from './Menuitem';
import Inventory from './Inventory';
import ViewAllMenuItems from './Viewallitems';
import './App.css';
import InventoryList from './Inventorytable';
import logo from './white_background.png'; 
import Registration from './Register';
import Home from './Home';
import Login from './Login';
import Payment from './Payment';
import Staff from './Staff';
import PaymentList from './PaymentList'; 

const App = () => {
    return (
        <Router>
            <div>
                <nav>
                    <h1>
                        <img src={logo} alt="Logo" style={{ width: '50px', height: '50px', marginRight: '10px' }} /> 
                        CITU - SMART EATS
                    </h1>
                    <ul>
                        <a href="/menuitem" className="button">Menu Item</a>
                        <a href="/inventory" className="button">Inventory</a>
                        <a href="/payment" className="button">Payment</a>
                        <a href="/staff" className="button">Staff</a>
                        <a href="/payment-list" className="button">View Payments</a> 
                    </ul>
                </nav>
                <Routes>
                    <Route path="/menuitem" element={<Menuitem />} />
                    <Route path="/view-all" element={<ViewAllMenuItems />} />
                    <Route path="/inventory" element={<Inventory />} />
                    <Route path="/inventory-table" element={<InventoryList />} />
                    <Route path="/payment" element={<Payment />} />
                    <Route path="/payment-list" element={<PaymentList />} /> 
                    <Route path="/staff" element={<Staff />} />
                    <Route path="/register" element={<Registration />} />
                    <Route path="/home" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;
