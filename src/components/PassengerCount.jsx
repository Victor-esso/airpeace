
import * as MaterialDesign from "react-icons/md";

import {motion} from "framer-motion"
import animations from "../animateions";






const PassengerCount = ({label = "Label" , subLabel = "sub description" , countValue = 0 , updateValue}) => {

    const add = () => {
        updateValue(countValue + 1)
    }

    const minus = () =>{
        if(countValue){
            updateValue(countValue - 1)
        }
    }



  return (
  
    <motion.div variants={animations.fadeUp} className='horizontal items-center justify-between w-full'>
        <div className='vertical items-start gap-0'>
            <h3 className='font-medium text-[1rem]'>{label}</h3>
            <span className='text-[.8rem]'>{subLabel}</span>
        </div>
        <div className='w-max horizontal items-center justify-between rounded-full min-w-[150px] gap-2 overflow-hidden border-[1px] border-[#F1F1F1]'>
            <button onClick={() => minus()} className={` ${!countValue ? 'opacity-50 cursor-not-allowed' : ' hover:bg-[#F5F5F5] group' } shrink-0 w-[45px] aspect-square grid-center bg-white`}>
                <MaterialDesign.MdRemove size={18} className='group-hover:text-[#E4001C]' />
            </button>
            <span className={`${!countValue && 'opacity-50' } w-max text-center font-semibold`}>{countValue}</span>
            <button onClick={() => add()} className=' shrink-0 w-[45px] aspect-square grid-center bg-white hover:bg-[#F5F5F5] group'>
                <MaterialDesign.MdAdd size={18} className='group-hover:text-[#E4001C]' />
            </button>
        </div>
    </motion.div>

  )
}

export default PassengerCount