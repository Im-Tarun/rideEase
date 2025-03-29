import React from 'react'
import { FaSquare } from "react-icons/fa";
import { FaMoneyCheck } from "react-icons/fa";
import { MdLocationOn } from "react-icons/md";

const WaitingForDriver = (params) => {
    return (
        <div className='bg-white'>
            <div className='text-3xl text-white px-6 py-4 font-bold bg-[#12b312]'>
                <h1 className=' text-center  '>Ride Confirmed! </h1>
                <h1 className='text-center  '>OTP - 7876</h1>
            </div>
            <div className='flex p-6 items-center justify-between '>
                <img className='w-22  rounded-full' src="/myImage.jpg" alt="caar" />
                <div className=' text-right'>
                    <h2 className='text-2xl font-semibold capitalize'>{params.pickUpCaptain?.fullName.firstName + " " + params.pickUpCaptain?.fullName.lastName}</h2>
                    <h1 className='  font-bold text-3xl uppercase'>{params.pickUpCaptain?.vehicle.plate} </h1>
                    <p className=' capitalize'>{params.pickUpCaptain?.vehicle.vehicleType + " " + params.pickUpCaptain?.vehicle.color}</p>
                    <p className='text-gray-700'>Capacity: {params.pickUpCaptain?.vehicle.capacity}</p>
                </div>

            </div>
            {/* vehicle boxes */}
            <div className='flex flex-col '>
                {/* pickup location*/}
                <div className=' flex  '>
                    <span className='my-auto text-2xl px-4'><MdLocationOn /></span>
                    <div className='border-t-2 p-4 border-gray-400 grow'>
                        <h1 className='text-2xl font-semibold capitalize'>{params.pickUp}</h1>
                        <p className='text-lg   text-gray-600'>Pick-up</p>
                    </div>
                </div>
                {/* destination  */}
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
                        <h1 className='text-2xl font-semibold'>₹{params.fare?.cost[params.vehicle]}  </h1>
                        <p className='text-lg   text-gray-600'>Mode - cash</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default WaitingForDriver

