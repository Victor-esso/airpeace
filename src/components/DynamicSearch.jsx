import {useEffect, useRef, useState} from 'react'
import fromPlane from "../assets/plane-departure.svg";
import toPlane from "../assets/plane-arrival.svg";
import PlaneImage from "../assets/plane.png";

import * as MaterialDesign from "react-icons/md";
import AirportsSelect from './AirportsSelect';
import DatePicker from './DatePicker';

import { convertDateFormat } from '../Functions';
import PassengerCount from './PassengerCount';
import FlightClassOption from './FlightClassOption';
import {motion , AnimatePresence} from "framer-motion"
import animations from '../animateions';



const DynamicSearch = ({handleSubmittedData}) => {
     // Current Tab State
      const [currentTab , setCurrentTab] = useState('book');
      const [flightType , setFlightType] = useState('return');

      const [overlay , setOverlay] = useState();

      const [flightFrom , setFlightFrom] = useState(null);
      const [flightTo , setFlightTo] = useState(null);
      const [departureDate , setDepartureDate] = useState(null);
      const [returnDate , setReturnDate] = useState(null);
      const [flightClass , setFlightClass] = useState('economy');

      const [passengers , setPassengers] = useState({
              adult : 1,
              child : 0,
              infant : 0
      })

      const handleFromAirportSelection = (airport) => {
            if(airport.code){
              setFlightFrom(airport);
              setOverlay(null);
            }
      }

      const handleToAirportSelection = (airport) => {
            if(airport.code){
              setFlightTo(airport);
              setOverlay(null);
            }
      }

      const overlayClick = () =>{
          setOverlay(null)
      }

      useEffect(()=>{

        if(flightType != 'return'){
          setReturnDate(null);
        }

      },[flightType])



      const swapFromTo = () =>{
          let theFrom = flightFrom;
          let theTo = flightTo;

          setFlightFrom(theTo);
          setFlightTo(theFrom);
      }

      const handleDatePicked = (selectedDates) =>{
            if(selectedDates.length > 0){
              setDepartureDate(selectedDates[0])
            }

            if(selectedDates.length == 2){
              setReturnDate(selectedDates[1])
            }

            setOverlay(null)
      }

      let selectedDates = [];

      if(departureDate){
          selectedDates[0] = departureDate;
      }
      if(departureDate && returnDate){
          selectedDates[1] = returnDate
      }


      const resetPassangers = () =>{
        setPassengers({
            adult : 1,
            child : 0,
            infant : 0
          })
      }

      const clickOnFLightClass = (classSelected)=>{
        setFlightClass(classSelected);
        setOverlay(null)
      }

      const searchFlight = () => {
        // check for all input stuff
        if(!flightFrom){setOverlay('select-from'); return;}
        if(!flightTo){setOverlay('select-to'); return;}
        if(!departureDate || (flightType == 'return' && !returnDate)){setOverlay('select-date'); return;}
        if(!Object.values(passengers).reduce((acc, cur) => acc + cur, 0)){setOverlay('select-passenger'); return;}

        handleSubmittedData({
          flightFrom ,
          flightTo,
          departureDate,
          returnDate,
          flightType,
          flightClass,
          passengers,
          passengerCount : Object.values(passengers).reduce((acc, cur) => acc + cur, 0)
        })

      }





  return (
    <>
        <div className="w-full max-w-[474px] lg:max-w-[500px]  relative  px-6 mt-[183px] lg:mt-0 z-0">
              {/* Aeroplane image */}
              <img src={PlaneImage} alt="" className='absolute z-[-1] max-w-unset  rotate-[-12.05deg] | xl:top-[36%] lg:top-[50%] sm:top-[150px] top-[51px] | lg:translate-y-[-50%] lg:left-[-43%]  translate-y-[-100%]  sm:left-[-10%] sm:h-[492.73px] h-[273px] left-[18px]' />

            <div className="w-fill h-max bg-[#2279D3] rounded-[24px] z-10 relative">
              {/* Top section */}
              <div className="h-[71px] *:capitalize *:text-white flex items-center justify-between px-[16px] *:px-[24px] *:py-[8px] *:sm:text-[15px] text-[13px]  *:rounded-[24px] *:font-medium *:w-max">
                <button className={`${currentTab == 'book' ? 'bg-[#1C65B0]' : 'hover:bg-[#398BDF] transition duration-200'} `} onClick={()=>setCurrentTab('book')}>Book</button>
                <button className={`${currentTab == 'bookings' ? 'bg-[#1C65B0]' : 'hover:bg-[#398BDF] transition duration-200'} `} onClick={()=>setCurrentTab('bookings')}>my bookings</button>
                <button className={`${currentTab == 'check-in' ? 'bg-[#1C65B0]' : 'hover:bg-[#398BDF] transition duration-200'} `} onClick={()=>setCurrentTab('check-in')}>check-in</button>
              </div>

              <div className="bg-white w-fill rounded-[24px]">
                {/* Book Tab */}
                
                {currentTab == 'book' &&
                  <div >
                    <AnimatePresence>
                        {/* Overlay when dropdown is visible */}
                        {overlay && 
                        
                        <motion.div initial={{opacity:0}}  animate={{opacity:1}} exit={{opacity:0}} onClick={() => overlayClick() } className='w-full h-full absolute top-0 left-0 bg-[#2763AA]/[.5] z-[10] rounded-[24px] backdrop-blur-[1px] overflow-hidden p-5 grid place-items-center'></motion.div>
                        }
                    </AnimatePresence>

                    {/* pick flight type */}
                    <div className="flex items-center">
                      <button className={`grid place-items-center w-[50%] py-[16px] border-b-[1px] text-[15px] rounded-tl-[24px] font-medium ${flightType == 'return' ? 'border-[#E4001C] text-[#E4001C]' : 'hover:bg-[#F5F5F5] transition duration-200'}`} onClick={()=> setFlightType('return')}>Return</button>
                      <button className={`grid place-items-center w-[50%] py-[16px] border-b-[1px] text-[15px] rounded-tr-[24px] font-medium ${flightType == 'one-way' ? 'border-[#E4001C] text-[#E4001C]' : 'hover:bg-[#F5F5F5] transition duration-200'}`} onClick={()=> setFlightType('one-way')}>One Way</button>
                    </div>

                    {/* Select from and to */}
                    <motion.div variants={{animate:{transition:{delayChildren: 0.2,staggerChildren: 0.05}}}} initial="initial" animate="animate" exit="exit" className="flex flex-col">
                      {/* From Button */}
                      <motion.div variants={animations.fadeUp} className="h-max px-[16px] py-[10px] w-full relative">
                        <motion.button whileTap={{scale:.95}} onClick={() => setOverlay('select-from')} className="horizontal justify-between items-center px-[16px] py-[10px] group hover:bg-[#F5F5F5] w-full rounded-[16px] relative">
                          <div className="vertical gap-[8px] items-start">
                            <span className="text-[15px]">From</span>
                            <div className="h-[30px]">
                              <div className='horizontal gap-[6px] items-center absolute abs-center-y left-0 ps-[16px]'>
                                {(flightFrom) ? 
                                  
                                    <>
                                      <span className="text-[20px]">{flightFrom.city}</span>
                                      <span className="text-[20px] text-[#E4001C]">{flightFrom.code}</span>
                                    </>
                                  :
                                    <span className="text-[20px]">Flying From</span>
                                }
                                <MaterialDesign.MdChevronLeft size={24}  className="rotate-[270deg] group-hover:text-[#E4001C]"/>
                              </div>
                            </div>
                            <div className="horizontal items-center relative">
                              {(flightFrom) ? 
                                  <>
                                  <MaterialDesign.MdFlightTakeoff size={16} className="text-[#BBBBBB]" />
                                    <span className="text-left sm:text-[12px] text-[10px] abs-center-y text-[#757575] w-max absolute left-[20px]">{flightFrom.name}</span>
                                  </>
                                :
                                  <>
                                    <MaterialDesign.MdFlightTakeoff size={16} className="text-[#BBBBBB]" />
                                    <span className="text-left sm:text-[12px] text-[10px] abs-center-y text-[#757575] w-max absolute left-[20px] capitalize">Select departure airport</span>
                                  </>
                              }
                            </div>
                          </div>
                          <img src={fromPlane} alt=""  className="group-hover:rotate-[-15deg] transition-transform delay-150 duration-700" />
                        </motion.button>

                        

                        <AnimatePresence>
                          {/* From DropDown */}
                          {overlay == 'select-from' && 
                                                  
                              <AirportsSelect handleAirportSelection={handleFromAirportSelection} flightLocation="departure" selectedFrom={flightFrom}  selectedTo={flightTo} />
                            
                            }
                        </AnimatePresence>
                        
                      </motion.div>

                      {/* Divider */}
                      <motion.div variants={animations.fadeUp} className="py-0 grid place-items-center px-7 relative">
                        <button onClick={() => swapFromTo()} className="absolute abs-center-y w-[42px] h-[42px] grid place-items-center rounded-full right-[32px] bg-white hover:bg-[#F5F5F5] border-[1px] border-[#F1F1F1] z-[1] group"> <MaterialDesign.MdOutlineSyncAlt size={20} className="rotate-[90deg] group-hover:text-[#E4001C]" /></button>
                          <div className="bg-[#F1F1F1] h-[1px] w-full"></div>
                      </motion.div>

                      {/* To button */}
                      <motion.div variants={animations.fadeUp} className="h-max px-[16px] py-[10px] w-full relative">
                        <motion.button whileTap={{scale:.95}} onClick={() => setOverlay('select-to')} className="horizontal justify-between items-center px-[16px] py-[10px] group hover:bg-[#F5F5F5] w-full rounded-[16px] relative">
                          <div className="vertical gap-[8px] items-start">
                            <span className="text-[15px]">To</span>
                            <div className=" h-[30px]">
                              <div className='horizontal gap-[6px] items-center absolute abs-center-y left-0 ps-[16px]'>
                              {(flightTo) ? 
                                
                                    <>
                                    <span className="text-[20px] text-left txt-line-1 ">{flightTo.city}</span>
                                    <span className="text-[20px] text-[#E4001C]">{flightTo.code}</span>
                                    </>
                                    :
                                    <span className="text-[20px]">Flying To</span>
                                  }
                                  <MaterialDesign.MdChevronLeft size={24}  className="rotate-[270deg] group-hover:text-[#E4001C]"/>
                              </div>
                            </div>
                            <div className="horizontal items-center relative">
                              {(flightTo) ? 
                                  <>
                                  <MaterialDesign.MdFlightLand size={16} className="text-[#BBBBBB]" />
                                    <span className="text-left sm:text-[12px] text-[10px] abs-center-y text-[#757575] w-max absolute left-[20px]">{flightTo.name}</span>
                                  </>
                                :
                                  <>
                                    <MaterialDesign.MdFlightLand size={16} className="text-[#BBBBBB]" />
                                    <span className="text-left sm:text-[12px] text-[10px] abs-center-y text-[#757575] w-max absolute left-[20px] capitalize">Select destination airport</span>
                                  </>
                              }
                            </div>
                          </div>
                          <img src={toPlane} alt=""  className="group-hover:rotate-[-15deg] transition-transform delay-150 duration-700" />
                        </motion.button>
                        <AnimatePresence>
                            {/* From DropDown */}
                            {overlay == 'select-to' && <AirportsSelect handleAirportSelection={handleToAirportSelection} flightLocation="destination" selectedFrom={flightFrom}  selectedTo={flightTo} />}
                        </AnimatePresence>
                        
                      </motion.div>

                      {/* Date selection */}
                      <motion.div variants={animations.fadeUp} className=" px-[16px] py-[10px] relative">
                        <div className="horizontal overflow-hidden rounded-[16px] relative group z-0">
                          <motion.button whileTap={{scale:.95}} onClick={()=> setOverlay('select-date')} className="w-full horizontal items-center justify-between px-[16px] py-[10px] hover:bg-[#F5F5F5] group">
                            <div className="vertical items-start">
                              <span className="text-[15px]">Departure</span>
                              {departureDate ? 
                              
                                  <span className="text-[20px] uppercase">{convertDateFormat(departureDate)}</span>
                                :
                                  <span className="text-[20px]">Select Date</span>

                              }
                            </div>
                            {flightType != 'return' && <MaterialDesign.MdDateRange size={20} className="group-hover:text-[#E4001C]" />}
                            
                          </motion.button>
                        {flightType == 'return' && 
                          <>
                            <motion.button variants={animations.fadeLeft} whileTap={{scale:.95}} onClick={()=> (departureDate && setOverlay('select-date'))}  className="w-full vertical items-end  px-[16px] py-[10px] hover:bg-[#F5F5F5]">
                              <span className="text-[15px]">Return</span>
                              {returnDate ? 
                              
                                  <span className="text-[20px] uppercase">{convertDateFormat(returnDate)}</span>
                                :
                                  <span className="text-[20px]">Select Date</span>

                              }
                            </motion.button>
                            <span className="absolute abs-center-xy w-[42px] h-[42px] grid place-items-center rounded-full bg-white z-[1]">
                              <MaterialDesign.MdArrowForward size={20} className='group-hover:text-[#E4001C]' />
                            </span>
                          </>
                        }
                        </div>
                        {/* Date Overlay */}
                        <AnimatePresence>
                        {overlay == 'select-date' &&  
                        
                          <DatePicker isSingleDate={!(flightType == 'return')} handleDatePicked={handleDatePicked} selectedDates={selectedDates} />
                          
                        }
                        </AnimatePresence>
                      </motion.div>

                      {/* Passenger & flight Seat */}
                      <motion.div variants={animations.fadeUp} className="px-[32px] py-[24px] relative">
                        <div className="horizontal w-full overflow-hidden rounded-full gap-[8px]">
                          <motion.button whileTap={{scale:.95}} onClick={() => setOverlay('select-passenger')} className="w-full horizontal justify-between py-[12px] px-[18px] bg-[#F7F7F7] hover:bg-[#E6E6E6] group">
                            <span className="text-[16px] w-max horizontal items-center gap-2"><span className='font-medium group-hover:text-[#E4001C]'>{Object.values(passengers).reduce((acc, cur) => acc + cur, 0)}</span> Passenger</span>
                            <MaterialDesign.MdChevronLeft size={24}  className="rotate-[270deg] group-hover:text-[#E4001C]"/>
                          </motion.button>
                          <motion.button whileTap={{scale:.95}} onClick={() => setOverlay('select-class')} className="w-full horizontal justify-between py-[12px] px-[18px] bg-[#F7F7F7] hover:bg-[#E6E6E6] group">
                            <span className="text-[16px] w-max capitalize horizontal items-center gap-2">
                              {flightClass != 'premium economy' && flightClass}
                              {flightClass == 'premium economy' && <MaterialDesign.MdLocalPolice size={24}  className=" text-[#E4001C]"/>}
                              {flightClass == 'premium economy' && 'economy'}
                            </span>

                              {flightClass != 'premium economy' && <MaterialDesign.MdChevronLeft size={24}  className="rotate-[270deg] group-hover:text-[#E4001C]"/>}
                            
                          </motion.button>
                        </div>
                        <AnimatePresence>
                          {overlay == 'select-passenger' && 
                          
                            <motion.div variants={{...animations.zoomIn}} initial="initial" animate="animate" exit="exit" className='absolute left-0 w-full z-[9999999999] px-[16px] py-[10px] top-[-140px] '>
                                <motion.div variants={{animate:{transition:{delayChildren: 0.2,staggerChildren: 0.05}}}} className='bg-white w-full px-8 rounded-3xl'>
                                  <motion.h2 variants={animations.zoomIn} className='w-full text-center xl:text-[1.3rem] text-[1.15rem] font-medium justify-center py-5 horizontal items-center gap-2'>Passengers<MaterialDesign.MdGroups className='text-[#E4001C]' /></motion.h2>
                                  <motion.div variants={{animate:{transition:{delayChildren: 0.2,staggerChildren: 0.05}}}} className='vertical items-start w-full gap-5'>
                                    <PassengerCount label='Adult' subLabel='12+ years' countValue={passengers.adult} updateValue={(value)=> setPassengers({...passengers , adult: value})} />
                                    <PassengerCount label='Child' subLabel='2-11 years' countValue={passengers.child} updateValue={(value)=> setPassengers({...passengers , child: value})} />
                                    <PassengerCount label='Infant' subLabel='under 2 years' countValue={passengers.infant} updateValue={(value)=> setPassengers({...passengers , infant: value})} />
                                  </motion.div>
                                  <motion.div variants={animations.fadeUp} className='py-5 flex-center gap-2'>
                                        <motion.button whileTap={{scale:.85}} onClick={()=> resetPassangers()} className="horizontal items-center gap-[4px] px-4 py-2 rounded-full hover:bg-[#F5F5F5] text-gray-600  group ">
                                          <MaterialDesign.MdRestartAlt size={24} className="group-hover:text-[#E4001C]"/>
                                          <span className="text-[11px] font-semibold uppercase group-hover:text-black">reset</span>
                                        </motion.button>
                                        <motion.button whileTap={{scale:.85}} onClick={() => setOverlay(null)} className="horizontal items-center gap-[8px] px-6 py-2 rounded-full border-[1px] border-black hover:bg-black group  sm:text-black text-white bg-black sm:bg-white">
                                          <MaterialDesign.MdHowToReg size={24} className="group-hover:text-white"/>
                                          <span className="text-[14px] font-semibold uppercase group-hover:text-white">Continue</span>
                                        </motion.button>
                                  </motion.div>
                                </motion.div>

                            </motion.div>
                          }
                        </AnimatePresence>
                        <AnimatePresence>
                          {overlay == 'select-class' && 
                          
                            <motion.div variants={{...animations.zoomIn}} initial="initial" animate="animate" exit="exit" className='absolute left-0 w-full z-[9999999999] px-[16px] py-[10px] top-[-140px] '>
                                <motion.div  variants={{animate:{transition:{delayChildren: 0.1,staggerChildren: 0.05}}}}  className='bg-white w-full px-5 pb-5 rounded-3xl'>
                                  <motion.h2 variants={animations.zoomIn} className='w-full text-center xl:text-[1.3rem] text-[1.15rem] font-medium justify-center py-5 horizontal items-center gap-2'>Flight Class</motion.h2>
                                  <motion.div  variants={{animate:{transition:{delayChildren: 0.2,staggerChildren: 0.05}}}}  className='vertical items-start w-full gap-1'>
                                    <FlightClassOption selectedValue={flightClass} optionValue='economy' handleClick={clickOnFLightClass} />
                                    <FlightClassOption selectedValue={flightClass} optionValue='premium economy' handleClick={clickOnFLightClass} />
                                    <FlightClassOption selectedValue={flightClass} optionValue='business' handleClick={clickOnFLightClass} />
                                  </motion.div>
                                </motion.div>

                            </motion.div>
                          }
                        </AnimatePresence>
                      </motion.div>

                      {/* submit button */}
                      <motion.div variants={animations.fadeUp} whileTap={{scale:.9}} className="h-[120px] grid place-items-center">
                          <button onClick={() => searchFlight()} className="horizontal items-center gap-[8px] px-[18px] py-[16px] rounded-full border-[1px] border-black hover:bg-black   sm:text-black text-white bg-black sm:bg-white  group  transition duration-200">
                            <MaterialDesign.MdOutlineSearch size={18} className="group-hover:text-white"/>
                            <span className="text-[14px] font-semibold uppercase group-hover:text-white">search for flight</span>
                          </button>
                      </motion.div>

                    </motion.div>
                  </div>
                }


                {
                  ['bookings', 'check-in'].includes(currentTab) && 
                  <motion.div variants={{animate:{transition:{delayChildren: 0.1,staggerChildren: 0.05}}}} initial="initial" animate="animate" exit="exit"  className="p-[32px] pb-0">
                    <motion.div variants={{animate:{transition:{delayChildren: 0.1,staggerChildren: 0.05}}}} className='vertical items-start gap-10'>
                      <motion.div variants={animations.fadeUp} className='vertical items-start w-full'>
                          <label htmlFor="searchInput" className='text-[15px] font-normal capitalize'>Booking ID</label>
                          <div className='w-full relative'>
                              <input type="text" className='pe-[24px] w-full focus:outline-0   pb-1 text-xl font-normal border-b-[1px] border-gray-200 focus-visible:border-[#E4001C] peer' id='searchInput'/>
                              <MaterialDesign.MdBookmarkAdded size={24} className="absolute abs-center-y right-0 text-gray-400/[.4] peer-focus:text-[#E4001C]" />
                          </div>
                      </motion.div>
                      <motion.div variants={animations.fadeUp} className='vertical items-start w-full'>
                          <label htmlFor="searchInput" className='text-[15px] font-normal capitalize'>Surname</label>
                          <div className='w-full relative'>
                              <input type="text" className='pe-[24px] w-full focus:outline-0   pb-1 text-xl font-normal border-b-[1px] border-gray-200 focus-visible:border-[#E4001C] peer' id='searchInput'/>
                              <MaterialDesign.MdPerson size={24} className="absolute abs-center-y right-0 text-gray-400/[.4] peer-focus:text-[#E4001C]" />
                          </div>
                      </motion.div>
                    </motion.div>
                    <motion.div  variants={animations.fadeUp} className="h-[120px] grid place-items-center">
                        <button className="horizontal items-center gap-[8px] px-[18px] py-[16px] rounded-full border-[1px] border-black hover:bg-black   sm:text-black text-white bg-black sm:bg-white  group  transition duration-200">
                          <MaterialDesign.MdOutlineSearch size={18} className="group-hover:text-white"/>
                          <span className="text-[14px] font-semibold uppercase group-hover:text-white">{currentTab == 'bookings' && 'find booking'}{currentTab == 'check-in' && 'proceed to checking'}</span>
                        </button>
                    </motion.div>
                  </motion.div>
                }
              </div>

              
            </div>
            
        </div>
    </>
  )
}

export default DynamicSearch