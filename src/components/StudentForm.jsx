import React, { useEffect, useState } from 'react';
import { createStudent, updateStudent, getStudentById, getAllStudents, deleteStudent } from '../api';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, Typography, TextField, Button } from '@mui/material';

const StudentForm = () => {
    const [name, setName] = useState('');
    const [gradeLevel, setGradeLevel] = useState('');
    const [contactNumber, setContactNumber] = useState('');
    const [email, setEmail] = useState('');
    const [isEditing, setIsEditing] = useState(false);
    const [students, setStudents] = useState([]);
    const [currentStudentId, setCurrentStudentId] = useState(null);

    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        loadStudents();
    }, []);

    const loadStudents = async () => {
        try {
            const fetchedStudents = await getAllStudents();
            setStudents(fetchedStudents);
        } catch (error) {
            console.error('Error fetching students:', error);
        }
    };

    useEffect(() => {
        if (id) {
            const fetchStudent = async () => {
                try {
                    const student = await getStudentById(id);
                    setName(student.name);
                    setGradeLevel(student.gradeLevel);
                    setContactNumber(student.contactNumber);
                    setEmail(student.email);
                    setCurrentStudentId(id);
                    setIsEditing(true);
                } catch (error) {
                    console.error("Error fetching student:", error);
                }
            };
            fetchStudent();
        }
    }, [id]);

    const handleSendStudent = async (e) => {
        e.preventDefault();
        const studentData = {
            name,
            gradeLevel,
            contactNumber,
            email,
        };

        try {
            if (isEditing) {
                await updateStudent(currentStudentId, studentData);
                alert('Student updated successfully!');
            } else {
                await createStudent(studentData);
                alert('Student created successfully!');
            }
            loadStudents();
            clearForm();
            navigate('/order');
        } catch (error) {
            console.error('Error sending student:', error);
            alert('Failed to save student: ' + error.message);
        }
    };

    const clearForm = () => {
        setName('');
        setGradeLevel('');
        setContactNumber('');
        setEmail('');
        setCurrentStudentId(null);
        setIsEditing(false);
    };

    const handleEdit = (student) => {
        setName(student.name);
        setGradeLevel(student.gradeLevel);
        setContactNumber(student.contactNumber);
        setEmail(student.email);
        setCurrentStudentId(student.studId);
        setIsEditing(true);
    };

    const handleDelete = async (studentId) => {
        if (window.confirm('Are you sure you want to delete this student?')) {
            try {
                await deleteStudent(studentId);
                alert('Student deleted successfully!');
                loadStudents();
            } catch (error) {
                console.error('Error deleting student:', error);
                alert('Failed to delete student: ' + error.message);
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
                    style={{ width: '500px', height: 'auto', paddingTop: '100px'}} 
                />
            </div>

            {/* Main Container */}
            <Box style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '8px', fontFamily: 'Arial, sans-serif', color: 'black', maxWidth: '600px', margin: '0 auto', marginBottom: "40px" }}>
                <Typography variant="h5" style={{ color: 'black', marginBottom: '20px', textAlign: 'center' }}>
                    {isEditing ? 'Edit Student' : 'Student Login'}
                </Typography>
                
                <form onSubmit={handleSendStudent}>
                    <TextField
                        label="Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        fullWidth
                        margin="normal"
                        variant="outlined"
                        required
                        InputProps={{
                            style: { backgroundColor: 'white' }
                        }}
                    />
                    <TextField
                        label="Grade Level"
                        value={gradeLevel}
                        onChange={(e) => setGradeLevel(e.target.value)}
                        fullWidth
                        margin="normal"
                        variant="outlined"
                        required
                        InputProps={{
                            style: { backgroundColor: 'white' }
                        }}
                    />
                    <TextField
                        label="Contact Number"
                        value={contactNumber}
                        onChange={(e) => setContactNumber(e.target.value)}
                        fullWidth
                        margin="normal"
                        variant="outlined"
                        required
                        InputProps={{
                            style: { backgroundColor: 'white' }
                        }}
                    />
                    <TextField
                        label="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        fullWidth
                        margin="normal"
                        variant="outlined"
                        required
                        InputProps={{
                            style: { backgroundColor: 'white' }
                        }}
                    />
                    <Button type="submit" variant="contained" color="primary" style={{ marginTop: '20px', width: '180px', textAlign: 'center', backgroundColor: "#800000"}}>
                        {isEditing ? 'Update Student' : 'Confirm'}
                    </Button>
                    {isEditing && (
                        <Button type="button" onClick={clearForm} variant="contained" color="primary" style={{ marginTop: '20px', width: '180px', marginLeft: '240px', backgroundColor:'#efbf04'}}>
                            Cancel Edit
                        </Button>
                    )}
                </form>

                <Typography variant="h6" style={{ color: 'white', marginTop: '40px', textAlign: 'center' }}>Students Record</Typography>
                <ul>
                    {students.length > 0 ? (
                        students.map((student) => (
                            <li key={student.studId} style={{ color: 'black', marginBottom: '10px', paddingBottom: '10px', borderBottom: '1px solid black' }}>
                                {`Student ID: ${student.studId}`} <br />
                                {`Name: ${student.name}`} <br />
                                {`Grade Level: ${student.gradeLevel}`} <br />
                                {`Contact Number: ${student.contactNumber}`} <br />
                                {`Email: ${student.email}`} <br />
                                <Button onClick={() => handleEdit(student)} variant="contained" color="primary" style={{ width: '80px', backgroundColor: "#800000" }}>Edit</Button>
                                <Button onClick={() => handleDelete(student.studId)} variant="contained" style={{ backgroundColor: "#efbf04" }}>Delete</Button>
                            </li>
                        ))
                    ) : (
                        <Typography variant="body1" style={{ color: 'black' }}>No students found.</Typography>
                    )}
                </ul>
            </Box>
        </div>
    );
};

export default StudentForm;
