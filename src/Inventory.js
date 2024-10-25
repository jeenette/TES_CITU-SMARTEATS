// src/Inventory.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom'; // Import useLocation and useNavigate
import './Inventory.css';  // Import CSS file

const Inventory = () => {
    const [inventories, setInventories] = useState([]);
    const [newInventory, setNewInventory] = useState({ inventory_id: '', stock_quantity: '', restock_date: '', supplier: '' });
    const [editingInventory, setEditingInventory] = useState(null); // State for editing inventory
    const navigate = useNavigate(); // Initialize useNavigate
    const location = useLocation(); // Get location for passed state

    useEffect(() => {
        fetchInventories();

        // Check if there's inventory data passed from the InventoryList
        if (location.state && location.state.inventory) {
            setNewInventory(location.state.inventory); // Populate with inventory to edit
            setEditingInventory(location.state.inventory); // Set the editing inventory
        }
    }, [location.state]); // Run effect when the state changes

    const fetchInventories = async () => {
        const response = await axios.get('http://localhost:8080/tes/inventory/getAllInventories');
        setInventories(response.data);
    };

    const addInventory = async () => {
        try {
            if (editingInventory) {
                // If editing, update the existing inventory
                await axios.put(`http://localhost:8080/tes/inventory/putInventoryDetails?inventory_id=${editingInventory.inventory_id}`, newInventory);
                setEditingInventory(null); // Clear editing state after update
            } else {
                // Otherwise, add a new inventory
                await axios.post('http://localhost:8080/tes/inventory/insertInventory', newInventory);
            }
            fetchInventories(); // Refresh the inventory list
            setNewInventory({ inventory_id: '', stock_quantity: '', restock_date: '', supplier: '' }); // Clear form
        } catch (error) {
            console.error("Error adding/updating inventory:", error);
            // Optionally display an error message to the user
        }
    };

    const navigateToInventoryTable = () => {
        navigate('/inventory-table'); // Navigate to InventoryTable component
    };

    return (
        <div className="container">
            <h2>Inventory</h2>
            <input
                type="text" // Use text input for better control
                placeholder="Stock Quantity"
                value={newInventory.stock_quantity}
                onChange={(e) => {
                    const value = e.target.value;

                    // Validate to allow only numeric input
                    if (/^\d*$/.test(value)) { 
                        setNewInventory({ ...newInventory, stock_quantity: value });
                    }
                }}
            />
            <input
                type="date" // Change to date input type
                placeholder="Restock Date"
                value={newInventory.restock_date}
                onChange={(e) => setNewInventory({ ...newInventory, restock_date: e.target.value })}
            />
            <input
                type="text"
                placeholder="Supplier"
                value={newInventory.supplier}
                onChange={(e) => setNewInventory({ ...newInventory, supplier: e.target.value })}
            />
            <button onClick={addInventory}>
                {editingInventory ? 'Update Inventory' : 'Add Inventory'}
            </button>
            <button onClick={navigateToInventoryTable}>
                Inventory List
            </button>
        </div>
    );
};

export default Inventory;
