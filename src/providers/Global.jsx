import { createContext, useState, useEffect } from 'react'

const GlobalContext = createContext();

const Global = ({children}) => {
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        };

        window.addEventListener('resize', handleResize);

        return () => {
        window.removeEventListener('resize', handleResize);
        };
    }, []);


  return (
    <GlobalContext.Provider value={{windowWidth , }}>
        {children}
    </GlobalContext.Provider>
  )
}

export default Global
export {GlobalContext}