import React, { useState } from "react";
import axios from "axios";
import './AdminLogin.css'
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { Schema } from "yup";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

   const { formState: { errors } } = useForm({ resolver: yupResolver(Schema) });
  

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/login/admin", { email, password });
      setMessage(res.data.message);
    } catch (error) {
      setMessage(error.response.data.message);
    }
  };

  return (
    <div className="form-container">
      <h2>Admin Login</h2>
      <form onSubmit={handleLogin}>
        <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
        <p className="error">{errors.email?.message}</p>

        <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
        <p className="error">{errors.password?.message}</p>

        <button type="submit" className="submit-btn">Login</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default AdminLogin;
