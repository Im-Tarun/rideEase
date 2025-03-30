import React from 'react'
import { FaMoneyCheck, FaSquare } from 'react-icons/fa'
import { MdLocationOn } from 'react-icons/md'
import { RiArrowDownWideLine } from 'react-icons/ri' 

const FinishRidePannel = (params) => {
    return (
        <div className='bg-[#F1F2F6] flex flex-col'>
            <div  className='text-3xl font-semibold bg-[#FF8900]  px-4 py-6 flex justify-between items-center'>
            <h2> Finish this Ride</h2>
            <span
                onClick={() => params.setFinishRidePnl(false)}
                className='scale-x-125'><RiArrowDownWideLine /></span>
            </div>
            <div className='flex justify-between my-3 p-4 items-center' >
                <div className='flex gap-2 items-center'>
                    <img className=' rounded-full h-18 w-18 object-cover object-center ' src="https://photosbook.in/wp-content/uploads/real-girl-pic54.jpg " alt="sdfs" />
                    <div>
                        <h2 className='text-2xl font-semibold capitalize'>{params.rideData?.user.fullName.firstName+" "+params.rideData?.user.fullName.lastName}</h2>
                        <p className='text-gray-600 text-lg'>Immidiate</p>
                    </div>
                </div>
                <div className='px-2 items-end flex flex-col'>
                    <h2 className='text-2xl font-semibold'>5 km</h2>
                    <p className='text-gray-600 text-lg'>away</p>
                </div>
            </div>
            {/* drivers location */}
            <div className=' flex  '>
                <span className='my-auto text-2xl px-4'><MdLocationOn /></span>
                <div className='border-t-2 p-4 border-gray-400 grow'>
                    <h1 className='text-2xl font-semibold capitalize'>{params.rideData?.pickUp}</h1>
                    <p className='text-lg  font-semibold text-gray-600'>PICK UP</p>
                </div>
            </div>
            {/* location box  */}
            <div className=' flex  '>
                <span className='my-auto px-4'><FaSquare /></span>
                <div className='border-t-2 p-4 border-gray-400 grow'>
                    <h1 className='text-2xl font-semibold capitalize'> {params.rideData?.destination}</h1>
                    <p className='text-lg font-semibold  text-gray-600 '>DESTINATION</p>
                </div>
            </div>
            {/* price box  */}
            <div className=' flex  '>
                <span className='my-auto px-4'><FaMoneyCheck /></span>
                <div className='border-t-2 p-4 border-gray-400 grow'>
                    <h1 className='text-2xl font-semibold'>₹{params.rideData?.fare}</h1> 
                    <p className='text-lg   text-gray-600'>To Be Paid</p>

                </div>
            </div>
            <div className='items-center gap-3 px-4 flex mb-6 mt-2 flex-col '>
                <button className='py-2 px-4 w-full rounded-lg  grow text-2xl text-center bg-[#ffcf10] font-bold  '>
                    Online Payment
                </button>
                <button onClick={()=>params.handleEndRide()} className='py-2 px-4 w-full rounded-lg text-[#F1F2F6] grow text-2xl text-center bg-[#12b312] font-bold  '>
                    Compelete Ride
                </button>

            </div>
        </div>
    )
}

export default FinishRidePannel
