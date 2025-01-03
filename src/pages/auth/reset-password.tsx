import { GetUserCredentials, UserCredentialType } from "@/query/user"
import ThemedButton from "@/utilities/button"
import ThemedInputs from "@/utilities/forms/input"
import InfoModals from "@/utilities/modals/info_modals"
import ThemedText from "@/utilities/typography"
import { useState } from "react"
import { FieldValues, useForm } from "react-hook-form"

const ResetPasswordComponent = ()=>{
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [state, setState] = useState("")
    const [type, setType] = useState("")
    const {
        register,
        formState :   {errors},
        reset,
        handleSubmit
    } = useForm()
    const onSubmit = async(data:FieldValues)=>{
        setIsSubmitting(true)
        const result:UserCredentialType = await GetUserCredentials(data.email)
        if(result.success == false){
            setState("Erreur lors de la récupération des données de l'utilisateur")
            setType("danger")
        }else{
            await fetch("/api/auth/passwordResetEmail", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  to: typeof result.data !== 'string' ? result.data.email : '',
                  subject: "Réinitialisation de mot de passe",
                  username: typeof result.data !== 'string' ? result.data.name : '',
                }),
              })
                .then((response) => response.json())
                .then((data_2) => {
                    setType(data_2.status)
                    setState(data_2.message)
                })
                .catch((error) => {
                  setIsSubmitting(false)
                  setType("danger")
                    setState("Erreur lors de l'envoi de l'email :" + error.data)
                })
            setState("Un lien de réinitialisation de mot de passe a été envoyé à votre adresse email")
        }
        reset()
        setIsSubmitting(false)
    }
    return (
        <>
            <div className="max-w-2xl mx-auto">
                <div>
                    <ThemedText className="text-center" color="primary" variant="heading-2">Réinitialisation de mot de passe</ThemedText>
                    <ThemedText variant="small-text" color="gray">Veuillez entrer votre mot de passe pour une demande de lien de réinitialisation de mot de passe</ThemedText>
                    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col justify-normal gap-6">
                        <ThemedInputs type="text" placeholder="exemple@gmail.com" name="email" errorText="L'email est requis" isRequired={true} register={register} errors={errors} disabled={isSubmitting} label="Email"></ThemedInputs>
                        <ThemedButton variant="solid" color="primary" state={isSubmitting ? "disabled" : "useable"} type="submit">Envoyer</ThemedButton>
                    </form>
                </div>
            </div>
            {
                state as string &&
                <InfoModals type={type as "success" | "danger"} title="Message">
                    {state}
                </InfoModals>
            }
        </>
    )
}

export default ResetPasswordComponent