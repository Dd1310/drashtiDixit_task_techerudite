import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CustomerRegistration from './Componenets/Customer/CustomerRegistration';
import AdminRegistration from './Componenets/Admin/AdminRegistration';
import AdminLogin from './Componenets/AdminLogin';

const root = ReactDOM.createRoot (document.getElementById("root"));
root.render(
  <Router>
    <Routes>
      <Route path="/customerRegister" element = {<CustomerRegistration />} />
      <Route path="/adminRegister" element = {<AdminRegistration />} />
      <Route path="/admin-login" element = {<AdminLogin />} />
    </Routes>
  </Router>,
 
);

