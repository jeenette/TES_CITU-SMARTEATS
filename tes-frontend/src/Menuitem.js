// src/Menuitem.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useLocation } from 'react-router-dom'; // Import Link and useLocation
import './Menuitem.css';  // Import CSS file

const Menuitem = () => {
    const [menuItems, setMenuItems] = useState([]);
    const [newItem, setNewItem] = useState({ item_name: '', price: '', category: '', status: '', image_url: '' });
    const [editingItem, setEditingItem] = useState(null); // State for the item being edited

    const location = useLocation(); // Use location to get state from the navigation

    useEffect(() => {
        fetchMenuItems();
        // Check if there is an item in the location state for editing
        if (location.state && location.state.item) {
            setEditingItem(location.state.item);
            setNewItem(location.state.item); // Populate the form with the item details
        }
    }, [location.state]);

    const fetchMenuItems = async () => {
        const response = await axios.get('http://localhost:8080/tes/menu/getAllMenu');
        setMenuItems(response.data);
    };

    const addMenuItem = async () => {
        await axios.post('http://localhost:8080/tes/menu/insertMenu', newItem);
        fetchMenuItems();
        resetForm();
    };

    const updateMenuItem = async () => {
        // Make sure to send the menu_id as a query parameter
        await axios.put(`http://localhost:8080/tes/menu/putMenuitemDetails?menu_id=${editingItem.menu_id}`, newItem);
        fetchMenuItems();
        resetForm();
        setEditingItem(null); // Clear editing item after update
    };

    const resetForm = () => {
        setNewItem({ item_name: '', price:  '', category: '', status: '', image_url: '' });
        setEditingItem(null); // Reset editing item
    };

    return (
        <div className="container">
            <h2>Menu Items</h2>

            <input
                type="text"
                placeholder="Item Name"
                value={newItem.item_name}
                onChange={(e) => setNewItem({ ...newItem, item_name: e.target.value })}
            />
            <input
                type="text"
                placeholder="Price"
                value={newItem.price}
                onChange={(e) => {
                    const value = e.target.value;

                    // Allow only numeric input
                    if (/^\d*\.?\d*$/.test(value)) { // Regex to match a valid number (including decimals)
                        setNewItem({ ...newItem, price: value }); // Store the price as a string
                    }
                }}
            />

            <select
                value={newItem.category}
                onChange={(e) => setNewItem({ ...newItem, category: e.target.value })}
            >
                <option value="">Select Category</option> {/* Placeholder option */}
                <option value="Meals">Meals</option>
                <option value="Snacks">Snacks</option>
                <option value="Drinks">Drinks</option>
            </select>

            <input
                type="text"
                placeholder="Status"
                value={newItem.status}
                onChange={(e) => setNewItem({ ...newItem, status: e.target.value })}
            />
            <input
                type="text"
                placeholder="Image URL"
                value={newItem.image_url}
                onChange={(e) => setNewItem({ ...newItem, image_url: e.target.value })}
            />
            
            {/* Display the image if image_url is provided */}
            {newItem.image_url && (
                <div className="image-preview">
                    <h4>Image Preview:</h4>
                    <img src={newItem.image_url} alt="Preview" style={{ width: '200px', height: 'auto', marginTop: '10px' }} />
                </div>
            )}

            <button onClick={editingItem ? updateMenuItem : addMenuItem}>
                {editingItem ? 'Update Menu Item' : 'Add Menu Item'}
            </button>

            {/* Link to view all items */}
            <Link to="/view-all" style={{ marginTop: '20px', display: 'block' }}>
                <button style={{ padding: '10px', fontSize: '16px' }}>View All Menu Items</button>
            </Link>
        </div>
    );
};

export default Menuitem;
