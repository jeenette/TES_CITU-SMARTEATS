import React, { useEffect, useState } from 'react';
import { createOrder, updateOrder, getOrderById, getAllOrders, deleteOrder } from '../api';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, Typography, TextField, Button } from '@mui/material';

const OrderForm = () => {
    const [orderDate, setOrderDate] = useState('');
    const [orderTime, setOrderTime] = useState('');
    const [totalAmount, setTotalAmount] = useState('');
    const [isEditing, setIsEditing] = useState(false);
    const [orders, setOrders] = useState([]);
    const [currentOrderId, setCurrentOrderId] = useState(null);

    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        loadOrders();
    }, []);

    const loadOrders = async () => {
        try {
            const fetchedOrders = await getAllOrders();
            setOrders(fetchedOrders);
        } catch (error) {
            console.error('Error fetching orders:', error);
        }
    };

    useEffect(() => {
        if (id) {
            const fetchOrder = async () => {
                try {
                    const order = await getOrderById(id);
                    setOrderDate(order.orderDate);
                    setOrderTime(order.orderTime);
                    setTotalAmount(order.totalAmount);
                    setCurrentOrderId(id);
                    setIsEditing(true);
                } catch (error) {
                    console.error("Error fetching order:", error);
                }
            };
            fetchOrder();
        }
    }, [id]);

    const handleSendOrder = async (e) => {
        e.preventDefault();
        const orderData = {
            orderDate,
            orderTime,
            totalAmount: parseFloat(totalAmount),
        };

        try {
            if (isEditing) {
                await updateOrder(currentOrderId, orderData);
                alert('Order updated successfully!');
            } else {
                await createOrder(orderData);
                alert('Order created successfully!');
            }
            loadOrders();
            clearForm();
        } catch (error) {
            console.error('Error sending order:', error);
            alert('Failed to save order: ' + error.message);
        }
    };

    const clearForm = () => {
        setOrderDate('');
        setOrderTime('');
        setTotalAmount('');
        setCurrentOrderId(null);
        setIsEditing(false);
    };

    const handleEdit = (order) => {
        setOrderDate(order.orderDate);
        setOrderTime(order.orderTime);
        setTotalAmount(order.totalAmount);
        setCurrentOrderId(order.orderId);
        setIsEditing(true);
    };

    const handleGoBack = () => {
        navigate('/'); // Navigate back to the homepage
    };

    const handleDelete = async (orderId) => {
        if (window.confirm('Are you sure you want to delete this order?')) {
            try {
                await deleteOrder(orderId);
                alert('Order deleted successfully!');
                loadOrders();
            } catch (error) {
                console.error('Error deleting order:', error);
                alert('Failed to delete order: ' + error.message);
            }
        }
    };

    return (
        <div>
            {/* Logo Image */}
            <div style={{ textAlign: 'center', marginBottom: '20px' }}>
                <img 
                    src="/src/assets/images/logo1.png" 
                    alt="Logo" 
                    style={{ width: '500px', height: 'auto',  paddingTop: "20px"}} 
                />
            </div>

            {/* Main Container */}
            <Box style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '8px', fontFamily: 'Arial, sans-serif', color: 'black', maxWidth: '600px', margin: '0 auto', position: 'relative' }}>
            <Button 
                variant="contained" 
                color="primary" 
                onClick={handleGoBack} 
                sx={{ position: 'absolute', right: '20px', top: '20px', backgroundColor:'#efbf04' }} // Fixed position within the container
            >
                Go Back
            </Button>
                <Typography variant="h5" style={{ color: 'white', marginBottom: '20px', textAlign: 'center' }}>
                    {isEditing ? 'Edit Order' : 'Create Order'}
                </Typography>
                
                <form onSubmit={handleSendOrder}>
                    <TextField
                        label="Order Date"
                        type="text"
                        value={orderDate}
                        onChange={(e) => setOrderDate(e.target.value)}
                        fullWidth
                        margin="normal"
                        variant="outlined"
                        required
                        placeholder="ex. YYYY-MM-DD"
                        InputProps={{
                            style: { backgroundColor: 'white' }
                        }}
                    />
                    <TextField
                        label="Order Time"
                        type="text"
                        value={orderTime}
                        onChange={(e) => setOrderTime(e.target.value)}
                        fullWidth
                        margin="normal"
                        variant="outlined"
                        required
                        placeholder="ex. 13:00 for 1:00 PM"
                        InputProps={{
                            style: { backgroundColor: 'white' }
                        }}
                    />
                    <TextField
                        label="Total Amount"
                        type="text"
                        value={totalAmount}
                        onChange={(e) => setTotalAmount(e.target.value)}
                        fullWidth
                        margin="normal"
                        variant="outlined"
                        required
                        InputProps={{
                            style: { backgroundColor: 'white' }
                        }}
                    />
                    <Button type="submit" variant="contained" color="primary" style={{ marginTop: '20px', width: '180px', textAlign: 'center', backgroundColor: '#800000'}}>
                        {isEditing ? 'Update Order' : 'Confirm'}
                    </Button>
                    {isEditing && (
                        <Button type="button" onClick={clearForm} variant="contained" color="primary" style={{ marginTop: '20px', width: '180px', marginLeft: '240px', backgroundColor: "#efbf04"}}>
                            Cancel Edit
                        </Button>
                    )}
                </form>

                <Typography variant="h6" style={{ color: 'white', marginTop: '40px', textAlign: 'center' }}>Orders Records</Typography>
                <ul>
                    {orders.length > 0 ? (
                        orders.map((order) => (
                            <li key={order.orderId} style={{ color: 'black', marginBottom: '10px', paddingBottom: '10px', borderBottom: '1px solid white' }}>
                                {`Order ID: ${order.orderId}`} <br />
                                {`Date: ${order.orderDate}`} <br />
                                {`Time: ${order.orderTime}`} <br />
                                {`Amount: $${order.totalAmount}`} <br />
                                <Button onClick={() => handleEdit(order)} variant="contained" color="primary" style={{ width: '80px', backgroundColor: "#800000"}}>Edit</Button>
                                <Button onClick={() => handleDelete(order.orderId)} variant="contained" style={{ backgroundColor: "#efbf04" }}>Delete</Button>
                            </li>
                        ))
                    ) : (
                        <Typography variant="body1" style={{ color: 'black' }}>No orders found.</Typography>
                    )}
                </ul>
            </Box>
        </div>
    );
};

export default OrderForm;
