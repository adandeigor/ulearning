import ThemedText from "@/utilities/typography"
import AdminPanel from ".."
import ThemedButton from "@/utilities/button"
import { useRouter } from "next/router"
import ThemedInputs from "@/utilities/forms/input"
import { useForm } from "react-hook-form"

const CreateVideos = ()=>{
    const router = useRouter()
    const {
        register,
        formState : {errors},
        handleSubmit,
        reset
    }= useForm()
    
    return (
         <AdminPanel>
            <div className="flex flex-row-reverse items-center justify-between gap-[200px]">
                <ThemedText color="gray" variant="title">Create Course</ThemedText>
                <ThemedButton onClick={()=>{router.push("/admin/courses")}} color="gray">Retour</ThemedButton>
            </div>
            <div>
                <form className="flex flex-col gap-5">
                    <ThemedText variant="title" color="dark">Create a new course</ThemedText>
                    <ThemedInputs
                    type="text"
                    placeholder="Title"
                    name="title"
                    isRequired={true}
                    errorText="Title is required"
                    disabled={false}
                    label="Title"
                    register={register}
                    errors={errors}
                    ></ThemedInputs>
                    <ThemedInputs
                    type="text"
                    placeholder="Content"
                    name="content"
                    isRequired={true}
                    errorText="Content is required"
                    disabled={false}
                    label="Content"
                    register={register}
                    errors={errors}
                    >
                    </ThemedInputs>
                    <ThemedButton color="primary">Create</ThemedButton>
                </form>
            </div>
         </AdminPanel>
    )
}

export default CreateVideos