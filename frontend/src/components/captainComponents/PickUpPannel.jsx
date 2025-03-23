import React from 'react'
import { FaSquare } from "react-icons/fa";
import { FaMoneyCheck } from "react-icons/fa";
import { MdLocationOn } from "react-icons/md";


const PickUpPannel = (params) => {
  return (
    <div className='bg-[#F1F2F6] flex flex-col'>
                <h2 className='text-3xl font-semibold bg-[#FF8900] capitalize px-4 py-6'> go to pick-up location </h2>
    
                <div className='flex justify-between my-3 p-4 items-center' >
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
                <div className=' flex  '>
                    <span className='my-auto text-2xl px-4'><MdLocationOn /></span>
                    <div className='border-t-2 p-4 border-gray-400 grow'>
                        <h1 className='text-2xl font-semibold'>512/11-A </h1>
                        <p className='text-lg   text-gray-600'>Kempegowda International Airport</p>
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
                <div className='items-center justify-start gap-4 px-4 flex mb-6 mt-2 flex-row-reverse '>
                    <button onClick={() => {
                        params.setShowPickUpPnl(false)
                        params.setShowCnfRidePnl(true)
                    }} className='py-2 px-4 rounded-lg grow text-xl bg-[#ffcf10] font-bold  '>
                        Arrived Pick-up Location
                    </button>
                    
                </div>
    
    
            </div>
  )
}

export default PickUpPannel
