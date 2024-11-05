package com.g4appdev.TES.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.g4appdev.TES.entity.StudentEntity;

@Repository
public interface StudentRepository extends JpaRepository<StudentEntity, Long> {

    // Find a student by name
    StudentEntity findByName(String name);

    // Find students by grade level
    List<StudentEntity> findByGradeLevel(String gradeLevel);

    // Find a student by email
    StudentEntity findByEmail(String email);
}
