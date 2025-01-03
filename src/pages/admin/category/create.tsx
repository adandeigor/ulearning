/* eslint-disable react/no-unescaped-entities */
import ThemedText from "@/utilities/typography"
import AdminPanel from ".."
import ThemedButton from "@/utilities/button"
import { HiArrowLeft } from "react-icons/hi"
import { useRouter } from "next/router"
import ThemedInputs from "@/utilities/forms/input"
import { FieldValues, useForm } from "react-hook-form"
import ThemedTextArea from "@/utilities/forms/textarea"
import { useState } from "react"
import { setCategory } from "@/query/skills"
import InfoModals from "@/utilities/modals/info_modals"

const CreateCategoryComponent = ()=> {
    const { 
        register, 
        formState : { errors},
        handleSubmit,
        reset, 
    } = useForm()
    const [isSubmit, setISSubmit] = useState(false)
    const [isSuccess, setIsSuccess] = useState(false)
    const [message, setMessage] = useState('')
    const router = useRouter()
    const date = new Date()
    const onSubmit = async(data:FieldValues)=> {
        setISSubmit(true)
        const result = await setCategory({created_at: date, name:data.name, description:data.description})
        setIsSuccess(result.success)
        if (result.success) {
            setMessage("La catégorie a été bien créer")
        }else{
            setMessage("La catégorie n'a pas pu été créer, une erreur est survenue")
        }
        setISSubmit(false)
        reset()
        router.push("/admin/category")
    }
    return (
        <AdminPanel>
            <div className="w-full mx-auto">
                <div className="flex flex-row-reverse justify-between items-center gap-[300px]">
                    <ThemedText variant="title" color="gray" className="text-center">Création d'une categorie</ThemedText>
                    <ThemedButton icon iconPath={<HiArrowLeft/>} color="gray" onClick={()=>router.push("/admin/category")}>Retour</ThemedButton>    
                </div>
                <div className="my-5">
                    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col justify-normal  gap-3">
                        <ThemedInputs type="text" name="name" placeholder="technologie" isRequired={true} errorText="Le nom de la catégorie est requis" disabled={isSubmit} label="Nom de la catégorie" errors={errors} register={register}></ThemedInputs>
                        <ThemedTextArea  name="description" isRequired={true} errorText="La description de la catégorie est requis" disabled={isSubmit} label="Description de la catégorie" register={register} errors={errors}></ThemedTextArea>
                        <ThemedButton type="submit" state={isSubmit ? "disabled" : "useable"}>Créer</ThemedButton>
                    </form>
                </div>
            </div>
            {
                message && <InfoModals title="Message" type={isSuccess ? "success" : "danger"}>
                    {message}
                </InfoModals>
            }
        </AdminPanel>
    )
}

export default CreateCategoryComponent