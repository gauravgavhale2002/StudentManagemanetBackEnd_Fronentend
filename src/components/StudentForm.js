// src/components/StudentForm.js
import React, { useState, useEffect } from "react";
import axios from "axios";

const StudentForm = ({ fetchStudents, editingStudent, setEditingStudent }) => {
  const [student, setStudent] = useState({
    name: "",
    dob: "",
    email: "",
    country: ""
  });

  useEffect(() => {
    if (editingStudent) {
      setStudent(editingStudent);
    }
  }, [editingStudent]);

  const handleChange = (e) => {
    setStudent({ ...student, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editingStudent) {
      await axios.put(`/api/students/${editingStudent.id}`, student);
      setEditingStudent(null);
    } else {
      await axios.post("/api/students", student);
    }
    setStudent({ name: "", dob: "", email: "", country: "" });
    fetchStudents();
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="name" placeholder="Name" value={student.name} onChange={handleChange} required />
      <input type="date" name="dob" value={student.dob} onChange={handleChange} required />
      <input type="email" name="email" placeholder="Email" value={student.email} onChange={handleChange} required />
      <input type="text" name="country" placeholder="Country" value={student.country} onChange={handleChange} required />
      <button type="submit">{editingStudent ? "Update" : "Add"} Student</button>
    </form>
  );
};

export default StudentForm;
