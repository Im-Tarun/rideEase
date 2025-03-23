import React from 'react'
import { FaRegClock } from "react-icons/fa";
import { SiSpeedtest } from "react-icons/si";
import { CgNotes } from "react-icons/cg";

const CaptainDetails = () => {
    return (
        <div>
            <div className='flex justify-between my-3 py-4 border-b-1 border-gray-500 items-center' >
                <div className='flex gap-2 items-center'>
                    <img className=' rounded-full h-18 w-18 object-cover object-center ' src="/myImage.jpg" alt="sdfs" />
                    <div>
                        <h2 className='text-2xl font-semibold'> Tarun yadav</h2>
                        <p className='text-gray-600 text-lg'>Basic</p>
                    </div>
                </div>
                <div className='px-2 items-end flex flex-col'>
                    <h2 className='text-2xl font-semibold'>Rs. 223</h2>
                    <p className='text-gray-600 text-lg'>Total Earned</p>
                </div>
            </div>

            <div className='bg-[#ffcf10] my-6 rounded-lg flex items-center justify-evenly py-6 '>
                <div className='flex flex-col items-center'>
                    <span className='text-2xl  font-light pb-1 '><FaRegClock /></span>
                    <h4 className='text-xl py-1 font-semibold'>10.2</h4>
                    <p className='text-gray-700 uppercase'>Hours online</p>
                </div>
                <div className='flex flex-col items-center'>
                    <span className='text-2xl  font-light pb-1 '><SiSpeedtest /></span>
                    <h4 className='text-xl py-1 font-semibold'>30Km</h4>
                    <p className='text-gray-700  uppercase'>total distance</p>
                </div>
                <div className='flex flex-col items-center'>
                    <span className='text-2xl font-light  pb-1'><CgNotes /></span>
                    <h4 className='text-xl py-1 font-semibold'>20</h4>
                    <p className='text-gray-700 uppercase'>Total job</p>
                </div>
            </div>
        </div>
    )
}

export default CaptainDetails
