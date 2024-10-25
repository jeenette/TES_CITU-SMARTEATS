// src/InventoryList.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import './Inventory.css';  // Import CSS file

const InventoryList = () => {
    const [inventories, setInventories] = useState([]);
    const [newInventory, setNewInventory] = useState({ inventory_id: '', stock_quantity: '', restock_date: '', supplier: '' });
    const [editingInventory, setEditingInventory] = useState(null); // State for editing inventory

    const navigate = useNavigate(); // Initialize useNavigate

    useEffect(() => {
        fetchInventories();
    }, []);

    const fetchInventories = async () => {
        const response = await axios.get('http://localhost:8080/tes/inventory/getAllInventories');
        setInventories(response.data);
    };

    const addInventory = async () => {
        try {
            if (editingInventory) {
                await axios.put(`http://localhost:8080/tes/inventory/putInventoryDetails?inventory_id=${editingInventory.inventory_id}`, newInventory);
                setEditingInventory(null); // Clear editing state after update
            } else {
                await axios.post('http://localhost:8080/tes/inventory/insertInventory', newInventory);
            }
            fetchInventories();
            setNewInventory({ inventory_id: '', stock_quantity: '', restock_date: '', supplier: '' });
        } catch (error) {
            console.error("Error adding/updating inventory:", error);
            // Consider displaying an error message to the user
        }
    };

    const deleteInventory = async (inventory_id) => {
        try {
            await axios.delete(`http://localhost:8080/tes/inventory/deleteInventoryDetails/${inventory_id}`);
            fetchInventories(); // Refresh the list after deletion
        } catch (error) {
            console.error("Error deleting inventory:", error);
            // Consider displaying an error message to the user
        }
    };

    const editInventory = (inventory) => {
        // Navigate to Inventory component and pass the inventory data
        navigate('/inventory', { state: { inventory } });
    };

    return (
        <div className="container">
            <h2>Inventory List </h2>

            <table className="inventory-table">
                <thead>
                    <tr>
                        <th>Inventory ID</th>
                        <th>Quantity</th>
                        <th>Supplier</th>
                        <th>Restock Date</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {inventories.map(inventory => (
                        <tr key={inventory.inventory_id}>
                            <td>{inventory.inventory_id}</td>
                            <td>{inventory.stock_quantity}</td>
                            <td>{inventory.supplier}</td>
                            <td>{inventory.restock_date}</td>
                            <td>
                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <button onClick={() => editInventory(inventory)}>Edit</button>
                                    <button onClick={() => deleteInventory(inventory.inventory_id)} className="delete-button">
                                        Delete
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default InventoryList;
