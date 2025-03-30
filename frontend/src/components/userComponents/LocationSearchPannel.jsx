import React from 'react' 
import { FaLocationArrow } from "react-icons/fa6"; 
import { MdOutlineMyLocation } from 'react-icons/md';

const LocationSearchPannel = (params) => {

  // const suggestions = ['border-gray-400',  'px-3 ', 'py-6 w-', 'full rou', 'nded-lg ', 'shadow-md',  'h-full','px-3 ', 'py-6 w-', 'full rou', 'nded-lg ', 'shadow-md',  'h-full' ]
  const handleSetInput = (value) => {
    if (params.activeSugg === 'pickup') {
      params.setPickUp(value)
    } else if (params.activeSugg === 'destination') {
      params.setDestination(value)
    }
  }

  return (
    <>
      <div className="bg-white  px-3 pt-2 w-full rounded-lg h-full overflow-x-hidden pb-2 ">
        <div className=' justify-evenly flex mb-4 flex-col '>
          <button onClick={()=>params.handleFindFare() } className='py-2 px-4 rounded-lg grow text-xl bg-[#ffcf10] font-bold'  > Find Ride </button>
          {params.activeSugg === 'pickup' && <button onClick={()=>{}} className='flex items-center self-start my-1 py-1 text-purple-800 font-semibold active:text-blue-800'>
            <span  className='px-2'><MdOutlineMyLocation/></span>
            <span>Use current location</span>
          </button>}
        </div>
        <ul className="space-y-3 h-[83%]  overflow-y-scroll ">
          {  params.suggestions.map((elem, indx) => {
            return (
              <li key={indx} onClick={() => {
                handleSetInput(elem)
              }} className="flex items-center active:border-black border-2 border-gray-300 px-2 py-3 rounded-lg space-x-3">
                <span className="text-xl pt-2"><FaLocationArrow /></span>
                <div>
                  <h4 className="text-lg font-semibold">{elem}</h4>
                </div>
              </li>)
          })}
        </ul>

      </div>

    </>
  )
}

export default LocationSearchPannel

