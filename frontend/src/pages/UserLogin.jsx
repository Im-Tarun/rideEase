import React, { useContext } from 'react'
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserDataContext } from '../contexts/UserContext.jsx';
import axios from 'axios';
import { Flip, toast, ToastContainer } from 'react-toastify'; 

const UserLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate()
  const [userData, setUserData] = useContext(UserDataContext);

  const handleLogin = async (e) => {
    e.preventDefault();
    const loginData = {
      email: email,
      password: password,
    }

    try {
      const response = await axios.post(`/api/user/login`, loginData);
      const data = response.data;
      if (response.status === 200) {
        setUserData(data); // Update the context with user data 
        localStorage.removeItem('token');
        localStorage.setItem('token', data.token)
        navigate('/home'); // Navigate to the home page
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Registration failed. Please try again.")
      console.error('Registration failed:', error.response);
    }
    setEmail('')
    setPassword('')
  }


  return (
    <div className="flex justify-center flex-col items-center h-screen w-full px-5">
      <form onSubmit={handleLogin} className="bg-white p-6 rounded-lg flex flex-col gap-5 shadow-xl w-full max-w-lg">
        <img width={200} className='h-fit my-3 text-4xl font-extrabold' src="/logo.png" alt="RideEase" />

        <div>
          <label htmlFor='email' className="block text-xl font-semibold">What's Your Email</label>
          <input
            autoComplete='off'
            type="email"
            id='email'
            required
            className="w-full my-1 p-2 border-2  border-[#dcdcdc] focus:border-amber-400 focus:outline-none text-lg bg-[#dcdcdc] rounded mb-2"
            placeholder="email@gmail.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor='password' className="block text-xl font-semibold">Password</label>
          <input
            autoComplete='off'
            id='password'
            type="password"
            required
            className="w-full p-2   my-1 border-2 border-[#dcdcdc] focus:border-amber-400 focus:outline-none text-lg bg-[#dcdcdc] rounded mb-2"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div>
          <button
            type='submit'
            className="w-full bg-black text-2xl font-bold text-white p-2 rounded hover:bg-blue-600 mb-2"
          >
            Login
          </button>

          <div className='bg-white'>
            <span>New here ? </span>
            <Link
              to="/user-register"
              className="text-blue-700 hover:text-fuchsia-700"
            >
              Create New Account
            </Link>
          </div>
        </div>
      </form>
      <Link to={"/captain-login"} className='max-w-lg w-full mt-10 block text-center text-2xl font-bold bg-[#12b312] text-white p-2 rounded hover:bg-gray-600'> Sign In as Captain</Link>
      <ToastContainer
        position="bottom-center"
        autoClose={2500}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable={false}
        pauseOnHover
        theme="light"
        transition={Flip}
      />
    </div>

  )
}

export default UserLogin