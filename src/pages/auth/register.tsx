import ThemedButton from "@/utilities/button"
import ThemedInputs from "@/utilities/forms/input"
import InfoModals from "@/utilities/modals/info_modals"
import ThemedText from "@/utilities/typography"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/router"
import { useState } from "react"
import { FieldValues, useForm } from "react-hook-form"

const RegisterComponent = () => {
  const {
    register,
    formState: { errors },
    reset,
    handleSubmit,
  } = useForm()
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [successMessage, setSuccessMessage] = useState("") // Message de succès
  const [errorMessage, setErrorMessage] = useState("")
  const [type, setType] = useState("") // Message d'erreur

  const onSubmit = (data: FieldValues) => {
    setIsSubmitting(true)

    fetch("/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: data.name,
        email: data.email,
        password: data.password,
      }),
    })
      .then((response) => response.json())
      .then((data_2) => {
        reset()
        setIsSubmitting(false)
        setSuccessMessage(data_2.message) 
        setType(data_2.type)
        router.push('/auth/verify-email')
      })
      .catch((error) => {
        setIsSubmitting(false)
        console.error("Erreur lors de la création du compte :", error)
        setType('danger')
        setErrorMessage("Une erreur s'est produite, veuillez réessayer.") // Message d'erreur générique
      })
  }


  return (
    <>
      <div className="max-w-5xl m-auto p-5 rounded shadow-lg my-5">
        <ThemedText className="text-center font-bold" variant="heading-3" color="primary">
          ULearning
        </ThemedText>
        <div className="flex lg:flex-row flex-col justify-between items-center">
          <Image src={"/images/signUp2.png"} alt="image" width={450} height={500} />
          <div className="flex flex-col justify-normal gap-2 items-center">
            <ThemedText variant="heading-2" color="primary" className="">
              Inscription
            </ThemedText>
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col justify-normal gap-2">
              <ThemedText variant="small-text" color="dark">
                *Si vous avez plusieurs prénoms, entrez un seul
              </ThemedText>
              <ThemedInputs
                type="text"
                placeholder="John Doe"
                name="name"
                errorText="Le nom et prénom sont requis"
                isRequired={true}
                disabled={isSubmitting}
                label="Nom et Prénom"
                register={register}
                errors={errors}
              />
              <ThemedInputs
                type="text"
                placeholder="exemple@gmail.com"
                name="email"
                errorText="L'email est requis"
                isRequired={true}
                disabled={isSubmitting}
                label="Email"
                register={register}
                errors={errors}
              />
              <ThemedInputs
                type="password"
                placeholder="Mot de passe"
                name="password"
                errorText="Le mot de passe doit contenir 6 caractères au minimum"
                minLength={6}
                isRequired={true}
                disabled={isSubmitting}
                label="Mot de passe"
                register={register}
                errors={errors}
              />
              <ThemedButton type="submit" state={isSubmitting ? "disabled" : "useable"}>
                Envoyer
              </ThemedButton>
              <div>
                <Link href={'/auth/login'}> <ThemedText variant="small-text" color="gray" className="text-center font-medium">Vous avez un compte ? Connectez-vous ici </ThemedText></Link>
              </div>
            </form>
            {successMessage && (
              <InfoModals title="Message" type={type as "danger" | "info" | "success" | "warning"}>
                {successMessage}
              </InfoModals>
            )}
            {errorMessage && (
              <InfoModals title="Erreur" type="danger">
                {errorMessage}
              </InfoModals>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export default RegisterComponent
