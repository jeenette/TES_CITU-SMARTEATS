// App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import OrderForm from './components/OrderForm'; // Adjust the path if necessary
import StudentForm from './components/StudentForm'; // Adjust the path for the StudentForm
import './index.css';

const App = () => (
    <Router>
        <div className="app-container">
            <Routes>
                <Route path="/" element={<StudentForm />} /> {/* Homepage */}
                <Route path="/order" element={<OrderForm />} /> {/* OrderForm route */}
            </Routes>
        </div>
    </Router>
);

export default App;
