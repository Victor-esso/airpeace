
import * as MaterialDesign from "react-icons/md";
import * as BoxIcon from "react-icons/bi";

import animations from "../animateions";
import {motion} from "framer-motion"



const FlightClassOption = ({ handleClick , optionValue='' , selectedValue = ''}) => {





    let isSelected = optionValue.trim().toLowerCase() == selectedValue.trim().toLowerCase();











  return (
    <motion.button variants={animations.fadeRight} whileTap={{scale:.95}} onClick={()=>handleClick(optionValue)} className='horizontal items-center justify-between w-full py-4  px-3 rounded-xl hover:bg-[#F5F5F5]'>
        <div className='horizontal items-center gap-2 capitalize font-medium'><MaterialDesign.MdOutlineFlightClass size={20} className={`${isSelected ? 'text-[#E4001C]' : ''}`} />{optionValue}</div>
        <div className={`w-[24px] aspect-square rounded-full border-[2px] ${isSelected ? 'border-[#E4001C] bg-[#E4001C]' : ''} relative`}>
            {isSelected && <MaterialDesign.MdCheck size={20} className='text-white absolute abs-center-xy' />}
        </div>
    </motion.button>
  )
}

export default FlightClassOption