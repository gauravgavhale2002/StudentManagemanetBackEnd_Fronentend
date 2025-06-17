// src/components/StudentList.js
import React from "react";
import axios from "axios";

const StudentList = ({ students, fetchStudents, setEditingStudent }) => {
  const handleDelete = async (id) => {
    await axios.delete(`/api/students/${id}`);
    fetchStudents();
  };

  return (
    <div>
      <h2>Student List</h2>
      <ul>
        {students.map((student) => (
          <li key={student.id}>
            {student.name} | {student.email} | {student.dob} | {student.country}
            <button onClick={() => setEditingStudent(student)}>Edit</button>
            <button onClick={() => handleDelete(student.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default StudentList;
