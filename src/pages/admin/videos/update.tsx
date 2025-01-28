import { useEffect, useState } from "react";
import { useForm, FieldValues } from "react-hook-form";
import { useRouter } from "next/router";
import { getOnceVideo, updateVideos } from "@/query/skills";
import ThemedInputs from "@/utilities/forms/input";
import InfoModals from "@/utilities/modals/info_modals"
import AdminPanel from "..";
import ThemedButton from "@/utilities/button";



const UpdateVideo = () => {
    const router = useRouter();
    const { id } = router.query;
    const { register, handleSubmit, setValue, formState: { errors } } = useForm();
    const [showModal, setShowModal] = useState(false);
    const [modalMessage, setModalMessage] = useState("");
    const [modalType, setModalType] = useState<"info" | "success" | "warning" | "danger">("info");

    useEffect(() => {
        if (id) {
            const fetchVideo = async () => {
                const response = await getOnceVideo(id as string);
                if (response?.data) {
                    setValue("title", response.data.title);
                    setValue("description", response.data.description);
                    setValue("url", response.data.url);
                }
            };
            fetchVideo();
        }
    }, [id, setValue]);

    const onSubmit = async (data:FieldValues) => {
        const success = await updateVideos(id as string, data);
        if (success) {
            setModalMessage("Video updated successfully!");
            setModalType("success");
            router.push("/admin/videos");
        } else {
            setModalMessage("Failed to update video.");
            setModalType("danger");
        }
        setShowModal(true);
    };

    return (
        <AdminPanel>  
            <div className="container mx-auto p-4">
            <div className="flex flex-row-reverse items-center justify-between gap-[200px]">
                <h1 className="text-2xl font-bold mb-4">Update Video</h1>
                <ThemedButton onClick={()=>{router.push('/admin/videos')}} color="gray">Retour</ThemedButton>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
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
                />
                <ThemedInputs
                    type="text"
                    placeholder="Description"
                    name="description"
                    isRequired={true}
                    errorText="Description is required"
                    disabled={false}
                    label="Description"
                    register={register}
                    errors={errors}
                />
                <ThemedInputs
                    type="text"
                    placeholder="URL"
                    name="url"
                    isRequired={true}
                    errorText="URL is required"
                    disabled={false}
                    label="URL"
                    register={register}
                    errors={errors}
                />
                <button type="submit" className="mt-4 bg-blue-500 text-white px-4 py-2 rounded">
                    Update Video
                </button>
            </form>
            {showModal && (
                <InfoModals type={modalType} title={modalType === "success" ? "Success" : "Error"} duration={4}>
                    {modalMessage}
                </InfoModals>
            )}
        </div>
        </AdminPanel>
    );
};

export default UpdateVideo;