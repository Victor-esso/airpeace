import victorPhoto from "../assets/victor.jpg";
import leyePhoto from "../assets/leye.jpg";

import * as MaterialDesign from "react-icons/md";
import {motion} from "framer-motion"
import animations from '../animateions';



const Holdup = ({setSubmittedData = false}) => {
    
  return (
    <motion.div variants={{...animations.zoomIn,exit:{...animations.zoomIn.exit , transition:{when:"afterChildren"}}}} className="p-4 bg-white rounded-2xl w-full max-w-[400px] h-[400px] min-h-[500px] grid-center pb-[100px] relative overflow-hidden">
        <motion.div variants={{animate:{transition:{delayChildren:.3,staggerChildren:.05}}}} className="w-fill vertical text-center items-center">
            <MaterialDesign.MdInfo size={60}/>
            <motion.h2 variants={animations.fadeUp} className="text-fraunces text-4xl italic font-bold mb-5">Hol’up!</motion.h2>
            <motion.p variants={animations.fadeUp} className="text-[#8CA3BA]">This is not the official site for AirPeace, visit <span className="text-black">flyairpeace.com</span> to get started</motion.p>
            <motion.div variants={animations.fadeUp} className='py-5 flex-center gap-2'>
                    <motion.button whileTap={{scale:.9}} onClick={() =>(setSubmittedData) && setSubmittedData(null)} className="horizontal items-center gap-[4px] px-4 py-2 rounded-full hover:bg-[#F5F5F5] text-gray-600  group ">
                        <MaterialDesign.MdCancel size={24} className="group-hover:text-[#E4001C]"/>
                        <span className="text-[11px] font-semibold uppercase group-hover:text-black">Close</span>
                    </motion.button>
                    <motion.a whileTap={{scale:.9}} href="https://flyairpeace.com/" target="_blank" className="horizontal items-center gap-[8px] px-6 py-2 rounded-full border-[1px] border-black hover:bg-black group  sm:text-black text-white bg-black sm:bg-white">
                        <MaterialDesign.MdArrowOutward size={24} className="group-hover:text-white"/>
                        <span className="text-[14px] font-semibold uppercase group-hover:text-white">Visit</span>
                    </motion.a>
            </motion.div>

            <motion.div variants={animations.fadeUp} className="absolute w-full px-4 pb-4 bottom-0 left-0 horizontal items-center justify-between">
                <motion.a whileTap={{scale:.9}} href="https://twitter.com/_vick_thor" target="_black" className="horizontal items-center gap-2 px-3 hover:bg-[#F7F7F7] py-2 rounded-xl">
                    <img src={victorPhoto} className="w-[40px] aspect-square object-cover rounded-full" />
                    <div className="text-left">
                        <h3 className="font-semibold text-[.9rem] mb-[-.6rem] capitalize">victor esso</h3>
                        <span className="text-[.7rem] text-gray-800/[.8]">Project Developer</span>
                    </div>
                </motion.a>
                <motion.a whileTap={{scale:.9}} href="https://x.com/leyeConnect" target="_blank" className="horizontal items-center gap-2 px-3 hover:bg-[#F7F7F7] py-2 rounded-xl">
                    <div className="text-right">
                        <h3 className="font-semibold text-[.9rem] mb-[-.6rem] uppercase">leye</h3>
                        <span className="text-[.7rem] text-gray-800/[.8]">Designer</span>
                    </div>
                    <img src={leyePhoto} className="w-[40px] aspect-square object-cover rounded-full" />
                </motion.a>
            </motion.div>
        </motion.div>
    </motion.div>
  )
}

export default Holdup