import React from 'react'
import { FaSquare } from "react-icons/fa";
import { FaMoneyCheck } from "react-icons/fa";
import { MdLocationOn } from "react-icons/md"; 

const WaitingForDriver = () => {
    return (
        <div className='bg-white'>
            <div className='flex p-6 items-center justify-between '>
            <img className='w-30' src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1712027307/assets/42/eb85c3-e2dc-4e95-a70d-22ee4f08015f/original/Screenshot-2024-04-01-at-9.08.07p.m..png" alt="caar" />
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

