import axios from 'axios';

// Set the base URL for your API
const API_BASE_URL_ORDERS = 'http://localhost:8080/api/orders'; // Use the correct backend URL for orders
const API_BASE_URL_STUDENTS = 'http://localhost:8080/api/students'; // Use the correct backend URL for students

// Order API Functions

// Create a new Order
export const createOrder = async (orderData) => {
    try {
        const response = await axios.post(`${API_BASE_URL_ORDERS}/create`, orderData, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return response.data;
    } catch (error) {
        console.error("Error creating order:", error);
        throw error;
    }
};

// Get all Orders
export const getAllOrders = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL_ORDERS}/getAll`);
        return response.data;
    } catch (error) {
        console.error("Error fetching orders:", error);
        throw error;
    }
};

// Get an Order by ID
export const getOrderById = async (orderId) => {
    try {
        const response = await axios.get(`${API_BASE_URL_ORDERS}/get/${orderId}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching order by ID:", error);
        throw error;
    }
};

// Update an existing Order
export const updateOrder = async (orderId, orderData) => {
    try {
        const response = await axios.put(`${API_BASE_URL_ORDERS}/update/${orderId}`, orderData, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return response.data;
    } catch (error) {
        console.error("Error updating order:", error);
        throw error;
    }
};

// Delete an Order by ID
export const deleteOrder = async (orderId) => {
    try {
        const response = await axios.delete(`${API_BASE_URL_ORDERS}/delete/${orderId}`);
        return response.data;
    } catch (error) {
        console.error("Error deleting order:", error);
        throw error;
    }
};

// Student API Functions

// Create a new Student
export const createStudent = async (studentData) => {
    try {
        const response = await axios.post(`${API_BASE_URL_STUDENTS}/create`, studentData, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return response.data;
    } catch (error) {
        console.error("Error creating student:", error);
        throw error;
    }
};

// Get all Students
export const getAllStudents = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL_STUDENTS}/getAll`);
        return response.data;
    } catch (error) {
        console.error("Error fetching students:", error);
        throw error;
    }
};

// Get a Student by ID
export const getStudentById = async (studentId) => {
    try {
        const response = await axios.get(`${API_BASE_URL_STUDENTS}/getById/${studentId}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching student by ID:", error);
        throw error;
    }
};

// Update an existing Student
export const updateStudent = async (studentId, studentData) => {
    try {
        const response = await axios.put(`${API_BASE_URL_STUDENTS}/update/${studentId}`, studentData, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return response.data;
    } catch (error) {
        console.error("Error updating student:", error);
        throw error;
    }
};

// Delete a Student by ID
export const deleteStudent = async (studentId) => {
    try {
        const response = await axios.delete(`${API_BASE_URL_STUDENTS}/delete/${studentId}`);
        return response.data;
    } catch (error) {
        console.error("Error deleting student:", error);
        throw error;
    }
};
