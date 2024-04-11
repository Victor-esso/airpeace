import { NavLink } from "react-router-dom";
import * as MaterialDesign from "react-icons/md";
import {motion} from "framer-motion"
import animations from '../animateions';

const Nav = ({closeNavbar}) => {
  return (
    <motion.nav variants={false} initial="initial" animate="animate" exit="exit" className="header-nav">
        <motion.ul variants={{animate:{transition:{staggerChildren:.05,delayChildren:.2}}}} className="vertical lg:horizontal center-h lg:gap-3 ">
            <motion.li variants={animations.fadeDown}><NavLink to="/" onClick={closeNavbar} >Home</NavLink></motion.li>
            <motion.li variants={animations.fadeDown}><NavLink to="advantage" onClick={closeNavbar}>Peace Advantage</NavLink></motion.li>
            <motion.li variants={animations.fadeDown}><NavLink to="career" onClick={closeNavbar}>Careers</NavLink></motion.li>
            <motion.li variants={animations.fadeDown}><NavLink to="magazine" onClick={closeNavbar}>Inflight Magazine</NavLink></motion.li>
            <motion.li variants={animations.fadeDown}>
              <a href="#">more <MaterialDesign.MdOutlineChevronLeft size={20}/></a>
              <ul>
                <li><NavLink to="contact-us" onClick={closeNavbar}>Contact Us</NavLink></li>
                <li><NavLink to="partner" onClick={closeNavbar}>Partner</NavLink></li>
              </ul>
            </motion.li>
            <motion.li variants={animations.fadeDown}>
              <NavLink to="/login" onClick={closeNavbar}>Login
                <svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0.5 14.3104V11.9771C0.5 11.5048 0.621528 11.0708 0.864583 10.675C1.10764 10.2791 1.43056 9.97705 1.83333 9.76872C2.69444 9.33816 3.56944 9.01524 4.45833 8.79997C5.34722 8.58469 6.25 8.47705 7.16667 8.47705C7.44444 8.47705 7.72222 8.48747 8 8.5083C8.27778 8.52913 8.55556 8.56038 8.83333 8.60205C8.77778 9.40761 8.92361 10.168 9.27083 10.8833C9.61806 11.5986 10.125 12.1854 10.7917 12.6437V14.3104H0.5ZM13.8333 16.8104L12.5833 15.5604V11.6854C11.9722 11.5048 11.4722 11.1611 11.0833 10.6541C10.6944 10.1472 10.5 9.56038 10.5 8.89372C10.5 8.08816 10.7847 7.40066 11.3542 6.83122C11.9236 6.26177 12.6111 5.97705 13.4167 5.97705C14.2222 5.97705 14.9097 6.26177 15.4792 6.83122C16.0486 7.40066 16.3333 8.08816 16.3333 8.89372C16.3333 9.51872 16.1563 10.0743 15.8021 10.5604C15.4479 11.0465 15 11.3937 14.4583 11.6021L15.5 12.6437L14.25 13.8937L15.5 15.1437L13.8333 16.8104ZM7.16667 7.64372C6.25 7.64372 5.46528 7.31733 4.8125 6.66455C4.15972 6.01177 3.83333 5.22705 3.83333 4.31038C3.83333 3.39372 4.15972 2.609 4.8125 1.95622C5.46528 1.30344 6.25 0.977051 7.16667 0.977051C8.08333 0.977051 8.86806 1.30344 9.52083 1.95622C10.1736 2.609 10.5 3.39372 10.5 4.31038C10.5 5.22705 10.1736 6.01177 9.52083 6.66455C8.86806 7.31733 8.08333 7.64372 7.16667 7.64372ZM13.4167 9.31038C13.6528 9.31038 13.8507 9.23052 14.0104 9.0708C14.1701 8.91108 14.25 8.71316 14.25 8.47705C14.25 8.24094 14.1701 8.04302 14.0104 7.8833C13.8507 7.72358 13.6528 7.64372 13.4167 7.64372C13.1806 7.64372 12.9826 7.72358 12.8229 7.8833C12.6632 8.04302 12.5833 8.24094 12.5833 8.47705C12.5833 8.71316 12.6632 8.91108 12.8229 9.0708C12.9826 9.23052 13.1806 9.31038 13.4167 9.31038Z" fill="currentColor"/>
                </svg>
              </NavLink>
            </motion.li>
        </motion.ul>
    </motion.nav>
  )
}

export default Nav