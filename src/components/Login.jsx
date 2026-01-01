import React from 'react'
import { useState } from 'react'
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';
import { useNavigate } from 'react-router-dom';
import { API_BASE_URL } from '../utils/constants';

const Login = () => {
    const [emailId, setEmailId] = useState("fatima@gmail.com");
    const [password, setPassword] = useState("Pass4@word");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogin = async() => { 
        try {
          axios.post(API_BASE_URL + "/login", {
            emailId: emailId,
            password: password
          },
          { withCredentials: true }
        ).then((response) => {
            dispatch(addUser(response.data));
            return navigate("/");
        }).catch((error) => { 
            console.error("Login failed", error);
        });
        } catch (error) {
          console.error("An error occurred during login", error);
        }
        
        
    }

  return (
    <div className="flex justify-center items-center my-40 bg-base-100">
  <div className="card bg-base-200 w-96 shadow-2xl border border-base-300">
    <div className="card-body gap-4">
      {/* Header */}
      <div className="text-center mb-2">
        <h2 className="card-title justify-center text-2xl font-bold text-base-content">Welcome Back</h2>
        <p className="text-sm text-base-content/60">Please enter your details</p>
      </div>

      {/* Email Field */}
      <fieldset className="fieldset">
        <legend className="fieldset-legend font-semibold">Email</legend>
        <input 
            type="email" 
            className="input input-bordered w-full" 
            placeholder={emailId}
            value={emailId}
            onChange={(e) => setEmailId(e.target.value)}
        />
      </fieldset>

      {/* Password Field */}
      <fieldset className="fieldset">
        <legend className="fieldset-legend font-semibold">Password</legend>
        <input 
            type="password" 
            className="input input-bordered w-full" 
            placeholder={password}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
        />
        <label className="label mt-1">
          <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
        </label>
      </fieldset>

      {/* Action Button */}
      <div className="card-actions mt-4">
        <button className="btn btn-primary btn-block" onClick={handleLogin}>Login</button>
      </div>

      {/* Footer */}
      <p className="text-center text-xs mt-2 text-base-content/50">
        Don't have an account? <a className="link link-primary font-semibold">Sign Up</a>
      </p>
    </div>
  </div>
</div>
  )
}

export default Login