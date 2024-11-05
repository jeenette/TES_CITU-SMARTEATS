import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Payment.css';

const Payment = () => {
  const [paymentDetails, setPaymentDetails] = useState({
    Payment_ID: '',
    Payment_Method: '',
    Payment_Date: '',
    Payment_Status: '',
    Amount: ''
  });

  const navigate = useNavigate();

  // Handle input changes for the payment form
  const handleChange = (e) => {
    const { name, value } = e.target;
    setPaymentDetails({
      ...paymentDetails,
      [name]: value
    });
  };

  // Create a new payment (POST request)
  const handleCreatePayment = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/api/payments', paymentDetails); 
      console.log('Payment created successfully:', response.data);
      alert('Payment created successfully!');
      navigate('/success');  // Navigate to a success page (optional)
    } catch (error) {
      console.error('Error creating payment:', error);
      alert('Error creating payment. Please try again.');
    }
  };

  // Update an existing payment by ID (PUT request)
  const handleUpdatePayment = async (e) => {
    e.preventDefault();
    const paymentId = paymentDetails.Payment_ID;
    try {
      const response = await axios.put(`http://localhost:8080/api/payments/postPayment/${paymentId}`, paymentDetails);
      console.log('Payment updated successfully:', response.data);
      alert('Payment updated successfully!');
      navigate('/update-success');  // Navigate to a success page (optional)
    } catch (error) {
      console.error('Error updating payment:', error);
      alert('Error updating payment. Please try again.');
    }
  };

  // Delete a payment by ID (DELETE request)
  const handleDeletePayment = async () => {
    const paymentId = paymentDetails.Payment_ID;
    try {
      const response = await axios.delete(`http://localhost:8080/api/payments/deletePayment/${paymentId}`);
      console.log('Payment deleted successfully:', response.data);
      alert('Payment deleted successfully!');
      setPaymentDetails({
        Payment_ID: '',
        Payment_Method: '',
        Payment_Date: '',
        Payment_Status: '',
        Amount: ''
      }); // Clear form after deletion
    } catch (error) {
      console.error('Error deleting payment:', error);
      alert('Error deleting payment. Please try again.');
    }
  };

  return (
    <div className="container">
      <h1>Payment Form</h1>
      <form onSubmit={handleCreatePayment}>
        <label htmlFor="Payment_ID">Payment ID:</label>
        <input
          type="text"
          id="Payment_ID"
          name="Payment_ID"
          value={paymentDetails.Payment_ID}
          onChange={handleChange}
          required
        />

        <label htmlFor="Payment_Method">Payment Method:</label>
        <input
          type="text"
          id="Payment_Method"
          name="Payment_Method"
          value={paymentDetails.Payment_Method}
          onChange={handleChange}
          required
        />

        <label htmlFor="Payment_Date">Payment Date:</label>
        <input
          type="date"
          id="Payment_Date"
          name="Payment_Date"
          value={paymentDetails.Payment_Date}
          onChange={handleChange}
          required
        />

        <label htmlFor="Payment_Status">Payment Status:</label>
        <input
          type="text"
          id="Payment_Status"
          name="Payment_Status"
          value={paymentDetails.Payment_Status}
          onChange={handleChange}
          required
        />

        <label htmlFor="Amount">Amount:</label>
        <input
          type="text"
          id="Amount"
          name="Amount"
          value={paymentDetails.Amount}
          onChange={handleChange}
          required
        />

        <button type="submit">Create Payment</button>
        <button type="button" onClick={handleUpdatePayment}>
          Update Payment
        </button>
        <button type="button" onClick={handleDeletePayment}>
          Delete Payment
        </button>
      </form>
    </div>
  );
};

export default Payment;
