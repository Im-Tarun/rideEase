import React from 'react'
import { FaSquare } from "react-icons/fa";
import { FaMoneyCheck } from "react-icons/fa";
import { MdLocationOn } from "react-icons/md";

const FindingDriver = (params) => {
    const motorcycle = "https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1649231091/assets/2c/7fa194-c954-49b2-9c6d-a3b8601370f5/original/Uber_Moto_Orange_312x208_pixels_Mobile.png"
    const auto = "https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1649231091/assets/2c/7fa194-c954-49b2-9c6d-a3b8601370f5/original/Uber_Moto_Orange_312x208_pixels_Mobile.png"
    const car = "https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1649231091/assets/2c/7fa194-c954-49b2-9c6d-a3b8601370f5/original/Uber_Moto_Orange_312x208_pixels_Mobile.png"
    
    return (

        <div className='bg-white '>
            <h2 className='text-3xl font-semibold px-4 py-5'>Lookin For A Driver</h2>
            {/* vehicle boxes */}
            <div className='flex flex-col '>
                {/* vehicle image box */}
                <div className='flex justify-center border-t-2 pt-2 border-gray-400'>
                    <img className='w-52' src={{motorcycle, auto , car}[params.vehicle]} alt="caar" />
                </div>
                {/* drivers location */}
                <div className=' flex  '>
                    <span className='my-auto text-2xl px-4'><MdLocationOn /></span>
                    <div className='border-t-2 p-4 border-gray-400 grow'>
                        <h1 className='text-2xl font-semibold capitalize'>{params.pickUp}</h1>
                        <p className='text-lg   text-gray-600'>Pick-up</p>
                    </div>
                </div>
                {/* location box  */}
                <div className=' flex  '>
                    <span className='my-auto px-5'><FaSquare /></span>
                    <div className='border-t-2 p-4 border-gray-400 grow'>
                        <h1 className='text-2xl font-semibold capitalize'>{params.destination}</h1>
                        <p className='text-lg   text-gray-600'>Destination</p>
                    </div>
                </div>
                {/* price box  */}
                <div className=' flex  '>
                    <span className='my-auto px-5'><FaMoneyCheck /></span>
                    <div className='border-t-2 p-4 border-gray-400 grow'>
                        <h1 className='text-2xl font-semibold'>₹{params.fare && params.fare.cost.motorcycle}  </h1>
                        <p className='text-lg   text-gray-600'>Mode - cash</p>
                    </div>
                </div>
                <button onClick={() => {
                    params.setShowFDrPnl(false)
                }} className='items-center justify-center m-2 p-2 rounded-lg text-2xl  bg-gray-500 font-bold text-white flex border-2 '>
                    Cancel
                </button>
            </div>
        </div>

    )
}

export default FindingDriver
