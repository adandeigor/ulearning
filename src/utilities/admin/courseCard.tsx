import { motion } from "framer-motion";
import ThemedText from "../typography"
import { useRouter } from "next/router";
interface CoursesCardType{
    id:string
    name: string
    description : string
    level: string
    skillName : string
}
const CoursesCard = ({id, name, description, level, skillName}:CoursesCardType)=>{
    const router = useRouter()
    return (
        <>
            <motion.div
                key={id}
                className="p-4  rounded-lg shadow-lg hover:shadow-primary hover:shadow-sm flex flex-col justify-normal gap-3 cursor-pointer"
                whileHover={{ scale: 1.05 }}
                transition={{ type: 'spring', stiffness: 300 }}
                onClick={()=>{router.push(`/admin/courses/view?id=${id}`)}}
              >
                <ThemedText variant="title" color="dark" weight="bold">
                  {name}
                </ThemedText>
                <ThemedText variant="small-text" color="gray">
                  {description}
                </ThemedText>
                <ThemedText variant="small-text" color="primary">
                  Niveau : {level}
                </ThemedText>
                <div className=" flex flex-row items-end justify-end">
                    <ThemedText variant="small-text" color="silver" className="bg-gray text-center py-1 rounded px-1">
                        {skillName}
                    </ThemedText>
                </div>
              </motion.div>
        </>
    )
}

export default CoursesCard