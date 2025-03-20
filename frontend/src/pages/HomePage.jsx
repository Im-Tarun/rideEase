import React, { useRef, useState } from 'react' 
import { FaSquare } from "react-icons/fa"; 
import { FaCircleDot } from "react-icons/fa6";
import {useGSAP} from '@gsap/react'
import gsap from 'gsap';
import { RiArrowDownSLine } from "react-icons/ri";
import LocationSearchPannel from '../components/LocationSearchPannel.jsx';
import SelectVehicle from '../components/SelectVehicle.jsx';
import FindingDriver from '../components/FindingDriver.jsx';
import WaitingForDriver from '../components/waitingForDriver.jsx';


const HomePage = () => {
  const [pickUp, setPickUp] = useState("")
  const [destination, setDestination] = useState("")
  const [showLocPannel, setShowLocPannel] = useState(false)
  const [showVehiclePnl, setShowVehiclePnl] = useState(false)
  const [showFindDriverPnl, setShowFDrPnl ] = useState(false)
  const [showWaitDvPnl, setshowWaitDvPnl] = useState(false)

  const locPannelRef = useRef(null)
  const downArrowRef = useRef(null)
  const vehiclePnlRef = useRef(null)
  const findDriverPnlRef = useRef(null)
  const waitDriverPnlref = useRef(null)

// main location pannel
  useGSAP(()=>{
    if(showLocPannel){
      gsap.to(locPannelRef.current,{
        height: '80%',
        // opacity:1
        backgroundColor:"white"
      })
      gsap.to(downArrowRef.current, {
        opacity:1,
        display:'block'
      })
    }else{
      gsap.to(locPannelRef.current,{
        height: '0%',
      })
      gsap.to(downArrowRef.current, {
        display:'none',
        opacity:0
      })
    }
  },[showLocPannel])

  // select vehicle pannel
  useGSAP(()=>{
    if(showVehiclePnl){
      gsap.to(vehiclePnlRef.current,{
        translateY:"0%",
      })
    }else{
      gsap.to(vehiclePnlRef.current,{
        translateY:"100%",
      })
    }
  },[showVehiclePnl])

// finding driver pannel 
  useGSAP(()=>{
    if(showFindDriverPnl){
      gsap.to(findDriverPnlRef.current,{
        translateY:"0%",
      })
    }else{
      gsap.to(findDriverPnlRef.current,{
        translateY:"100%",
      })
    }
  },[showFindDriverPnl])

  // waiting for driver details pannel
  useGSAP(()=>{
    if(showWaitDvPnl){
      gsap.to(waitDriverPnlref.current,{
        translateY:"0%",
      })
    }else{
      gsap.to(waitDriverPnlref.current,{
        translateY:"100%",
      })
    }
  },[showWaitDvPnl])


  const handleSubmit = () => {
  }
  

  return (
    <>
      <div className='flex relative flex-col bg-cover bg-center bg-[url(https://s.wsj.net/public/resources/images/BN-XR452_201802_M_20180228165525.gif)] h-screen justify-between '>
        <img width={120} className='h-fit m-5 ' src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" alt="UBER" />
        <div className='absolute w-full z-1 h-screen flex flex-col justify-end overflow-hidden'>

          {/* form box */}
          <div  className='bg-white px-4 h-56 border-b-1 border-white relative'>
            <div ref={downArrowRef} onClick={()=>setShowLocPannel(false)} className='absolute  top-1 right-1 text-4xl '>< RiArrowDownSLine /></div>
            <h1 className='text-3xl font-semibold my-3 '>Find a trip</h1>
            <form onSubmit={handleSubmit} className="bg-white rounded-lg flex gap-2 flex-col w-full ">
              <div className='relative'>
                <div className='bg-black h-10.5 border-l-3 z-10 absolute top-[40px] left-[19px]'></div>
                <div className='absolute top-5 left-3  '><FaCircleDot /></div>
                <input
                  autoComplete='off'
                  type="text"
                  required
                  className="w-full my-1 placeholder:text-[16px] placeholder:font-semibold p-2 border-2 pl-12 border-[#c2c1c1] focus:border-black focus:outline-none text-lg bg-[#dadada] rounded mb-2"
                  placeholder="Add a pick-up location"
                  value={pickUp}
                  onChange={(e) => setPickUp(e.target.value)}
                  onClick={()=>setShowLocPannel(true)}
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
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  onClick={()=>setShowLocPannel(true)}
                />
              </div>

            </form>
          </div>

          {/* location container component */}
          <div ref={locPannelRef} className='h-0' >
            <LocationSearchPannel  setShowVehiclePnl={setShowVehiclePnl} setShowLocPannel={setShowLocPannel} />
          </div>

          {/* select vehicle from here */}
          <div ref={vehiclePnlRef} className='w-full h-screen  flex flex-col translate-y-full justify-end z-40 absolute '>
            <SelectVehicle setShowVehiclePnl={setShowVehiclePnl} setShowLocPannel={setShowLocPannel} setShowFDrPnl={setShowFDrPnl}/>
          </div>

          {/*findin driver */}
          <div ref={findDriverPnlRef} className='w-full h-screen flex flex-col translate-y-full justify-end z-40 absolute '>
            <FindingDriver setShowFDrPnl={setShowFDrPnl} />
          </div>

          {/*waiting for driver to pick u up*/}
          <div ref={waitDriverPnlref} className='w-full h-screen flex flex-col translate-y-full justify-end z-40 absolute '>
            <WaitingForDriver/>
          </div>

        </div>

      </div>
    </>
  )
}

export default HomePage

{/* <Link to={'/logout'}>logout</Link>  */}