import React,{useContext} from 'react'
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { CaptainDataContext } from '../contexts/CaptainContext';

const CaptainLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate()
  const [ captainData, setCaptainData] = useContext(CaptainDataContext); 

  const handleLogin = async(e) => {
    e.preventDefault();
    const loginData = {
      email : email,
      password : password,
    }
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/captain/login`, loginData);
      const data = response.data;
      if (response.status === 200) {
        setCaptainData(data); // Update the context with user data
        localStorage.removeItem('token'); 
        localStorage.setItem('token', data.token)
        navigate('/captain-home'); // Navigate to the home page
      }
    } catch (error) {
      console.error('Registration failed:', error);
    }
    setEmail('')
    setPassword('')
  }

  return (
    <div className="flex justify-center flex-col items-center h-screen w-full px-5">
      <form onSubmit={handleLogin} className="bg-white p-6 rounded-lg flex flex-col gap-5 shadow-xl w-full max-w-lg">
      <img width={200}  className='h-fit my-3 text-4xl font-extrabold' src="/logo.png"  alt="RideEase" />
        <h2 className="text-3xl font-bold mb-3">Captain</h2>

        <div>
          <label htmlFor='email' className="block text-xl font-semibold">What's Your Email</label>
          <input
            autoComplete='off'
            type="email"
            id='email'
            required
            className="w-full my-1 p-2 border-2 border-[#dcdcdc] focus:border-amber-400 focus:outline-none text-lg bg-[#dcdcdc] rounded mb-2"
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
            className="w-full p-2 my-1 border-2 border-[#dcdcdc] focus:border-amber-400 focus:outline-none text-lg bg-[#dcdcdc] rounded mb-2"
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
              to="/captain-register"
              className="text-blue-700 hover:text-fuchsia-700"
            >
              Create Account as Captain
            </Link>
          </div>
        </div>
      </form>
      <Link to={"/user-login"} className='max-w-lg w-full mt-10 block text-center text-2xl font-bold bg-[#b33d12] text-white p-2 rounded hover:bg-gray-600'> Sign In as User</Link>
    </div>
  )
}


export default CaptainLogin
