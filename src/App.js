import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaInstagram, FaThreads, FaGoogle, FaYoutube, FaTiktok } from "react-icons/fa6";
import "./App.css";

function App() {
  const [students, setStudents] = useState([]);
  const [form, setForm] = useState({ id: "", name: "", dob: "", email: "", country: "" });
  const [editId, setEditId] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [searchId, setSearchId] = useState("");
  const [searchEmail, setSearchEmail] = useState("");

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    const res = await axios.get("/api/students");
    setStudents(res.data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (editId) {
      await axios.put(`/api/students/${editId}`, form);
      setSuccessMessage("Student updated successfully!");
      setEditId(null);
    } else {
      try {
        await axios.post("/api/students", form);
        setSuccessMessage("Student registered successfully!");
      } catch (err) {
        setSuccessMessage("Failed to register! Maybe duplicate email?");
      }
    }

    setForm({ id: "", name: "", dob: "", email: "", country: "" });
    fetchStudents();
    setTimeout(() => setSuccessMessage(""), 3000);
  };

  const handleEdit = (student) => {
    setForm(student);
    setEditId(student.id);
  };

  const handleDelete = async (id) => {
    await axios.delete(`/api/students/${id}`);
    fetchStudents();
    setSuccessMessage("Student deleted successfully!");
    setTimeout(() => setSuccessMessage(""), 3000);
  };

  const handleSearch = () => {
    const matched = students.find(
      (s) => s.id.toString() === searchId.trim() && s.email === searchEmail.trim()
    );
    if (matched) {
      setForm(matched);
      setEditId(matched.id);
      setSuccessMessage("Student found!");
    } else {
      setSuccessMessage("No match found!");
    }
    setTimeout(() => setSuccessMessage(""), 3000);
  };

  const handleReset = () => {
    setSearchId("");
    setSearchEmail("");
    setForm({ id: "", name: "", dob: "", email: "", country: "" });
    setEditId(null);
    setSuccessMessage("Form reset successfully!");
    setTimeout(() => setSuccessMessage(""), 3000);
  };

  return (
    <div className="container">
      <h1 className="title">🎓 Student Management</h1>

      {successMessage && <div className="toast">{successMessage}</div>}

      <form onSubmit={handleSubmit} className="form">
        <input className="input" placeholder="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
        <input className="input" type="date" value={form.dob} onChange={(e) => setForm({ ...form, dob: e.target.value })} required />
        <input className="input" placeholder="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />
        <input className="input" placeholder="Country" value={form.country} onChange={(e) => setForm({ ...form, country: e.target.value })} required />

        <div className="button-group">
          <button className="button">{editId ? "Update" : "Add Student"}</button>
          <input className="search-input" placeholder="Search ID" value={searchId} onChange={(e) => setSearchId(e.target.value)} />
          <input className="search-input" placeholder="Search Email" value={searchEmail} onChange={(e) => setSearchEmail(e.target.value)} />
          <button type="button" className="search-btn" onClick={handleSearch}>Search</button>
          <button type="button" className="reset-btn" onClick={handleReset}>Reset</button>
        </div>
      </form>

      <div className="social-icons">
        <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer"><FaInstagram /></a>
        <a href="https://www.threads.net" target="_blank" rel="noopener noreferrer"><FaThreads /></a>
        <a href="https://www.google.com" target="_blank" rel="noopener noreferrer"><FaGoogle /></a>
        <a href="https://www.youtube.com" target="_blank" rel="noopener noreferrer"><FaYoutube /></a>
        <a href="https://www.tiktok.com" target="_blank" rel="noopener noreferrer"><FaTiktok /></a>
      </div>

      <h2 className="subTitle">📋 Student List</h2>
      <table className="student-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>DOB</th>
            <th>Country</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {students.map((s) => (
            <tr key={s.id}>
              <td>{s.id}</td>
              <td>{s.name}</td>
              <td>{s.email}</td>
              <td>{s.dob}</td>
              <td>{s.country}</td>
              <td><button className="editBtn" onClick={() => handleEdit(s)}>Edit</button></td>
              <td><button className="deleteBtn" onClick={() => handleDelete(s.id)}>Delete</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
