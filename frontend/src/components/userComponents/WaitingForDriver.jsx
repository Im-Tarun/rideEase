import React from 'react'
import { FaSquare } from "react-icons/fa";
import { FaMoneyCheck } from "react-icons/fa";
import { MdLocationOn } from "react-icons/md";

const WaitingForDriver = () => {
    return (
        <div className='bg-white'>
            <div className='text-3xl text-white px-6 py-4 font-bold bg-[#12b312]'>
                <h1 className=' text-center  '>Ride Confirmed! </h1>
                <h1 className='text-center  '>OTP - 7876 </h1>
            </div>
            <div className='flex p-6 items-center justify-between '>
                <img className='w-22  rounded-full' src="/myImage.jpg" alt="caar" />
                <div className=' text-right'>
                    <h2 className='text-2xl font-semibold'>Tarun Yadav</h2>
                    <h1 className=' capitalize font-bold text-3xl'>UP32 XY 3534 </h1>
                    <p>Swift desire</p>
                </div>

            </div>
            {/* vehicle boxes */}
            <div className='flex flex-col '>
                {/* drivers location */}
                <div className=' flex  '>
                    <span className='my-auto text-2xl px-4'><MdLocationOn /></span>
                    <div className='border-t-2 p-4 border-gray-400 grow'>
                        <h1 className='text-2xl font-semibold'>512/11-A </h1>
                        <p className='text-lg text-gray-600'>Kempegowda International Airport</p>
                    </div>
                </div>
                {/* location box  */}
                <div className=' flex  '>
                    <span className='my-auto px-4'><FaSquare /></span>
                    <div className='border-t-2 p-4 border-gray-400 grow'>
                        <h1 className='text-2xl font-semibold'>Third coffee wave </h1>
                        <p className='text-lg   text-gray-600'>Kempegowda International Airport pata nahi kaha kaha bhejte hai</p>
                    </div>
                </div>
                {/* price box  */}
                <div className=' flex  '>
                    <span className='my-auto px-4'><FaMoneyCheck /></span>
                    <div className='border-t-2 p-4 border-gray-400 grow'>
                        <h1 className='text-2xl font-semibold'>₹232.33 </h1>
                        <p className='text-lg   text-gray-600'>Mode - cash</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default WaitingForDriver

