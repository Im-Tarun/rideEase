import React from 'react'
import { FaSquare } from "react-icons/fa";
import { FaMoneyCheck } from "react-icons/fa";
import { MdLocationOn } from "react-icons/md";

const NewRidePannel = (params) => {
    return (

        <div className='bg-[#F1F2F6] flex flex-col'>
            <h2 className='text-3xl font-semibold bg-[#FF8900]  px-4 py-6'> New Ride Available!</h2>

            {/*user image and info */}
            <div className='flex justify-between my-3 p-4 items-center' >
                <div className='flex gap-2 items-center'>
                    <img className=' rounded-full h-18 w-18 object-cover object-center ' src="https://photosbook.in/wp-content/uploads/real-girl-pic54.jpg " alt="sdfs" />
                    <div>
                        <h2 className='text-2xl font-semibold capitalize'>{params.newRide?.user.fullName.firstName+" "+params.newRide?.user.fullName.lastName}</h2>
                        <p className='text-gray-600 text-lg'>Immidiate</p>
                    </div>
                </div>
                <div className='px-2 items-end flex flex-col'>
                    <h2 className='text-2xl font-semibold'>5 km</h2>
                    <p className='text-gray-600 text-lg'>away</p>
                </div>
            </div>
            {/*user pickup*/}
            <div className=' flex  '>
                <span className='my-auto text-2xl px-4'><MdLocationOn/></span>
                <div className='border-t-2 p-4 border-gray-400 grow'>
                    <h1 className='text-2xl font-semibold capitalize' >{params.newRide?.pickUp}</h1>
                    <p className='text-lg  text-gray-600'>Pick-up</p>
                </div>
            </div>
            {/*user destination*/}
            <div className=' flex  '>
                <span className='my-auto px-4'><FaSquare /></span>
                <div className='border-t-2 p-4 border-gray-400 grow'>
                    <h1 className='text-2xl font-semibold capitalize'>{params.newRide?.destination}</h1>
                    <p className='text-lg   text-gray-600'>Destination</p>
                </div>
            </div>
            {/* price box  */}
            <div className=' flex  '>
                <span className='my-auto px-4'><FaMoneyCheck /></span>
                <div className='border-t-2 p-4 border-gray-400 grow'>
                    <h1 className='text-2xl font-semibold capitalize'>₹{params.newRide?.fare}</h1>
                    <p className='text-lg   text-gray-600'>Mode - cash</p>
                </div>
            </div>
            <div className='items-center justify-start gap-4 px-4 flex mb-6 mt-2 flex-row-reverse '>
                <button onClick={() => {
                    console.log("clicked")
                    params.acceptRide()
                }} className='py-2 px-4 rounded-lg grow text-2xl bg-[#ffcf10] font-bold  '>
                    Accept
                </button>
                <button onClick={() => {params.setShowNewRidePnl(false)
                    setNewRide(null)
                }} className='py-2 px-4  rounded-lg text-2xl  bg-[#242A37] font-bold text-white  border-2 '>
                    Ignore
                </button>
            </div>
        </div>
    )
}

export default NewRidePannel
