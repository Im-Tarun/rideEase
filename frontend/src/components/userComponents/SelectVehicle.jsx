import React from 'react'
import { IoMdPerson } from "react-icons/io";
import { RiArrowDownSLine } from "react-icons/ri";


const SelectVehicle = (params) => {
  return (
    <div className='bg-white p-4'>
      <div className='flex items-center justify-between '>
        <h1 className='text-3xl font-semibold pt-3 pb-6  '>Choose a vehicle</h1>
        <span onClick={() => {
          params.setShowVehiclePnl(false)
          params.setShowLocPannel(true)
        }} className=' text-4xl '>< RiArrowDownSLine /></span>
      </div>
      {/* vehicle boxes */}

      <div onClick={() => {
        params.handleCreateRide('motorcycle')
      }} className='flex  px-2 py-3  border-3 border-gray-300 active:border-black  rounded-xl mb-3'>
        <img className='w-30 h-[85px] ' src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1649231091/assets/2c/7fa194-c954-49b2-9c6d-a3b8601370f5/original/Uber_Moto_Orange_312x208_pixels_Mobile.png" alt="bike" />
        <div className='flex  justify-center grow flex-col '>
          <h4 className='text-lg flex font-bold'>UberGo <span className='px-2 pt-[5px]'><IoMdPerson /></span>1</h4>
          <h5 className='text-md font-semibold '>2 mins Away</h5>
          <p className='text-sm text-gray-800'>Affordable, bike rides</p>
        </div>
        <h2 className='text-lg font-bold my-auto flex'> ₹{params.fare && params.fare.cost.motorcycle}  </h2>
      </div>

      <div onClick={() => {
        params.handleCreateRide('auto')
      }} className='flex px-2 py-3 border-3 border-gray-300 active:border-black   rounded-xl mb-3'>
        <img className='w-30 h-[85px]  ' src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1648431773/assets/1d/db8c56-0204-4ce4-81ce-56a11a07fe98/original/Uber_Auto_558x372_pixels_Desktop.png" alt="auto" />
        <div className='flex justify-center grow flex-col '>
          <h4 className='text-lg flex font-bold'>UberGo <span className='px-2 pt-[5px]'><IoMdPerson /></span>3</h4>
          <h5 className='text-md font-semibold '>5 mins Away</h5>
          <p className='text-sm text-gray-800'>Affordable, auto rides</p>
        </div>
        <h2 className='text-lg font-bold  my-auto'>₹{params.fare && params.fare.cost.auto} </h2>
      </div>

      <div onClick={() => {
        params.handleCreateRide('car')
      }} className='flex px-2 py-3 border-3 border-gray-300 active:border-black  rounded-xl mb-3'>
        <img className='w-30 h-[85px] ' src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1712027307/assets/42/eb85c3-e2dc-4e95-a70d-22ee4f08015f/original/Screenshot-2024-04-01-at-9.08.07p.m..png" alt="caar" />
        <div className='flex justify-center grow flex-col '>
          <h4 className='text-lg flex font-bold'>UberGo <span className='px-2 pt-[5px]'><IoMdPerson /></span>4</h4>
          <h5 className='text-md font-semibold '>2 mins Away</h5>
          <p className='text-sm text-gray-800'>Affordable, car rides</p>
        </div>
        <h2 className='text-lg font-bold my-auto'> ₹{params.fare && params.fare.cost.car} </h2>
      </div>

    </div >
  )
}

export default SelectVehicle
