import React from 'react' 
import { FaLocationArrow } from "react-icons/fa6"; 

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
      <div className="bg-white  px-3 pt-2 w-full rounded-lg h-full ">
        <div className='items-center justify-start gap-4  flex mb-6 flex-row-reverse '>
          <button onClick={()=>params.handleFindFare() } className='py-2 px-4 rounded-lg grow text-xl bg-[#ffcf10] font-bold'  > Find Ride </button>
        </div>
        <ul className="space-y-3 h-[86%] pb-4 overflow-y-scroll ">
          { params.suggestions.map((elem, indx) => {
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

