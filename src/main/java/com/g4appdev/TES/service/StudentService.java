package com.g4appdev.TES.service;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.g4appdev.TES.entity.StudentEntity;
import com.g4appdev.TES.repository.StudentRepository;

@Service
public class StudentService {

    private final StudentRepository studentRepository;

    @Autowired
    public StudentService(StudentRepository studentRepository) {
        this.studentRepository = studentRepository;
    }

    public StudentEntity saveStudent(StudentEntity student) {
        return studentRepository.save(student);
    }

    public Optional<StudentEntity> getStudentById(long studentId) {
        return studentRepository.findById(studentId);
    }

    public List<StudentEntity> getAllStudents() {
        return studentRepository.findAll();
    }

    public StudentEntity updateStudent(long studentId, StudentEntity studentDetails) {
        StudentEntity existingStudent = studentRepository.findById(studentId)
                .orElseThrow(() -> new NoSuchElementException("Student not found with id " + studentId));

        existingStudent.setName(studentDetails.getName());
        existingStudent.setGradeLevel(studentDetails.getGradeLevel());
        existingStudent.setContactNumber(studentDetails.getContactNumber());
        existingStudent.setEmail(studentDetails.getEmail());

        return studentRepository.save(existingStudent);
    }

    public void deleteStudent(long studentId) {
        if (!studentRepository.existsById(studentId)) {
            throw new NoSuchElementException("Student not found with id " + studentId);
        }
        studentRepository.deleteById(studentId);
    }
}
