import React from 'react'
import { Link } from 'react-router-dom'
import { FaArrowRight } from "react-icons/fa";


const StartPage = () => {
  return (
    <>
      <div className='flex flex-col bg-cover bg-center bg-[url(https://images.unsplash.com/photo-1567536303373-0eb3957ba696?q=80&w=1976&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)] h-screen justify-between '>
        <img width={120} className='h-fit m-5 ' src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" alt="UBER" />
        <div className='bg-white pb-6 px-4 '>
            <h1 className='text-4xl font-semibold py-6 '>Get Started with Uber</h1>
            <Link to={"/user-login"} className='text-3xl mb-2 py-2 relative text-center block bg-black text-white rounded'>Continue <FaArrowRight className='absolute top-3 right-4' />
            </Link>
        </div> 
      </div>
    </>
  )
}

export default StartPage
