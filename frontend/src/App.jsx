import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

import Home from './components/Home';
import Login from './components/Login';
import Signup from './components/Signup';
import Courses from './admin/Courses';

import Buy from './components/Buy';
import Purchases from './components/Purchases';
import AdminSignup from "./admin/AdminSignup";
import AdminLogin from "./admin/AdminLogin";
import Dashboard from "./admin/Dashboard";
import CourseCreate from "./admin/CourseCreate";
import UpdateCourse from "./admin/UpdateCourse";
import OurCourses from "./admin/OurCourses";
import { Navigate } from 'react-router-dom';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_KEY);

function App() {
  const user = JSON.parse(localStorage.getItem("user"));
  const admin = JSON.parse(localStorage.getItem("admin"));
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/courses" element={<Courses />} />
        
        {/* Wrap Buy component with <Elements> */}
        <Route
          path="/buy/:courseId"
          element={
            <Elements stripe={stripePromise}>
              <Buy />
            </Elements>
          }
        />
        
        <Route path="/purchases" element={user ?<Purchases />:<Navigate to={"/login"}/>} />
        {/* Admin Routes*/}
        <Route path="/admin/signup" element={<AdminSignup />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={admin ?<Dashboard /> : <Navigate to={"/admin/login"} />}/>
        <Route path="/admin/create-course" element={<CourseCreate/>} />
        <Route path="/admin/update-course/:id" element={<UpdateCourse />} />

        <Route path="/admin/our-courses" element={<OurCourses />} />
      </Routes>
      <Toaster />
    </div>
  );
}

export default App;
