import React from 'react' 
import { FaSquare } from "react-icons/fa";
import { FaMoneyCheck } from "react-icons/fa";
import { MdLocationOn } from "react-icons/md"; 

const FindingDriver = ({setShowFDrPnl}) => {
    return (
        <>
            <div className='bg-white '>
                    <h2 className='text-3xl font-semibold px-4 py-6'>Lookin For A Driver</h2>
                {/* vehicle boxes */}
                <div className='flex flex-col '>
                    {/* vehicle image box */}
                    <div className='flex justify-center border-t-2 border-gray-400'>
                        <img className='w-52' src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1712027307/assets/42/eb85c3-e2dc-4e95-a70d-22ee4f08015f/original/Screenshot-2024-04-01-at-9.08.07p.m..png" alt="caar" />
                    </div>
                    {/* drivers location */}
                    <div className=' flex  '>
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
                <button  onClick={() => {
                        setShowFDrPnl(false)
                    }}  className='items-center justify-center m-2 p-2 rounded-lg text-2xl  bg-gray-500 font-bold text-white flex border-2 '>
                    Cancel
                </button>
                </div>
            </div>
        </>
    )
}

export default FindingDriver
 