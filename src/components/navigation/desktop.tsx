import DesktopNavItem from "@/utilities/navigation/destop-nav-item";
import ThemedText from "@/utilities/typography";
import { signOut, useSession } from "next-auth/react";
import { useState } from "react";
import { HiOutlineSearch } from "react-icons/hi";

const DesktopNavigation = ()=>{
    const session = useSession()
    const [view, setIsView]=useState(false)
    const handleLogout = () => {
        signOut({ callbackUrl: '/auth/login' }); // Redirige l'utilisateur vers la page de login après la déconnexion
      };
    return (
        <>
            <div className="flex flex-row justify-between gap-5 items-center px-[50px] py-5 ">
                <ThemedText  color="primary" variant="heading-2" weight="bold" className=" capitalize ">ulearning</ThemedText>
                <div className="flex flex-row justify-between gap-10 items-center">
                    <DesktopNavItem navLink="/" navText="acceuil"></DesktopNavItem>
                    <DesktopNavItem navLink="/explorer" navText="explorer"></DesktopNavItem>
                    <DesktopNavItem navLink="/my-courses" navText="mes cours"></DesktopNavItem>
                    <DesktopNavItem navLink="/skills" navText="compétences"></DesktopNavItem>
                    <DesktopNavItem navLink="/self-mentoring" navText="self mentoring"></DesktopNavItem>
                    <DesktopNavItem navLink="/about" navText="à propos"></DesktopNavItem>
                    {session.status == "unauthenticated" &&
                        <div className="flex flex-row justify-between items-center gap-10">
                            <DesktopNavItem navLink="/auth/login" navText="connexion"></DesktopNavItem>
                            <DesktopNavItem navLink="/auth/register" navText="inscription"></DesktopNavItem>
                        </div>
                    }
                    {session.status=="authenticated" && 
                    <div className="relative">
                        <button onClick={()=>{setIsView(!view)}} className="relative"><DesktopNavItem navLink="" navText="Profil"></DesktopNavItem></button>
                        { view && <div className="fixed flex my-3 flex-col justify-center items-center gap-1 bg-slate-200 rounded-lg">
                            <div onClick={()=>{setIsView(!view)}} className="w-full px-4 py-2 hover:rounded-lg hover:bg-slate-300 focus:bg-slate-300"><DesktopNavItem navLink="/profile/dashboard" navText="tableau de bord"></DesktopNavItem></div>
                            <div onClick={()=>{setIsView(!view)}} className="w-full px-4 py-2 hover:rounded-lg hover:bg-slate-300 focus:bg-slate-300"><DesktopNavItem navLink="/profile/projects" navText="projets en cours"></DesktopNavItem></div>
                            <div onClick={()=>{setIsView(!view)}} className="w-full px-4 py-2 hover:rounded-lg hover:bg-slate-300 focus:bg-slate-300"><DesktopNavItem navLink="/profile/settings" navText="paramètres du compte"></DesktopNavItem></div>
                            <div  className="w-full px-4 py-2 hover:rounded-lg hover:bg-slate-300 focus:bg-slate-300" onClick={handleLogout}><DesktopNavItem navLink="" navText="déconnexion"></DesktopNavItem></div>
                        </div>}
                    </div>
                    }
                </div>
                <div>
                    <form className="flex flex-rpw justify-between items-center gap-3 ">
                        <input type="search" name="search" placeholder="Rechercher" id="search" className="hover:outline-none focus:outline-none focus:border-primary hover:border-primary  border-slate-200 border-[2px] rounded py-1 px-2 min-w-[200px] text-small-text" />
                        <label htmlFor="search"  className=""></label>
                        <button type="submit"> <HiOutlineSearch size={30} className="p-1 rounded bg-gray-soft" /> </button>
                    </form>
                </div>
            </div>
        </>
    )
}

export  default DesktopNavigation