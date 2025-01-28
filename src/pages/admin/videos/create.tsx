import ThemedText from "@/utilities/typography"
import AdminPanel from ".."
import ThemedButton from "@/utilities/button"
import { HiArrowLeft } from "react-icons/hi"
import { useRouter } from "next/router"
import { FieldValues, useForm } from "react-hook-form"
import { useState } from "react"
import { getVideoInfoWithCache } from "@/query/videos/getVideoInfoWithCatch"
import InfoModals from "@/utilities/modals/info_modals"
import ThemedInputs from "@/utilities/forms/input"
import { getOnceVideo, setVideo } from "@/query/skills"

const CreateVideoComponent = ()=>{
    const router = useRouter()
    const [message, setMessage] = useState<string>()
    const [type, setType] = useState<'info' | "danger" | "success" | "warning">()
    const [isSubmitting, setIsSubmitting] = useState(false)
    const {
        register,
        formState : {errors},
        reset,
        handleSubmit
    } = useForm()
    const checkIfVideoExists = async (videoId: string) => {
        // Remplace par ta logique pour vérifier si la vidéo existe déjà
        const existingVideo = await getOnceVideo(videoId); // Par exemple, `getVideoById` récupère la vidéo par son ID.
        return existingVideo !== null;
    };
    
    const onSubmit = async (data: FieldValues) => {
        setIsSubmitting(true);
        
        // Récupère les informations depuis le cache ou l'API
        const videoInfos = await getVideoInfoWithCache(data.video_url);
        console.log(videoInfos);
        if (videoInfos !== undefined) {
            // Si la vidéo est récupérée (du cache ou de l'API)
            
            // Vérifie si la vidéo est déjà dans la base de données
            try {
                const isVideoInDb = await checkIfVideoExists(videoInfos.id);
                if (!isVideoInDb) {
                    // Si la vidéo n'est pas encore dans la DB, enregistre-la
                    const result = await setVideo({
                        title: videoInfos.title as string,
                        created_at: new Date(),
                        url: data.video_url,
                        duration: videoInfos.duration,
                        video_id: videoInfos.id,
                        description : videoInfos.description,
                    });
                    if (result == true) {
                        setType("success");
                        setMessage("Vidéo ajoutée avec succès");
                    } else {
                        setType("danger");
                        setMessage("L'ajout de la vidéo a échoué");
                    }
                } else {
                    setType("info");
                    setMessage("Cette vidéo est déjà enregistrée.");
                }
            } catch {
                // Si une erreur se produit lors de la vérification ou de l'enregistrement, affiche un message d'erreur.
                setType("danger");
                setMessage("Erreur lors de la vérification ou de l'ajout de la vidéo.");
            }
        } else {
            setType("danger");
            setMessage("La récupération des informations a échoué");
        }
        setTimeout(() => {
            setMessage('');
            setType(undefined);
          }, 4000);
        reset();
        setIsSubmitting(false);
    };
    
    
    return (
         <AdminPanel>
            <div className="flex flex-col gap-5">
                <div className="flex flex-row-reverse justify-between items-center gap-40">
                    <ThemedText variant="title" color="dark" weight="bold">Ajout de vidéo</ThemedText>
                    <ThemedButton icon iconPath={<HiArrowLeft/>} color="gray" onClick={()=>router.push("/admin/videos")}>Retour</ThemedButton>    
                </div>
                <div>
                    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col justify-normal gap-5">
                        <ThemedInputs
                            type="text"
                            placeholder="l'url de la vidéo youtube"
                            name="video_url"
                            isRequired={true}
                            disabled={isSubmitting}
                            errorText="Le lien de la vidéo est requis"
                            errors={errors}
                            label="Url de la vidéo"
                            register={register}
                        >
                        </ThemedInputs>
                        <ThemedButton type="submit">
                            Enregistrer
                        </ThemedButton>
                    </form>
                </div>
            </div>
            {
                message && <InfoModals type={type} title="Message">
                    {message}
                </InfoModals>
            }
         </AdminPanel>
    )
}

export default CreateVideoComponent