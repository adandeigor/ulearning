import ThemedText from "@/utilities/typography"
import AdminPanel from ".."
import ThemedButton from "@/utilities/button"
import { FaPenToSquare } from "react-icons/fa6";
import { SlGrid } from "react-icons/sl";

import CategoryCard from "@/utilities/admin/category-card";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { DocumentData } from "firebase/firestore";
import { getCategory } from "@/query/skills";
const CategoryComponent = ()=>{
    const [data, setData] = useState<[DocumentData]>()

    useEffect(()=>{
        const fetchCategory = async()=>{
            const result = await getCategory()
            setData(result as [DocumentData])
        }
        fetchCategory()
    },[])
    const router = useRouter()
    return (
        <AdminPanel>
            <div className="flex flex-col justify-start items-start gap-5">
                <div className="flex flex-row justify-between items-center gap-[100px] ">
                    <ThemedText color="gray" variant="title" >Catégories</ThemedText>
                    <ThemedButton onClick={()=> router.push("/admin/category/create")} icon={true} iconPath={<FaPenToSquare size={20}/>} color="gray" variant="outline">Créer une catégorie</ThemedButton>
                </div>                
                <div className="flex flex-row items-center gap-2">
                    <SlGrid size={20} color="gray"/>
                    <ThemedText variant="title" color="gray">Toutes les catégories</ThemedText>
                </div>
                <div className="flex flex-row justify-normal items-start gap-10">
                    <div className="grid grid-cols-2 gap-10" >
                        {data && data.map((item, index) => (
                            <CategoryCard key={index} id={item.id} name={item.name} description={item.description} />
                        ))}
                    </div>
                    <div className="">
                        <div className="px-10 w-full py-5 shadow bg-shade1 rounded-lg">
                            <ThemedText color="white">Nombre de catégories : {data?.length}</ThemedText>
                        </div>
                    </div>
                </div>
            </div>
        </AdminPanel>
    )
}

export default CategoryComponent