import React from 'react'
import { FaSquare } from "react-icons/fa";
import { FaMoneyCheck } from "react-icons/fa";
import { MdLocationOn } from "react-icons/md";
import OtpInput from './OtpInput';
import { Link } from 'react-router-dom';

const ConfirmRidePnl = (params) => {
    return (
        <div className=''>
            <div className='bg-[#F1F2F6] flex flex-col h-screen'>
                <h2 className='text-3xl font-semibold bg-[#FF8900] px-4 py-4'> Confirm Ride!</h2>

                <div className='flex justify-between  p-4 items-center' >
                    <div className='flex gap-2 items-center'>
                        <img className=' rounded-full h-18 w-18 object-cover object-center ' src="https://photosbook.in/wp-content/uploads/real-girl-pic54.jpg " alt="sdfs" />
                        <div>
                            <h2 className='text-2xl font-semibold'> Jiya pandey</h2>
                            <p className='text-gray-600 text-lg'>Immidiate</p>
                        </div>
                    </div>
                    <div className='px-2 items-end flex flex-col'>
                        <h2 className='text-2xl font-semibold'>5 km</h2>
                        <p className='text-gray-600 text-lg'>away</p>
                    </div>
                </div>
                {/* drivers location */}
                <div className=' flex '>
                    <span className='my-auto text-2xl px-4'><MdLocationOn /></span>
                    <div className='border-t-2 p-4 border-gray-400 grow'>
                        <h1 className='text-2xl font-semibold'>512/11-A </h1>
                        <p className='text-lg   text-gray-600'>Kempegowda International Airport</p>
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

                {/* otp box */}
                <div className='my-2 border-t-2 border-gray-500 px-4'>
                    <h1 className='text-3xl py-4 font-semibold text-center'>Enter OTP</h1>
                    <OtpInput/>
                </div>
                {/* buttons  */}
                <div  className='items-center justify-start gap-4 px-4 flex my-6 flex-row-reverse '>
                    <Link to={'/captain-riding'} className='py-2 text-center rounded-lg grow text-2xl bg-[#12b312] font-bold text-[#F1F2F6] '>
                        Start
                    </Link>
                    <button onClick={() => params.setShowCnfRidePnl(false)} className='py-2 px-4  rounded-lg text-2xl  bg-[#242A37] font-bold text-white  '>
                        Cancel
                    </button>
                </div>



            </div>
        </div>
    )
}

export default ConfirmRidePnl
