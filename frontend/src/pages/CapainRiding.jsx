import React, { useRef, useState } from 'react'
import { RiArrowUpWideLine } from "react-icons/ri";
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import FinishRidePannel from '../components/captainComponents/FinishRidePannel';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import CurrentLocationMap from '../components/CurrentLocationMap';

const CapainRiding = () => {
    const [finishRidePnl, setFinishRidePnl] = useState(true)
    const finishRidePnlRef = useRef(null)
    const location = useLocation()
    const navigate = useNavigate()

    const rideData = location.state?.rideData

    useGSAP(() => {
        if (finishRidePnl) {
            gsap.to(finishRidePnlRef.current, {
                translateY: "0%",
            })
        } else {
            gsap.to(finishRidePnlRef.current, {
                translateY: "100%",
            })
        }
    }, [finishRidePnl])

    const handleEndRide = async () => {
        const response = await axios.post(`/api/ride/end`, {
            rideId: rideData._id
        }, {
            headers: {
                authorization: "Bearer " + localStorage.getItem('token'),
            }
        }
        )
        console.log(response.data)
        setFinishRidePnl(false)
        navigate('/captain-home')
    }


    return (
        <div className='flex relative  flex-col bg-cover bg-center bg-[url(https://s.wsj.net/public/resources/images/BN-XR452_201802_M_20180228165525.gif)] h-screen justify-between '>

            <div className='absolute flex z-1  items-center justify-between top-0 w-full'>
                <img width={120} className='h-fit m-5 ' src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" alt="UBER" />
            </div>

            <div className=' w-full h-screen absolute top-0 flex flex-col justify-end overflow-hidden'>
                <div className='z-0 h-full' >
                    <CurrentLocationMap />
                </div>


                {/* captain details */}
                <div className='bg-[#FF8900] px-4 flex flex-col items-center'>
                    <span
                        onClick={() => setFinishRidePnl(true)}
                        className='text-3xl scale-x-125'><RiArrowUpWideLine /></span>
                    <div className='items-center justify-between w-full flex my-4 '>
                        <h1 className='py-2 rounded-lg grow text-2xl w-fit  font-bold  '>4 Km Away </h1>
                        <button onClick={() =>
                            handleEndRide()
                        } className='py-2 px-4  rounded-lg text-xl  font-bold text-[#F1F2F6] bg-[#12b312]'> Complete Ride </button>
                    </div>
                </div>

                {/* compelete  ride  */}
                <div ref={finishRidePnlRef} className='w-full h-screen flex flex-col justify-end z-40 translate-y-full absolute '>
                    <FinishRidePannel handleEndRide={handleEndRide} rideData={rideData} setFinishRidePnl={setFinishRidePnl} />
                </div>
            </div>
        </div>
    )
}

export default CapainRiding
