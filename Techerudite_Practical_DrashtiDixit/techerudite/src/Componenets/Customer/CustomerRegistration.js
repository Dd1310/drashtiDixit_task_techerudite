import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import './CustomerRegistration.css'

const schema = yup.object().shape({
  first_name: yup.string().required("First Name is required"),
  last_name: yup.string().required("Last Name is required"),
  email: yup.string().email("Invalid Email").required("Email is required"),
  password: yup.string()
    .min(6, "Password must be at least 6 characters")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
    .matches(/[0-9]/, "Password must contain at least one number")
    .required("Password is required"),
});

export default function CustomerRegister() {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = async (data) => {
    data.role = "customer";
    try {
      const res = await axios.post("http://localhost:5000/api/Customregister", data);
      alert(res.data.message);
      navigate("/admin-login");
    } catch (error) {
      alert(error.response?.data?.message || "Something went wrong.");
    }
  };

  return (
    <div className="form-container">
      <h2>Customer Registration</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input {...register("first_name")} placeholder="First Name" />
        <p className="error">{errors.first_name?.message}</p>

        <input {...register("last_name")} placeholder="Last Name" />
        <p className="error">{errors.last_name?.message}</p>

        <input type="email" {...register("email")} placeholder="Email" />
        <p className="error">{errors.email?.message}</p>

        <input type="password" {...register("password")} placeholder="Password" />
        <p className="error">{errors.password?.message}</p>

        <button type="submit" className="submit-btn">Register as Customer</button>
      </form>
    </div>
  );
}
