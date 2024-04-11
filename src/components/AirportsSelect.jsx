import {useEffect, useRef, useState , useContext} from "react";
import {GlobalContext} from "../providers/Global"

import * as MaterialDesign from "react-icons/md";
import NgIcon from "../assets/ng-icon.svg";

import {airports} from '../data';

import {motion  } from "framer-motion"



const AirportsSelect = ( {handleAirportSelection , flightLocation , selectedFrom ='los' , selectedTo}) => {

    const {
        windowWidth
    } = useContext(GlobalContext);

    const [searchQuery, setSearchQuery] = useState('');
    const [filteredAirports, setFilteredAirports] = useState(airports);
  
    const searchInput = useRef(null);

 

    const handleSearch = (event) => {
        const query = event.target.value.toLowerCase();
        setSearchQuery(query);
        const filtered = airports.filter((airport) =>
        airport.name.toLowerCase().includes(query) ||
        airport.city.toLowerCase().includes(query) ||
        airport.code.toLowerCase().includes(query)
        );
        setFilteredAirports(filtered);
    };

    useEffect(()=>{
        (windowWidth > 500 && searchInput.current.focus());
    },[windowWidth])

    const containerVariants = {
        initial: {opacity: .5 , scale:1, y:-50},
        animate: {opacity: 1 ,scale:1 ,y:0},
        exit:{opacity: 0 , scale:1 , y:-50 },
      };
    const containerInnerVariants = {
        animate: {
        transition: {
          type: "spring",
          bounce: 0,
          duration: 0.7,
          delayChildren: 0.2,
          staggerChildren: 0.05
        }},

        initial: false,

        exit:false,
      };

        
  return (
            <motion.div variants={containerVariants}  initial="initial" animate="animate" exit="exit" className='absolute left-0 top-0 w-full z-[999999999] px-[16px] py-[10px]'>
                <div className=' rounded-[24px] bg-white shadow-lg relative  sm:px-6 px-4 sm:pb-6 pb-4'>
                {/* Search Section  */}
                <div className='sm:pt-6 pt-4 w-full'>
                    <div className='vertical items-start w-full'>
                        <label htmlFor="searchInput" className='text-[15px] font-normal capitalize'>Select {flightLocation == "departure" ? 'departure' : 'destination'}</label>
                        <div className='w-full relative'>
                            <input type="text" ref={searchInput} value={searchQuery} onChange={handleSearch} className='pe-[24px] w-full focus:outline-0   pb-1 text-xl font-normal border-b-[1px] border-gray-200 focus-visible:border-[#E4001C] peer' id='searchInput'/>
                            <MaterialDesign.MdOutlineSearch size={24} className="absolute abs-center-y right-0 peer-focus:text-[#E4001C]" />
                        </div>
                    </div>
                </div>

                {/* Current Search label */}
                <span className=' text-[15px] font-medium py-3 horizontal items-center gap-1'>
                    <img src={NgIcon} alt="" />
                    <span>Nigeria</span>
                </span>

                {/* Search list */}
                <motion.div variants={containerInnerVariants} className=' h-max max-h-[350px] overflow-y-scroll scrollbar-1 vertical items-start gap-3 drop-down-divider'>
                    {filteredAirports.map((airport , index) => (

                        <AirportButton airport={airport} selectedFrom={selectedFrom} selectedTo={selectedTo} flightLocation={flightLocation} index={index} handleAirportSelection={handleAirportSelection} key={index} />

                    ))} 
                </motion.div>
                </div>
            </motion.div>
  )
}


const AirportButton = ({ airport , selectedFrom , selectedTo , flightLocation , handleAirportSelection, index}) => {

    let eitherFromTo = ((selectedFrom && selectedFrom.code == airport.code) || (selectedTo && selectedTo.code == airport.code));

    let isFrom = (selectedFrom && selectedFrom.code == airport.code);
    let isTo = (selectedTo && selectedTo.code == airport.code);

    const buttonVariants = {
        animate: {y:0,opacity:1 ,transition: { type: "spring", stiffness: 300, damping: 24 }},
        initial: {y:50,opacity:0 },
        exit:{y:50,opacity:0,transition: { type: "spring", stiffness: 300, damping: 24 }},
      };

    return (
        <>
            <motion.button key={index} whileTap={{scale:.95}} variants={buttonVariants} onClick={() => (eitherFromTo ? '' : handleAirportSelection(airport))} className={`w-full vertical items-start gap-[3px]  px-3 py-3 rounded-xl ${eitherFromTo ? 'cursor-not-allowed ' : 'hover:bg-[#F5F5F5]'} relative`}>
                <div className={`horizontal gap-[3px] items-center ${eitherFromTo && 'opacity-30 '}`}>
                    <span className=" sm:text-[20px] text-[18px]">{airport.city}</span>
                    <span className=" sm:text-[20px] text-[18px] text-[#E4001C]">{airport.code}</span>
                </div>
                <div className={`horizontal items-center relative ${eitherFromTo && 'opacity-30'}`}>
                    {flightLocation == "departure" ? <MaterialDesign.MdFlightTakeoff size={16} /> : <MaterialDesign.MdFlightLand size={16} />}
                    <span className="text-left sm:text-[12px] text-[10px] abs-center-y text-[#757575] w-max absolute left-[20px]">{airport.name}</span>
                </div>
                {eitherFromTo && 
                    <span className={`absolute right-[10px] top-[10px] ${isFrom ? 'text-emerald-700 bg-emerald-100' : ' text-[#E4001C] bg-rose-100'}   px-3 py-1 text-[.7rem] gap-1 horizontal items-center rounded-lg font-medium`}>
                        {isFrom && 
                            <>
                                <MaterialDesign.MdFlightTakeoff size={12} />
                                <span>Departure</span>
                            </>
                        }
                        {isTo && 
                             <>
                             <MaterialDesign.MdFlightLand size={12} />
                             <span>Destination</span>
                            </>
                        }
                    </span>
                }
            </motion.button>
        </>
    )

    
}



export default AirportsSelect