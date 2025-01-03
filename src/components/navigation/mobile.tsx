import NavItemComponent from "@/utilities/navigation/nav-item"
import ThemedText from "@/utilities/typography"
import clsx from "clsx"
import { useState } from "react"
import { TfiImport, TfiShiftLeft, TfiShiftRight } from "react-icons/tfi";
import { SlClose, SlCompass, SlGraduation, SlGrid, SlHome, SlMenu, SlNotebook, SlPuzzle, SlSettings, SlSpeech } from "react-icons/sl"
import {  signOut, useSession } from "next-auth/react";
import { HiOutlineSearch } from "react-icons/hi";

const MobileNavigation = ()=>{
const [active, setIsActive] = useState(false)
const session  = useSession()
const toggle = ()=>{
    setIsActive(!active)
}
const handleLogout = () => {
    signOut({ callbackUrl: '/auth/login' }); // Redirige l'utilisateur vers la page de login après la déconnexion
  };
    return (
        <>
        <div className="flex flex-col justify-normal">
            <ThemedText variant="heading-2" className="font-bold text-start px-5" color="primary">ULearning</ThemedText>
            <div className="flex justify-between  flex-row items-center p-5 ">
                <SlMenu onClick={()=>{toggle()}} className="cursor-pointer font-bold " size={30}/>
                <div>
                    <form className="flex flex-row justify-between items-center gap-3 ">
                        <input type="search" name="search" placeholder="Rechercher" id="search" className="hover:outline-none focus:outline-none focus:border-primary hover:border-primary  border-slate-200 border-[2px] rounded py-1 px-2 min-w-[200px] text-small-text" />
                        <label htmlFor="search"  className=""></label>
                        <button type="submit"> <HiOutlineSearch size={30} className="p-1 rounded bg-gray-soft" /> </button>
                    </form>
                </div>
            </div>
        </div>
        { <div className={clsx("flex flex-col justify-normal h-full fixed gap-10  py-6  w-[75%] bg-gray-soft top-0 transition-opacity ", active ? "left-0": "left-[-10000]") }>
            <div className="flex flex-row-reverse justify-between px-6 items-center">
                <ThemedText variant="big-title" className="capitalize font-semibold text-center" color="primary">ulearning</ThemedText>
                <SlClose size={30} className="text-gray cursor-pointer" onClick={()=>toggle()}></SlClose>
            </div>
            <div className="flex flex-col justify-normal items-start  gap-3 ">
                <NavItemComponent onClick={()=>{toggle()}} navLink="/" navText="acceuil" ><SlHome size={25}/></NavItemComponent>
                <NavItemComponent onClick={()=>{toggle()}} navLink="/explorer" navText="explorer" ><SlCompass size={25}/></NavItemComponent>
                <NavItemComponent onClick={()=>{toggle()}} navLink="/my-courses" navText="mes cours" ><SlNotebook size={25}/></NavItemComponent>
                <NavItemComponent onClick={()=>{toggle()}} navLink="/skills" navText="compétences" ><SlPuzzle size={25}/></NavItemComponent>
                <NavItemComponent onClick={()=>{toggle()}} navLink="/self-mentoring" navText="self mentoring" ><SlGraduation size={25}/></NavItemComponent>
                {session.status == "unauthenticated" &&
                    <>
                        <NavItemComponent onClick={()=>{toggle()}} navLink="/auth/login" navText="connexion" ><TfiShiftLeft size={25}/></NavItemComponent>
                        <NavItemComponent onClick={()=>{toggle()}} navLink="/auth/register" navText="inscription" ><TfiImport size={25}/></NavItemComponent>
                    </>
                }
                {session.status == "authenticated" &&
                    <>
                        <NavItemComponent onClick={()=>{toggle()}} navLink="/profile/dashboard" navText="tableau de bord" ><SlGrid size={25}/></NavItemComponent>
                        <NavItemComponent onClick={()=>{toggle()}} navLink="/profile/settings" navText="paramètre de compte" ><SlSettings size={25}/></NavItemComponent>
                        <NavItemComponent onClick={()=>{toggle()}} navLink="/profile/projects" navText="projets en cours" ><SlSettings size={25}/></NavItemComponent>
                        <NavItemComponent onClick={handleLogout} navLink="" navText="déconnexion" ><TfiShiftRight size={25}/></NavItemComponent>
                    </>
                }
                <NavItemComponent onClick={()=>{toggle()}} navLink="/about" navText="à propos" ><SlSpeech size={25}/></NavItemComponent>
            </div>
        </div>}
        </>
        
    )
}

export default MobileNavigation