import DesktopNavigation from "@/components/navigation/desktop";
import MobileNavigation from "@/components/navigation/mobile";
import useWindowWidth from "./windowSize";
import { useEffect, useState } from "react";
interface Props{
    children:React.ReactNode
}
const Layout = ({children}:Props)=>{
    const [isWideScreen, setIsWideScreen] = useState(false);
   const width = useWindowWidth()
    useEffect(() => {
        setIsWideScreen(width > 1453); 
      }, [width]);
    return (
        <>
            {
                isWideScreen ? <DesktopNavigation></DesktopNavigation> : <MobileNavigation></MobileNavigation> 
            }
            <div className="max-w-7xl md:mx-auto mx-5">
                {children}
            </div>
        </>
    )
}

export default Layout