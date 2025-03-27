import React, { forwardRef } from 'react'
import { FaCircleDot, FaSquare } from 'react-icons/fa6'
import { RiArrowDownSLine } from 'react-icons/ri'

const LocationInputs = forwardRef((params, ref) => {
  

    return (
        <div >
            <div ref={ref} onClick={() => params.setShowLocPannel(false)} className='absolute  top-1 right-1 text-4xl '>< RiArrowDownSLine /></div>
            <h1 className='text-3xl font-semibold my-3 '>Find a trip</h1>
            <form   className="bg-white rounded-lg flex gap-2 flex-col w-full ">
                <div className='relative'>
                    <div className='bg-black h-10.5 border-l-3 z-10 absolute top-[40px] left-[19px]'></div>
                    <div className='absolute top-5 left-3  '><FaCircleDot /></div>
                    <input
                        autoComplete='off'
                        type="text"
                        required
                        className="w-full my-1 placeholder:text-[16px] placeholder:font-semibold p-2 border-2 pl-12 border-[#c2c1c1] focus:border-black focus:outline-none text-lg bg-[#dadada] rounded mb-2"
                        placeholder="Add a pick-up location"
                        value={params.pickUp}
                        onChange={(e) => params.handlePickUpChange(e)}
                        onClick={() => {
                            params.setShowLocPannel(true)
                            params.setActiveSugg('pickup')
                        }}
                    />
                </div>

                <div className='relative'>
                    <div className='absolute top-5 left-3 '><FaSquare /></div>
                    <input
                        autoComplete='off'
                        type="text"
                        required
                        className="w-full p-2 pl-12 placeholder:text-[16px] placeholder:font-semibold my-1 border-2 border-[#c2c1c1] focus:border-black focus:outline-none text-lg bg-[#dadada] rounded mb-2"
                        placeholder="Enter your destination"
                        value={params.destination}
                        onChange={(e) => params.handleDestinationChange(e)}
                        onClick={() => {
                            params.setShowLocPannel(true)
                            params.setActiveSugg('destination')

                        }}
                    />
                </div>

            </form>
        </div>
    )
})

export default LocationInputs
