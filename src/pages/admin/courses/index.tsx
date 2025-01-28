/* eslint-disable react/no-unescaped-entities */
import ThemedText from "@/utilities/typography"
import AdminPanel from ".."
import { useEffect, useState } from "react"
import { DocumentData } from "firebase/firestore"
import { getCourses, getSkills, getVideos } from "@/query/skills"
import ThemedButton from "@/utilities/button"
import { useRouter } from "next/router"

const CoursesComponent = ()=>{
    const [courses, setCourses] = useState<DocumentData[]>([])
    const [skills, setSkills] = useState<DocumentData[]>([])
    const [videos, setVideos] = useState<DocumentData[]>([])
    const router = useRouter()
    useEffect(()=>{
        const fetchCourses = async()=>{
            const result = await getCourses();
            setCourses(result as DocumentData[])
        }
        const fetchSkills = async()=>{
            const result = await getSkills()
            setSkills(result as DocumentData[]);
        }
        const fetchVideos = async()=>{
            const result = await getVideos();
            setVideos(result as DocumentData[]);
        }
        fetchVideos()
        fetchSkills()
        fetchCourses();
    },[])
    console.log({"skills": skills})
    console.log({"videos" : videos})
    console.log({"courses" : courses})
    return (
        <AdminPanel>
            <div>
                {
                    courses.length > 0  ? <ThemedText>Cours disponibles</ThemedText> : <ThemedText>Aucun cours n'est disponible</ThemedText>
                    
                }
                <div>
                    <ThemedButton onClick={()=>{router.push("/admin/courses/create")}}>Créer un cours</ThemedButton>
                </div>
            </div>
        </AdminPanel>
    )
}

export default CoursesComponent