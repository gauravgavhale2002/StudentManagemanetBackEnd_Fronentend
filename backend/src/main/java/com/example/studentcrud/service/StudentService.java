package com.example.studentcrud.service;

import com.example.studentcrud.model.Student;
import com.example.studentcrud.repository.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class StudentService {

    @Autowired
    private StudentRepository studentRepository;

    public List<Student> getAllStudents() {
        return studentRepository.findAll();
    }

    public Student saveStudent(Student student) {
        return studentRepository.save(student);
    }

    public Student updateStudent(Long id, Student student) {
        Student existing = studentRepository.findById(id).orElseThrow();
        existing.setName(student.getName());
        existing.setDob(student.getDob());
        existing.setEmail(student.getEmail());
        existing.setCountry(student.getCountry());
        return studentRepository.save(existing);
    }

    public void deleteStudent(Long id) {
        studentRepository.deleteById(id);
    }

    public Student getStudentById(Long id) {
        return studentRepository.findById(id).orElseThrow();
    }
}
