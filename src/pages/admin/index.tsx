import NavItemComponent from "@/utilities/navigation/nav-item"
import { BiCategoryAlt } from "react-icons/bi";
import { SiHyperskill } from "react-icons/si";
import { VscBook } from "react-icons/vsc";
import { MdPeopleAlt } from "react-icons/md";
import { FaProjectDiagram } from "react-icons/fa";
import { GiTrophyCup } from "react-icons/gi";
import { PiCertificate } from "react-icons/pi";
import { FaTelegramPlane } from "react-icons/fa";
import { GrDocumentTest } from "react-icons/gr";
import { FaFileVideo } from "react-icons/fa6";
import ThemedText from "@/utilities/typography";
interface Props{
    children: React.ReactNode
}
const AdminPanel = ({children}:Props)=>{
    return (
         <>
            <div className="shadow-lg  rounded-2xl w-full shadow-silver flex flex-row">
                <div className="min-w-[20%] min-h-[600px] py-5 shadow shadow-silver  flex flex-col justify-around items-center">
                    <ThemedText className="text-center" color="gray" variant="title">Admin Panel</ThemedText>
                    <NavItemComponent navLink="/admin/category" navText="Catégories"><BiCategoryAlt /></NavItemComponent>
                    <NavItemComponent navLink="/admin/skill" navText="Compétences"><SiHyperskill /></NavItemComponent>
                    <NavItemComponent navLink="/admin/courses" navText="Cours"><VscBook /></NavItemComponent>
                    <NavItemComponent navLink="/admin/videos" navText="Vidéos"><FaFileVideo /></NavItemComponent>
                    <NavItemComponent navLink="/admin/users" navText="Utilisateurs"><MdPeopleAlt /></NavItemComponent>
                    <NavItemComponent navLink="/admin/projects" navText="Projets"><FaProjectDiagram /></NavItemComponent>
                    <NavItemComponent navLink="/admin/challenges" navText="Challenges"><GiTrophyCup /></NavItemComponent>
                    <NavItemComponent navLink="/admin/link" navText="Liens télégramme"><FaTelegramPlane /></NavItemComponent>
                    <NavItemComponent navLink="/admin/certification" navText="Certification"><PiCertificate /></NavItemComponent>
                    <NavItemComponent navLink="/admin/tests" navText="Tests"><GrDocumentTest /></NavItemComponent>
                </div>
                <div className="p-5 overflow-y-auto  max-h-[600px] scrollbar-hide"
                style={{
                    scrollbarWidth: "none", /* Firefox */
                    msOverflowStyle: "none", /* IE et Edge */
                  }}
                >
                    {children}
                </div>
            </div>
         </>
    )
}

export default AdminPanel