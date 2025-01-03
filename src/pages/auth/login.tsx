/* eslint-disable react/no-unescaped-entities */
import ThemedButton from "@/utilities/button"
import ThemedInputs from "@/utilities/forms/input"
import InfoModals from "@/utilities/modals/info_modals"
import ThemedText from "@/utilities/typography"
import { signIn } from "next-auth/react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/router"
import { useState } from "react"
import { FieldValues, useForm } from "react-hook-form"

const LoginComponent = () => {
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

  const onSubmit = async(data: FieldValues) => {
    setIsSubmitting(true)
    const result = await signIn("credentials", {
      redirect: false,
      email: data.email,
      password: data.password,
    })
    if (result?.error) {
        setErrorMessage("Email ou mot de passe incorrect")
      } else {
        setIsSubmitting(false)
        reset()
        setSuccessMessage("Connexion réussie")
        router.push("/")
      }
  }



  return (
    <>
      <div className="max-w-5xl m-auto p-5 rounded shadow-lg">
        <ThemedText className="text-center font-bold" variant="heading-3" color="primary">
          ULearning
        </ThemedText>
        <div className="flex lg:flex-row flex-col justify-between items-start px-3">
          <Image src={"/images/login.png"} alt="image" width={500} height={500} />
          <div className="flex flex-col justify-normal gap-2 items-center">
            <ThemedText variant="heading-2" color="primary" className="">
              Connexion
            </ThemedText>
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col justify-normal gap-2">
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
            </form>
            <div>
                <Link href={'/auth/register'}> <ThemedText variant="small-text" color="gray" className="text-center font-medium">Vous n'avez un compte ? Créez en  ici </ThemedText></Link>
                <Link href={'/auth/reset-password'}> <ThemedText variant="small-text" color="gray" className="text-center font-medium">Mot de passe oublié </ThemedText></Link>
            </div>
            {successMessage && (
              <InfoModals title="Message" type={"success"}>
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

export default LoginComponent
