package com.g4appdev.TES.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "students") // Specify the table name
public class StudentEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long studId;

    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "grade_level", nullable = false)
    private String gradeLevel;

    @Column(name = "contact_number", nullable = false)
    private String contactNumber;

    @Column(name = "email", nullable = false)
    private String email;

    // Default constructor
    public StudentEntity() {
        // No-arg constructor
    }

    // Parameterized constructor
    public StudentEntity(long studId, String name, String gradeLevel, String contactNumber, String email) {
        this.studId = studId;
        this.name = name;
        this.gradeLevel = gradeLevel;
        this.contactNumber = contactNumber;
        this.email = email;
    }

    // Getters and Setters
    public long getStudId() {
        return studId;
    }

    public void setStudId(long studId) {
        this.studId = studId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getGradeLevel() {
        return gradeLevel;
    }

    public void setGradeLevel(String gradeLevel) {
        this.gradeLevel = gradeLevel;
    }

    public String getContactNumber() {
        return contactNumber;
    }

    public void setContactNumber(String contactNumber) {
        this.contactNumber = contactNumber;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    @Override
    public String toString() {
        return String.format("StudentEntity{studId=%d, name='%s', gradeLevel='%s', contactNumber='%s', email='%s'}", 
                studId, name, gradeLevel, contactNumber, email);
    }
}
