
import { useEffect, useState } from 'react';
import * as MaterialDesign from "react-icons/md";
import { getMonthData , isValidDate , getMonthName , getFormattedDate , isDateBetween , isDateBefore , getTodayDate } from '../Functions';

import {motion} from "framer-motion"
import animations from '../animateions';



const DatePicker = ({selectedDates = [] , isSingleDate = true , handleDatePicked}) => {

    const [activedates , setActiveDates ] = useState(null);
    const [currentCalendar , setCurrentCalendar] = useState(null);


    useEffect(()=>{
        if(!activedates){
            setActiveDates((Array.isArray(selectedDates) && selectedDates.length > 0) ? selectedDates : [])
        }

        if(!currentCalendar){
            let selectedStartDate = new Date();
            if(Array.isArray(selectedDates) && selectedDates.length && isValidDate(selectedDates[0])){
                selectedStartDate = new Date(selectedDates[0]);
            }

            setCurrentCalendar({
                month: selectedStartDate.getMonth(),
                year:selectedStartDate.getFullYear()
            })
        }

        


    },[])

    const nextMonth = () =>{
        if(currentCalendar){
            let currentMonth = currentCalendar.month;
            let currentYear = currentCalendar.year;
            let nextMonth ;
            let nextYear ;

            if(currentMonth == 11){
                nextMonth = 0
                nextYear = currentYear + 1;
            }else{
                nextMonth = currentMonth + 1;
                nextYear = currentYear;
            }

            setCurrentCalendar({
                month: nextMonth,
                year:nextYear
            })
        }

        return false;
    }
    const prevMonth = () =>{
        if(currentCalendar){
            let currentMonth = currentCalendar.month;
            let currentYear = currentCalendar.year;
            let nextMonth ;
            let nextYear ;

            if(currentMonth == 0){
                nextMonth = 11
                nextYear = currentYear - 1;
            }else{
                nextMonth = currentMonth - 1;
                nextYear = currentYear;
            }

            setCurrentCalendar({
                month: nextMonth,
                year:nextYear
            })
        }

        return false;
    }

    let monthData = getMonthData((currentCalendar ? currentCalendar.year : new Date().getFullYear()),(currentCalendar ? currentCalendar.month : new Date().getMonth()));

    const daysOfTheWeek = ['Su' , 'Mo' ,'Tu', 'We' , 'Th' ,'Fr', 'Sa'];

    const handleClickedCell = (day) =>{
        let currentDates = [...activedates];

        if((currentDates.length == 1 && day.formattedDate == currentDates[0] && !isSingleDate)){
            setActiveDates([])
            return;
        }
        if((currentDates.length == 2 && day.formattedDate == currentDates[1])){
            currentDates.pop()
            setActiveDates(currentDates)
            return;
        }

        if((currentDates.length == 2 && !isSingleDate) || (currentDates.length >= 1 && isSingleDate)){
            currentDates = [];
        }

        if(currentDates.length && day.formattedDate != currentDates[0]){
            currentDates[1] = day.formattedDate;
        }else{
            currentDates[0] = day.formattedDate
        }
        
        setActiveDates(currentDates) 
    }

    const handleSubmit = () => {
        handleDatePicked(activedates);
    }


    const containerVariants = {
        initial: {opacity: .5 , scale:.8 },
        animate: {opacity: 1 ,scale:1 , transition:{delayChildren: 0.2,staggerChildren: 0.05}},
        exit:{opacity: 0 , scale:.8},
    };
    const handleDrag =(event , info) =>{
        if (info.velocity.x > 0) {

            //console.log("Drag is to the right",info);
            (info.offset.x > 150 && prevMonth ())
            
        } else if (info.velocity.x < 0) {
            // console.log("Drag is to the left");
            (info.offset.x < -150 && nextMonth ())
        } else {
            console.log("No horizontal drag");
        }
    }





  return (
    <motion.div variants={containerVariants} initial="initial" animate="animate" exit="exit" className='absolute w-full z-[9999999999] px-[16px] py-[10px] left-0 top-[-110px]'>
        <div className='bg-white w-full xl:p-8 xl:pb-20 sm:p-6 sm:pb-20  pb-20 p-5 rounded-3xl overflow-hidden'>

            <motion.div variants={animations.fadeUp} className='w-full relative'>
                    <span className='absolute abs-center-xy w-max horizontal *:font-medium gap-1 xl:text-[1.05rem]'><span>{currentCalendar && getMonthName(currentCalendar.month)}</span><span className='text-[#E4001C]'>{currentCalendar &&currentCalendar.year}</span></span>
                    <div className='w-full horizontal items-center justify-between'>
                        <motion.button  whileTap={{scale:.9}} onClick={() => prevMonth()} className='w-[45px] aspect-square grid-center rounded-lg hover:text-[#E4001C] hover:bg-gray-100'><MaterialDesign.MdChevronLeft  size={24}/></motion.button>
                        <motion.button  whileTap={{scale:.9}}  onClick={() => nextMonth()} className='w-[45px] aspect-square grid-center rounded-lg hover:text-[#E4001C] hover:bg-gray-100'><MaterialDesign.MdChevronRight size={24} /></motion.button>
                    </div>

            </motion.div>
            
            <motion.div variants={animations.fadeDown} className='w-full h-max overflow-hidden'>
                <motion.div  drag="x" dragConstraints={{left:0 , right:0}} onDragEnd={handleDrag} className=' grid grid-cols-7 *:font-medium *:flex-center *:sm:aspect-[1/.9] *:aspect-[1/.93] xl:text-[.9rem] md:text-[.8rem]  text-[.8rem]'>
                    {daysOfTheWeek.map((name , i)=> <div className='!font-semibold !text-[.8rem] text-[#E4001C]' key={i}>{name}</div>)}

                    {monthData.map((day , index) => (

                        <Cell key={index} day={day} currentCalendar={currentCalendar} activedates={activedates}  handleClickedCell={handleClickedCell} isSingleDate={isSingleDate} />
    
                    ))}
                </motion.div>
            </motion.div>

            <div className='horizontal justify-center items-center absolute abs-center-x bottom-7 '>
                
                {(activedates && activedates.length == 0) && <motion.span variants={animations.fadeUp} className='horizontal items-center text-[1.3rem] font-medium gap-2 w-max'><span>Departure Date</span> <MaterialDesign.MdFlightTakeoff size={24} className="text-[#E4001C]" /></motion.span>}
                {(!isSingleDate && activedates && activedates.length == 1) && <motion.span variants={animations.fadeUp} className='horizontal items-center text-[1.3rem] font-medium gap-2'><span>Return Date</span> <MaterialDesign.MdFlightLand size={24} className="text-[#E4001C]" /></motion.span>}



                {((isSingleDate && activedates && activedates.length >= 1) || (!isSingleDate && activedates && activedates.length == 2)) &&
                    
                    <motion.button variants={animations.zoomIn} whileTap={{scale:.9}}  onClick={() => handleSubmit()} className='horizontal border-[1px] border-black items-center gap-2 font-medium hover:bg-black hover:text-white sm:text-black text-white bg-black sm:bg-white px-4 py-2 text-[18px] rounded-full'>
                        <MaterialDesign.MdEventAvailable  size={20} />
                        <span className='text-[14px] uppercase font-semibold'>Continue</span>
                    </motion.button>
                }
            </div>

        </div>
    </motion.div>
  )
}



const Cell = ({ day , currentCalendar , activedates , handleClickedCell , isSingleDate}) => {
    if(!day || !currentCalendar){return;}

    let isActiveDay = day.monthIndex == currentCalendar.month;
    let isReturnDate = activedates && activedates.length == 2 && getFormattedDate(activedates[1]) == day.formattedDate;
    let isDepartureDate = activedates && activedates.length && getFormattedDate(activedates[0]) == day.formattedDate;
    let isReturnDeparture = isReturnDate || isDepartureDate;
    let shouldHover = true;
    let shouldClick = true;

    let today = getTodayDate();

    if(isReturnDeparture){
        shouldHover = false
    }

    let highlight = false;

    if(!isSingleDate && activedates.length == 2 && !isReturnDate && !isDepartureDate){
        highlight = isDateBetween(day.formattedDate , activedates[0] , activedates[1] )
    }

    if((isDateBefore(day.formattedDate , activedates[0]) && activedates && activedates.length == 1 && !isSingleDate) || isDateBefore(day.formattedDate,today)){
        shouldClick = false;
    }

    
    return (

        <>
            {isActiveDay ? 
            
            <motion.button whileTap={{scale:.9}} onClick={() => shouldClick && handleClickedCell(day)} 
            className={`
                ${shouldHover && !highlight  && shouldClick && 'hover:bg-pink-50 hover:text-[#E4001C]'} 
                ${((isReturnDeparture && !isSingleDate) || (isSingleDate && isDepartureDate)) && 'bg-[#E4001C] text-white'} 
                ${isDepartureDate && isSingleDate && 'rounded-full'} 
                ${isDepartureDate && !isSingleDate && 'rounded-l-full'} 
                ${isReturnDate && !isSingleDate && 'rounded-r-full'} 
                ${highlight && 'bg-pink-50 text-black'} 
                ${highlight && 'bg-pink-50 text-black'} 
                ${!shouldClick && 'opacity-40 cursor-not-allowed'} 
                `}>{day.dayNumber}</motion.button>
        :
        
            <div></div>
        
        }
        </>
 
    )
}








export default DatePicker