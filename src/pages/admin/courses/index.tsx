/* eslint-disable react/no-unescaped-entities */
import ThemedText from "@/utilities/typography"
import AdminPanel from ".."
import { useEffect, useState } from "react"
import { DocumentData } from "firebase/firestore"
import { getCourses, getSkills, getVideos } from "@/query/skills"

const CoursesComponent = ()=>{
    const [courses, setCourses] = useState<DocumentData[]>([])
    const [skills, setSkills] = useState<DocumentData[]>([])
    const [videos, setVideos] = useState<DocumentData[]>([])
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
    console.log(skills)
    console.log(videos)
    return (
        <AdminPanel>
            <div>
                {
                    courses.length > 0  ? <ThemedText>Cours disponibles</ThemedText> : <ThemedText>Aucun cours n'est disponible</ThemedText>
                }
            </div>
        </AdminPanel>
    )
}

export default CoursesComponent