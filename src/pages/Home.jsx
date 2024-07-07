import BgSky from "../assets/sky.png"
import UkLogo from "../assets/uk-icon.svg";


import {GlobalContext} from "../providers/Global"
import * as MaterialDesign from "react-icons/md";
import { useContext, useEffect, useState, useRef  } from "react";

import Certified from "../components/Certified";
import DynamicSearch from "../components/DynamicSearch";
import Holdup from "../components/Holdup";



import {motion , AnimatePresence} from "framer-motion"
import animations from '../animateions';



const Home = () => {
    const {
      windowWidth
  } = useContext(GlobalContext);

  // Collect Submitted Data
  const [submittedData , setSubmittedData] = useState(false);

  const [loading,setLoading] = useState(true);



 useEffect(() => {

    if(submittedData){
      console.log(submittedData)
      setLoading(true);
      setTimeout(()=>{
        setLoading(false);
      },4000)

    }

 },[submittedData])


 const handleBookFlightBtn = () => {
      if(windowWidth >= 1024 ) {return;}
      const element = document.getElementById('bookFlightContainer');
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }

  };



  return (
    <>
      <div className="w-full min-h-lvh relative overflow-x-hidden  overflow-y-visible scrollbar-0 lg:grid place-items-center lg:pb-0 pb-16 bg-[#2763AA] z-[1]" style={{ backgroundImage: `url(${BgSky})` }}>

        <button className="flex flex-row items-center absolute abs-center-x top-[112px] bg-white/10 *:text-white p-[12px] pe-[16px] rounded-full md:w-[400px] w-[90%] justify-between group "> 
          <span className="flex flex-row items-center gap-3">
            <img src={UkLogo} alt="" className="w-[24px]" />
            <div className="flex flex-col md:flex-row items-start text-[13px] md:gap-1">
              <span className="uppercase font-medium">Flying to london ?</span>
              <span>We are at your service</span>
            </div>
          </span>
          < MaterialDesign.MdArrowForward className="transition-all text-[20px] group-hover:text-[24px] opacity-50 group-hover:opacity-100" />
        </button>

        {/* <div className={`absolute h-max w-max header-plane`}>
          <img src={PlaneImage} alt=""  /> 
        </div> */}

        <div className="xl:my-[90px] scrollbar-0 my-auto container flex lg:flex-row lg:justify-between items-center lg:items-center flex-col mt-[150px]  mx-auto py-0">
          {/* Left Side banner */}
          <div className="*:text-white px-6 relative z-[10]">
            <motion.div animate={{x:0,opacity:1,transition:{ease:"easeInOut", duration:.8,delay:.4 , bounce:.5, type: "spring"}}} initial={{x:-50,opacity:0}} className="vertical gap-[16px] lg:text-left sm:text-center text-left">
              <h1 className="text-fraunces w-full italic font-bold xl:text-[72px] lg:text-[64px] text-[48px] leading-[110%]">Fly the air with<br />peace of mind</h1>
              <p className="xl:text-[1.1rem] text-[16px] lg:leading-[24px] tracking-[5%]">A safe, efficient affordable and dependable partner for{windowWidth >= 460 ? <br/> : ' '}your domestic, regional and international flights.</p>
            </motion.div>
            {/* Book Flight Button */}
            <div className=" mt-[31px] w-full flex justify-start sm:justify-center lg:justify-start">
              <motion.button animate={{y:0,opacity:1,transition:{ease:"easeInOut", duration:.5,delay:.7}}} whileTap={{scale:.9}} initial={{y:-50,opacity:0}} onClick={handleBookFlightBtn} className="flex items-center px-[24px] py-[20px] border-[2px] border-white w-max rounded-full uppercase font-semibold gap-[8px] text-[16px] hover:bg-white hover:text-gray-800">
                <MaterialDesign.MdOutlineEditCalendar size={24} />
              book your flight
              </motion.button>
            </div>

            {/* Certification logo Desktop */}
            {windowWidth >= 1024 && 
              <div className=" w-max h-max 3xl:mt-[200px] lg:mt-[130px]">
                <Certified />
              </div>
            }
          </div>


          {/* Right Side search flight */}
            <DynamicSearch handleSubmittedData={setSubmittedData} />
          
          
        </div>


        {/* Certification logo Mobile */}
        {windowWidth < 1024 && <div className="flex items-center w-full justify-center mt-9 px-4 z-[-1] relative"><Certified /></div> }

      </div>
      
      <AnimatePresence>
        { submittedData &&
            <>
              <motion.div variants={{...animations.fadeIn,exit:{...animations.fadeIn.exit,transition:{when:"afterChildren"}}}}  initial="initial" animate="animate" exit="exit"  className="bg-black/[.4] backdrop-blur-[2px] w-full h-[100dvh] fixed top-0 left-0 z-[999999999999999999999999] grid-center px-6 ">
                  {!loading && <Holdup setSubmittedData={setSubmittedData} />}
                    {loading && <>
                      
                        <motion.svg variants={animations.fadeIn} className="svg-calLoader" xmlns="http://www.w3.org/2000/svg" width="230" height="230">
                        <path className="cal-loader__path" d="M86.429 40c63.616-20.04 101.511 25.08 107.265 61.93 6.487 41.54-18.593 76.99-50.6 87.643-59.46 19.791-101.262-23.577-107.142-62.616C29.398 83.441 59.945 48.343 86.43 40z" fill="none" stroke="#0099cc" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="10 10 10 10 10 10 10 432" strokeDashoffset="77"/>
                        <path className="cal-loader__plane" d="M141.493 37.93c-1.087-.927-2.942-2.002-4.32-2.501-2.259-.824-3.252-.955-9.293-1.172-4.017-.146-5.197-.23-5.47-.37-.766-.407-1.526-1.448-7.114-9.773-4.8-7.145-5.344-7.914-6.327-8.976-1.214-1.306-1.396-1.378-3.79-1.473-1.036-.04-2-.043-2.153-.002-.353.1-.87.586-1 .952-.139.399-.076.71.431 2.22.241.72 1.029 3.386 1.742 5.918 1.644 5.844 2.378 8.343 2.863 9.705.206.601.33 1.1.275 1.125-.24.097-10.56 1.066-11.014 1.032a3.532 3.532 0 0 1-1.002-.276l-.487-.246-2.044-2.613c-2.234-2.87-2.228-2.864-3.35-3.309-.717-.287-2.82-.386-3.276-.163-.457.237-.727.644-.737 1.152-.018.39.167.805 1.916 4.373 1.06 2.166 1.964 4.083 1.998 4.27.04.179.004.521-.076.75-.093.228-1.109 2.064-2.269 4.088-1.921 3.34-2.11 3.711-2.123 4.107-.008.25.061.557.168.725.328.512.72.644 1.966.676 1.32.029 2.352-.236 3.05-.762.222-.171 1.275-1.313 2.412-2.611 1.918-2.185 2.048-2.32 2.45-2.505.241-.111.601-.232.82-.271.267-.058 2.213.201 5.912.8 3.036.48 5.525.894 5.518.914 0 .026-.121.306-.27.638-.54 1.198-1.515 3.842-3.35 9.021-1.029 2.913-2.107 5.897-2.4 6.62-.703 1.748-.725 1.833-.594 2.286.137.46.45.833.872 1.012.41.177 3.823.24 4.37.085.852-.25 1.44-.688 2.312-1.724 1.166-1.39 3.169-3.948 6.771-8.661 5.8-7.583 6.561-8.49 7.387-8.702.233-.065 2.828-.056 5.784.011 5.827.138 6.64.09 8.62-.5 2.24-.67 4.035-1.65 5.517-3.016 1.136-1.054 1.135-1.014.207-1.962-.357-.38-.767-.777-.902-.893z" fill="#000033"/>
                        </motion.svg>
                    
                    </>}

                {windowWidth > 500 &&
                  <motion.div initial={{scale:.3}} animate={{scale:1.05}} className="absolute capitalize bg-black/[.2] bottom-10 horizontal px-8 py-2 text-white font-medium rounded-full text-[.8rem] items-center gap-2"><MaterialDesign.MdDataObject size={24} /> check console for submitted date</motion.div>
                }
              </motion.div>
            </>
        }
      </AnimatePresence>

    </>
  )
}

export default Home