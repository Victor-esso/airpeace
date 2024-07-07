import Logo from "../assets/logo.svg";
import MenuIcon from "../assets/menu.svg";
import Nav from "./Nav";
import {GlobalContext} from "../providers/Global"
import { useContext, useState } from "react";
import * as MaterialDesign from "react-icons/md";
import {motion} from "framer-motion"

const Header = () => {
    const {
        windowWidth
    } = useContext(GlobalContext);

    const [navBarVisible , setNavbarVisibility] = useState(false);



  return (
    <header className="h-[88px] w-full fixed top-0 bg-white z-50">
        <div className="container mx-auto h-full horizontal center-h justify-between  px-3 relative">
            <img  src={Logo} alt="Airpeace Logo" />
            <button className="lg:hidden w-[50px] h-[50px] grid place-items-center rounded-md hover:bg-slate-100" onClick={()=>setNavbarVisibility(!navBarVisible)}> {navBarVisible ? <MaterialDesign.MdOutlineClose size={24} />  : <img src={MenuIcon} alt="" />}</button>
            {(windowWidth >= 1024 || (windowWidth <1024 && navBarVisible) ) && <Nav closeNavbar={() => setNavbarVisibility(false)} />}
            
        </div>
    </header>
  )
}

export default Header