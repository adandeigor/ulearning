/* eslint-disable react/no-unescaped-entities */
import { useRouter } from "next/router"
import AdminPanel from ".."
import { useEffect, useState } from "react"
import { DocumentData } from "firebase/firestore"
import { getOnceCategory, updateCategory } from "@/query/skills"
import ThemedText from "@/utilities/typography"
import ThemedButton from "@/utilities/button"
import ThemedInputs from "@/utilities/forms/input"
import ThemedTextArea from "@/utilities/forms/textarea"
import { FieldValues, useForm } from "react-hook-form"
import { HiArrowLeft } from "react-icons/hi"
import InfoModals from "@/utilities/modals/info_modals"

const UpdateCategoryComponent = ()=>{
    const router = useRouter()
    const [isSubmit, setISSubmit] = useState(false)
    const [category, setCategory] = useState<DocumentData>()
    const [isUpdated, setIsUpdated] = useState(false)
    const [message, setMessage] = useState("")
    const {
        register,
        formState : {errors},
        reset,
        handleSubmit
    }= useForm()
    const {id} = router.query
    useEffect(()=>{
        const getCategory = async()=>{
            const result = await getOnceCategory(id as string)
            setCategory(result.data)
        }
        getCategory()
    },[id])

    const onSubmit = async(data:FieldValues)=>{
        setISSubmit(true)
        const result = await updateCategory(id as string, {name:data.name, description:data.description, updated_at: new Date()})
        setIsUpdated(result)
        if (result) {
            setMessage("Mise à jour de la catégorie a été effectuée")
        }else{
            setMessage("La mise à jour n'a pas pu été effectuée, une erreur s'est produite")
        }
        reset()
        setISSubmit(false)
        router.push("/admin/category")
    }
    return (
        <AdminPanel>
            <div className="w-full mx-auto">
                <div className="flex flex-row-reverse justify-between items-center gap-[300px]">
                    <ThemedText variant="title" color="gray" className="text-center">Modification d'une categorie</ThemedText>
                    <ThemedButton icon iconPath={<HiArrowLeft/>} color="gray" onClick={()=>router.push("/admin/category")}>Retour</ThemedButton>    
                </div>
                <div className="my-5">
                    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col justify-normal  gap-3">
                        <ThemedInputs defaultValue={category?.name} type="text" name="name" placeholder="technologie" isRequired={true} errorText="Le nom de la catégorie est requis" disabled={isSubmit} label="Nom de la catégorie" errors={errors} register={register}></ThemedInputs>
                        <ThemedTextArea  name="description" isRequired={true} defaultValue={category?.description} errorText="La description de la catégorie est requis" disabled={isSubmit} label="Description de la catégorie" register={register} errors={errors}></ThemedTextArea>
                        <ThemedButton type="submit" state={isSubmit ? "disabled" : "useable"}>Modifier</ThemedButton>
                    </form>
                </div>
            </div>
            {
                message &&
                <InfoModals type={isUpdated ? "success" : "danger"} title="Message" duration={5}>
                    {message}
                </InfoModals>
            }
        </AdminPanel>
    )
}

export default UpdateCategoryComponent