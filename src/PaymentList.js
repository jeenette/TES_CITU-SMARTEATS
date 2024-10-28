// PaymentList.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './PaymentList.css';

const PaymentList = () => {
  const [payments, setPayments] = useState([]);

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/payments'); 
        setPayments(response.data);
      } catch (error) {
        console.error('Error fetching payments:', error);
      }
    };

    fetchPayments();
  }, []);

  return (
    <div className="payment-list-container">
      <h1>Payment List</h1>
      <table>
        <thead>
          <tr>
            <th>Payment ID</th>
            <th>Payment Method</th>
            <th>Payment Date</th>
            <th>Payment Status</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
          {payments.map((payment) => (
            <tr key={payment.Payment_ID}>
              <td>{payment.Payment_ID}</td>
              <td>{payment.Payment_Method}</td>
              <td>{payment.Payment_Date}</td>
              <td>{payment.Payment_Status}</td>
              <td>{payment.Amount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PaymentList;
