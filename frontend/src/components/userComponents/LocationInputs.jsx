import React, { forwardRef } from 'react'
import { FaCircleDot, FaSquare } from 'react-icons/fa6'
import { RiArrowDownSLine } from 'react-icons/ri'

const LocationInputs = forwardRef((params, ref) => {
  

    return (
        <>
        <div className=' w-full flex justify-between items-center pt-2 h-[30%]'>

            <h1 className='text-3xl font-semibold'>Find a trip</h1>
            <div ref={ref} onClick={() => params.setShowLocPannel(false)} className=' text-4xl '>< RiArrowDownSLine /></div>
        </div>
            <div   className="relative bg-white rounded-lg flex   flex-col w-full justify-around h-[70%] ">
                    <div className='bg-black h-[32%] border-l-3 z-10 absolute top-[50%] transform -translate-y-[45%] left-4.5'></div>
                <div className='relative  h-[40%]'>
                    <div className='absolute top-1/2 transform -translate-y-[40%] left-3  '><FaCircleDot /></div>
                    <input
                        autoComplete='off'
                        type="text"
                        required
                        className="w-full  placeholder:text-lg h-full placeholder:font-semibold p-2 border-2 pl-12 border-[#c2c1c1] focus:border-black focus:outline-none text-xl bg-[#dadada] rounded "
                        placeholder="Add a pick-up location"
                        value={params.pickUp}
                        onChange={(e) => params.handlePickUpChange(e)}
                        onClick={() => {
                            params.setShowLocPannel(true)
                            params.setActiveSugg('pickup')
                        }}
                    />
                </div>

                <div className='relative  h-[40%]'>
                    <div className='absolute top-1/2 transform -translate-y-[40%] left-3'><FaSquare /></div>
                    <input
                        autoComplete='off'
                        type="text"
                        required
                        className="w-full p-2 pl-12 placeholder:text-lg h-full placeholder:font-semibold border-2 border-[#c2c1c1] focus:border-black focus:outline-none text-xl bg-[#dadada] rounded  "
                        placeholder="Enter your destination"
                        value={params.destination}
                        onChange={(e) => params.handleDestinationChange(e)}
                        onClick={() => {
                            params.setShowLocPannel(true)
                            params.setActiveSugg('destination')

                        }}
                    />
                </div>

            </div>
        </>
    )
})

export default LocationInputs
