import React, { useContext } from 'react'
import { data, Link , useNavigate} from 'react-router-dom';
import { useForm } from 'react-hook-form'
import axios from 'axios'
import { UserDataContext } from '../contexts/UserContext';

const UserRegister = () => {
  const {
    register, // Registers input fields
    handleSubmit, // Handles form submission
    reset,
    formState: { errors, isSubmitting }, // Access form errors
  } = useForm();
  
  const navigate = useNavigate()
  const [userData, setUserData] = useContext(UserDataContext); 
  
  const registerHandler = async(registerData) => {
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/user/register`, registerData);
      const data = response.data;
      if (response.status === 200) {
        console.log(data);
        setUserData(data); // Update the context with user data
        localStorage.removeItem('token'); 
        localStorage.setItem('token', data.token)
        navigate('/home'); // Navigate to the home page
      }
    } catch (error) {
      console.error('Registration failed:', error);
    }
    reset();
  }


  return (
    <>
      <div className='flex  flex-col items-center h-screen pt-2 w-full px-2 overflow-y-hidden ' >
        <form onSubmit={handleSubmit(registerHandler)} className="bg-white py-5 mt-3  px-4 rounded-lg flex flex-col gap-4 shadow-xl w-full max-w-lg">
          <img width={200}  className='h-fit my-3 text-4xl font-extrabold' src="/logo.png"  alt="RideEase" />

          {/* name  */}
          <div className=' grid grid-cols-2 gap-x-3 relative '>
            <label htmlFor="name" className="block text-xl mb-1 col-span-2 font-semibold">What's your Name</label>
            <input
              type="text"
              id='name'
              placeholder='First Name'
              className=" my-1 p-2 border-2 placeholder:text-sm border-[#dcdcdc] focus:border-amber-400 focus:outline-none text-lg bg-[#dcdcdc] rounded mb-2"

              {...register("fullName.firstName", {
                required: { value: true, message: "first name is required" },
                minLength: { value: 3, message: "first name must be greater than 2" },
                maxLength: { value: 10, message: "first name must be smaller than 11" },
              })}
            />
            <input
              type="text"
              placeholder='Last Name (Optional)'
              className="my-1 p-2 placeholder:text-sm border-2 border-[#dcdcdc] focus:border-amber-400 focus:outline-none text-lg bg-[#dcdcdc] rounded mb-2"

              {...register("fullName.lastName", {
                required: false,
              })}
            />
            {errors.fullName?.firstName && <p className="text-red-500 text-sm mt-1 absolute -bottom-3 right-1">{errors.fullName.firstName.message}</p>}
          </div>

          {/* email  */}
          <div className='relative'>
            <label htmlFor='email' className="block text-xl mb-1  font-semibold">What's Your Email</label>
            <input
              autoComplete='off'
              id='email'
              required
              className="w-full my-1 p-2 border-2 border-[#dcdcdc] focus:border-amber-400 focus:outline-none text-lg bg-[#dcdcdc] rounded mb-2"
              placeholder="email@gmail.com"

              {...register("email", {
                required: { value: true, message: "Email is required" },
                pattern: { value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/, message: "Invalid email" }
              })}
            />
            {errors.email && <p className="text-red-500 text-sm mt-1 absolute -bottom-3  right-1">{errors.email.message}</p>}

          </div>

          {/* password */}
          <div className='relative'>
            <label htmlFor='password' className="block mb-1 text-xl font-semibold">Password</label>
            <input
              autoComplete='off'
              id='password'
              type="password"
              className="w-full p-2 my-1 border-2 border-[#dcdcdc] focus:border-amber-400 focus:outline-none text-lg bg-[#dcdcdc] rounded mb-2"
              placeholder="password"
              {...register("password", {
                required: { value: true, message: "password is required" },
                minLength: { value: 5, message: "password must be greater than 4" },
                maxLength: { value: 19, message: "password must be smaller than 20" },
              })}
            />
            {errors.password && <p className="text-red-500 text-sm mt-1 absolute -bottom-3 right-1">{errors.password.message}</p>}

          </div>

          {/* button  */}
          <button
            type='submit'
            className="w-full bg-black text-2xl font-semibold  text-white p-2 rounded hover:bg-[#151515] focus:bg-blue-600 my-2"
          >
            Register
          </button>
          {isSubmitting && <div className='text-green-500 text-sm mt-1 '>Loading...</div>}

        </form>

       {/* link t the captain page  */}
        <Link to={"/captain-login"} className='max-w-lg w-full mt-10 block text-center text-2xl font-bold hover:bg-[#0a950a]  bg-[#12b312] text-white p-2 rounded focus:bg-gray-600'> Log In as Captain</Link>

        <p className='text-[14px] max-w-lg w-full px-1 py-3 mt-auto leading-4.5 text-gray-500'>By proceeding, you consent to get calls,
          WhatsApp or SMS messages, including by
          automated means, from Uber and its
          affiliates to the number provided.</p>

      </div>
    </>
  )
}

export default UserRegister
