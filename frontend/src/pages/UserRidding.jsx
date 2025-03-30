import React, { useContext, useEffect } from 'react'
import { FaMoneyCheck, FaSquare } from 'react-icons/fa6'
import { MdLocationOn } from 'react-icons/md'
import { useLocation, useNavigate } from 'react-router-dom'
import { SocketContext } from '../contexts/SocketContext'

const UserRidding = () => {
    const location = useLocation()
    const rideData = location.state?.rideData;
    const { socket } = useContext(SocketContext)
    const navigate = useNavigate()

   useEffect(() => {
    socket?.on("ride-completed", (data)=>{ 
        console.log(data)
        navigate("/home")
      })

   }, [socket])
   

    return (
        <div className='flex overflow-hidden relative flex-col bg-cover bg-center bg-[url(https://s.wsj.net/public/resources/images/BN-XR452_201802_M_20180228165525.gif)] h-screen justify-between '>
            <div className=' absolute bottom-0 w-full bg-white'>
                <div className='flex p-6 items-center justify-between '>
                    <img className='w-22  rounded-full' src="/myImage.jpg" alt="caar" />
                    <div className=' text-right'>
                        <h2 className='text-2xl font-semibold capitalize'>{rideData?.captain.fullName.firstName + " " + rideData?.captain.fullName.lastName}</h2>
                        <h1 className='  font-bold text-3xl uppercase'>{rideData?.captain.vehicle.plate} </h1>
                        <p className=' capitalize'>{rideData?.captain.vehicle.vehicleType + " " + rideData?.captain.vehicle.color}</p>
                        <p className='text-gray-700'>Capacity: {rideData?.captain.vehicle.capacity}</p>
                    </div>

                </div>
                {/* vehicle boxes */}
                <div className='flex flex-col '>
                    {/* pickup location*/}
                    <div className=' flex  '>
                        <span className='my-auto text-2xl px-4'><MdLocationOn /></span>
                        <div className='border-t-2 p-4 border-gray-400 grow'>
                            <h1 className='text-2xl font-semibold capitalize'>{rideData?.pickUp}</h1>
                            <p className='text-lg   text-gray-600'>Pick-up</p>
                        </div>
                    </div>
                    {/* destination  */}
                    <div className=' flex  '>
                        <span className='my-auto px-5'><FaSquare /></span>
                        <div className='border-t-2 p-4 border-gray-400 grow'>
                            <h1 className='text-2xl font-semibold capitalize'>{rideData?.destination}</h1>
                            <p className='text-lg   text-gray-600'>Destination</p>
                        </div>
                    </div>
                    {/* price box  */}
                    <div className=' flex  '>
                        <span className='my-auto px-5'><FaMoneyCheck /></span>
                        <div className='border-t-2 p-4 border-gray-400 grow'>
                            <h1 className='text-2xl font-semibold'>₹{rideData?.fare}  </h1>
                            <p className='text-lg   text-gray-600'>Mode - cash</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserRidding
