import React from 'react'
import { Link } from 'react-router-dom'
import { FaLocationArrow } from "react-icons/fa6";
import { MdLocationOn } from "react-icons/md";

const LocationSearchPannel = (params) => {
  const location = ["Kempegowda International Airport", "Lucknow International Airport", " Bhopal International Airport"]

  return (
    <>
      <div className="bg-white  border-t-2 border-gray-400 px-3 py-6 w-full rounded-lg shadow-md ">
        <ul className="space-y-4">
          {location.map((elem, indx) => {
            return (
              <li key={indx} onClick={() => {
                params.setShowVehiclePnl(true)
                params.setShowLocPannel(false)
              }} className="flex items-center active:border-black border-2 border-gray-300 px-2 py-3 rounded-lg space-x-3">
                <span className="text-xl pt-2"><FaLocationArrow /></span>
                <div>
                  <h4 className="text-lg font-semibold">{elem}</h4>
                  <p className="text-gray-700 text-xs">KIAL Rd, Devanahalli, Bengaluru, Karnataka</p>
                </div>
              </li>)
          })}

          <li className="flex  space-x-3 cursor-pointer items-baseline hover:bg-gray-200 py-2 rounded-lg">
            <span className="text-xl"><MdLocationOn /></span>
            <Link>
              <h4 className="text-md font-semibold text-purple-900">Set location on map</h4>
            </Link>
          </li>
        </ul>

      </div>

    </>
  )
}

export default LocationSearchPannel

