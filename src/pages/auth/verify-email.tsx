/* eslint-disable react/no-unescaped-entities */
import ThemedButton from "@/utilities/button"
import ActionModal from "@/utilities/modals/action_modal"
import ThemedText from "@/utilities/typography"
import { useSession } from "next-auth/react"
import { useRouter } from "next/router"
import { useState } from "react"
import { useForm } from "react-hook-form"

const VerifyEmailComponent = ()=> {
    const {
        handleSubmit
    } = useForm()
    const session = useSession()
    const router = useRouter()
    if (session.status == "unauthenticated") {
        router.push("/auth/login")
    }
    const [message, setMessage] = useState("")
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [isDone, setIsDone] = useState(false)
    const [type, setType] = useState("")
    const email = session.data?.user?.email
    const name = session.data?.user?.name
    const onSubmit = () => {
        setIsSubmitting(true)
        fetch("/api/auth/sendEmailVerification", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                to: email,
                subject: "Vérification d'email",
                username: name
            })
        }).then((response) => response.json())
        .then((data) => {
            setIsSubmitting(false)
            setMessage(data.message)
            setType(data.status)
            setIsDone(true)
        })
        .catch((error) => {
            setIsSubmitting(false)
            setMessage("Erreur lors de l'envoi de l'email :"+ error)
            setType("danger")
        })
    }
    return (
         <>
            <div className="max-w-2xl mx-auto flex flex-col justify-normal gap-6">
                <ThemedText variant="heading-2" color="primary" className="text-center">Confirmation d'email</ThemedText>
                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col justify-normal gap-6">
                    <ThemedText className="text-center">Veuillez cliquer sur le bouton en bas pour une demande de lien de confirmation d'email et vérifier votre boîte email pour confirmer votre email</ThemedText>
                    <ThemedButton type="submit" state={isSubmitting ? "disabled" : "useable"}>Demander de confirmation</ThemedButton>
                </form>
            </div>
            {isDone &&
                <ActionModal type={type as "success" | "danger" | "warning" | "info"} title="Confirmation d'email" accept_action={()=>{}} refuse_placeholder="Fermer" accept_placeholder="Ok">
                    {message}
                </ActionModal>
            }
         </>
    )
}

export default VerifyEmailComponent