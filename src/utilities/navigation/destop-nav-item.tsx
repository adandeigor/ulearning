import Link from "next/link"
import ThemedText from "../typography"
import clsx from "clsx"
import { useRouter } from "next/router"

interface Props{
    navText: string
    navLink: string
}
const DesktopNavItem = ({navLink, navText}:Props)=>{
    const router = useRouter()
    return (
        <>
            <Link href={navLink} className="flex flex-col justify-center items-center gap-3 text-dark hover:text-primary">
                <ThemedText variant="caption" color="dark" className={clsx("capitalize hover:text-primary font-semibold", router.pathname == navLink && "text-primary")} >{navText}</ThemedText>
            </Link>
        </>
    )
}

export default DesktopNavItem