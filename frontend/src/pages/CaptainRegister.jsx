import React, { useContext } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import {CaptainDataContext} from '../contexts/CaptainContext.jsx'
import axios from 'axios'

const CaptainRegister = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting }
  } = useForm()

  const [captainData, setCaptainData, isLoading, setIsLoading,error, setError] = useContext(CaptainDataContext); 
  const navigate = useNavigate()

  const registerHandler = async(registerData) => {
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/captain/register`, registerData);
      const data = response.data;
      if (response.status === 200) {
        setCaptainData(data.message); // Update the context with user data 
        localStorage.removeItem('token');
        localStorage.setItem('token', data.token)
        navigate('/captain-home'); // Navigate to the home page
      }
    } catch (error) {
      console.error('Registration failed:', error);
    }
    reset();
  }

  return (
    <>
      <div className='flex flex-col items-center  w-full p-2 '>
        <form onSubmit={handleSubmit(registerHandler)} className="bg-white 2 py-5 px-4 rounded-lg flex flex-col gap-2 shadow-xl w-full max-w-lg">
        <img width={70} className='h-fit mt-5 ' src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" alt="UBER" />

          <h2 className="text-4xl font-bold mb-3">Captain</h2>

          {/* full name */}
          <div className='grid grid-cols-2 gap-x-3 relative'>
            <label htmlFor="name" className="block text-xl mb-1 col-span-2 font-semibold">Your Name</label>
            <input
              type="text"
              placeholder='First Name'
              className="my-1 p-2 border-2 border-[#dcdcdc] focus:border-amber-400 focus:outline-none text-lg bg-[#dcdcdc] rounded mb-2"
              {...register("fullName.firstName", {
                required: { value: true, message: "First name is required" },
                minLength: { value: 3, message: "Minimum 3 characters" },
                maxLength: { value: 10, message: "Maximum 10 characters" }
              })}
            />
            <input
              type="text"
              placeholder='Last Name'
              className="my-1 p-2 border-2 border-[#dcdcdc] focus:border-amber-400 focus:outline-none text-lg bg-[#dcdcdc] rounded mb-2"
              {...register("fullName.lastName", {
                required: false,
              })}
            />
            {errors.fullName?.firstName && <p className="text-red-500 text-sm mt-1 absolute -bottom-3 right-1">{errors.fullName.firstName.message}</p>}
          </div>

          {/* email */}
          <div className='relative'>
            <label htmlFor='email' className="block text-xl mb-1 font-semibold">Your Email</label>
            <input
              autoComplete='off'
              id='email'
              className="w-full my-1 p-2 border-2 border-[#dcdcdc] focus:border-amber-400 focus:outline-none text-lg bg-[#dcdcdc] rounded mb-2"
              placeholder="email@gmail.com"
              {...register("email", {
                required: { value: true, message: "Email is required" },
                pattern: { value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/, message: "Invalid email" }
              })}
            />
            {errors.email && <p className="text-red-500 text-sm mt-1 absolute -bottom-3 right-1">{errors.email.message}</p>}
          </div>

          {/* password */}
          <div className='relative'>
            <label htmlFor='password' className="block text-xl mb-1 font-semibold">Password</label>
            <input
              autoComplete='off'
              id='password'
              type="password"
              className="w-full p-2 my-1 border-2 border-[#dcdcdc] focus:border-amber-400 focus:outline-none text-lg bg-[#dcdcdc] rounded mb-2"
              placeholder="password"
              {...register("password", {
                required: { value: true, message: "Password is required" },
                minLength: { value: 5, message: "Minimum 5 characters" },
                maxLength: { value: 19, message: "Maximum 19 characters" }
              })}
            />
            {errors.password && <p className="text-red-500 text-sm mt-1 absolute -bottom-3 right-1">{errors.password.message}</p>}
          </div>

          {/* Vehicle details */}
          <h3 className="text-xl font-bold mt-4">Vehicle Details</h3>
          <div className="grid grid-cols-2 gap-4">
            {/* Vehicle Color */}
            <div className='relative'>
              <input
                type="text"
                id="vehicleColor"
                placeholder="Vehicle Color"
                className="w-full my-1 p-2 border-2 border-[#dcdcdc] focus:border-amber-400 focus:outline-none text-lg bg-[#dcdcdc] rounded mb-2"
                {...register("vehicle.color", {
                  required: { value: true, message: "Vehicle color is required" },
                  minLength: { value: 3, message: "Minimum 3 characters" }
                })}
              />
              {errors.vehicle?.color && <p className="text-red-500 text-sm mt-1 absolute -bottom-3 right-1">{errors.vehicle.color.message}</p>}
            </div>
            {/* Vehicle Plate */}
            <div className='relative'>
              <input
                type="text"
                id="vehiclePlate"
                placeholder="Vehicle Plate"
                className="w-full my-1 p-2 border-2 border-[#dcdcdc] focus:border-amber-400 focus:outline-none text-lg bg-[#dcdcdc] rounded mb-2"
                {...register("vehicle.plate", {
                  required: { value: true, message: "Vehicle plate is required" },
                  minLength: { value: 6, message: "Minimum 6 characters" }
                })}
              />
              {errors.vehicle?.plate && <p className="text-red-500 text-sm mt-1 absolute -bottom-3 right-1">{errors.vehicle.plate.message}</p>}
            </div>
            {/* Vehicle Type */}
            <div className='relative'>
              <select
                id='vehicleType'
                className="w-full my-1 p-2 border-2 border-[#dcdcdc] focus:border-amber-400 focus:outline-none text-lg bg-[#dcdcdc] rounded mb-2"
                {...register("vehicle.vehicleType", {
                  required: { value: true, message: "Vehicle type is required" }
                })}
              >
                <option value="" hidden >Vehicle Type</option>
                <option value="car">Car</option>
                <option value="motorcycle">Motorcycle</option>
                <option value="auto">Auto</option>
              </select>
              {errors.vehicle?.vehicleType && <p className="text-red-500 text-sm mt-1 absolute -bottom-3 right-1">{errors.vehicle.vehicleType.message}</p>}
            </div>
            {/* Vehicle Capacity */}
            <div className='relative'>
              <input
                type="number"
                id="vehicleCapacity"
                placeholder="Vehicle Capacity"
                className="w-full my-1 p-2 border-2 border-[#dcdcdc] focus:border-amber-400 focus:outline-none text-lg bg-[#dcdcdc] rounded mb-2"
                {...register("vehicle.capacity", {
                  required: { value: true, message: "Capacity is required" },
                  min: { value: 1, message: "Minimum capacity is 1" },
                  max: { value: 4, message: "Maximum capacity is 4" }
                })}
              />
              {errors.vehicle?.capacity && <p className="text-red-500 text-sm mt-1 absolute -bottom-3 right-1">{errors.vehicle.capacity.message}</p>}
            </div>
          </div>

          {/* button */}
          <button
            type='submit'
            className="w-full bg-black text-2xl font-semibold text-white p-2 rounded hover:bg-[#151515] focus:bg-blue-600 my-2"
          >
            Register
          </button>
          {isSubmitting && <div className='text-green-500 text-sm mt-1'>Loading...</div>}
        </form>

        {/* link to user register page */}
        <Link to={"/user-register"} className='max-w-lg w-full my-5 block text-center text-2xl font-bold hover:bg-[#e09305] bg-[#b33d12] text-white p-2 rounded focus:bg-gray-600'>
          Register as User
        </Link>
      </div>
    </>
  )
}

export default CaptainRegister
