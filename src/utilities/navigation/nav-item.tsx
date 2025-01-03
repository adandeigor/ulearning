import clsx from "clsx"
import Link from "next/link"
import { useRouter } from "next/router"

interface NavItemProps{
    navText: string
    navLink: string
    children: React.ReactNode
    onClick? : () => void
}
const NavItemComponent = ({children, navText, navLink, onClick}:NavItemProps)=>{
    const router = useRouter()
    return (
        <Link href={navLink} onClick={onClick} className={clsx("flex flex-row justify-start items-center gap-3 text-gray hover:text-white hover:bg-primary px-10 w-full py-3 transition-colors", router.pathname==navLink && "bg-primary text-white")}>
            {children}
            <p  className="capitalize text-small-text font-medium">{navText}</p>
        </Link>
    )
}

export default NavItemComponent