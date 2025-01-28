import { motion } from "framer-motion";
import ThemedText from "../typography";
import { useRouter } from "next/router";
import { IoTrashOutline } from "react-icons/io5";
import { deleteVideos } from "@/query/skills";
import { useState } from "react";
import InfoModals from "../modals/info_modals";
import ActionModal from "../modals/action_modal";
import { FaFilePen } from "react-icons/fa6";

interface VideosProps {
  id: string;
  title: string;
  duration: number;
}

const VideosCard = ({ id, title, duration }: VideosProps) => {
  const [message, setMessage] = useState<string>();
  const [showModal, setShowModal] = useState<boolean>(false);
  const [type, setType] = useState<"info" | "danger" | "success" | "warning">();
  const [isVisible, setIsVisible] = useState<boolean>(true); // Gère la visibilité du composant
  const router = useRouter();

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
    hover: {
      scale: 1.05,
      boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.2)",
      transition: { duration: 0.2 },
    },
  };

  const formatDuration = (duration: number) => {
    const hours = Math.floor(duration / 3600);
    const minutes = Math.floor((duration % 3600) / 60);
    const seconds = duration % 60;
    return `${hours}h ${minutes}m ${seconds}s`;
  };

  const OnDelete = async () => {
    const result = await deleteVideos(id);
    if (result) {
      setType("success");
      setMessage("Vidéo supprimée avec succès");
      setTimeout(() => setIsVisible(false), 2000); // Cache le composant après un délai
    } else {
      setType("danger");
      setMessage("La suppression de la vidéo a échoué");
    }
    setShowModal(false);
  };

  if (!isVisible) return null; // Ne rend pas le composant s'il n'est pas visible

  return (
    <>
      <motion.div
        key={id}
        variants={itemVariants}
        whileHover="hover"
        className="p-4 flex flex-col gap-2 items-end rounded shadow cursor-pointer"
      >
        <ThemedText variant="title" color="dark">
          {title}
        </ThemedText>
        <ThemedText variant="small-text" color="primary">
          Durée : {formatDuration(duration)}
        </ThemedText>
        <div className="flex flex-row items-center gap-10 justify-between">
          <FaFilePen
            size={20}
            color="blue"
            onClick={() => {
              router.push(`/admin/videos/update?id=${id}`);
            }}
          />
          <IoTrashOutline size={20} color="red" onClick={() => setShowModal(true)} />
        </div>
      </motion.div>
      {showModal && (
        <ActionModal
          title="Suppression"
          accept_action={OnDelete}
          accept_placeholder="Oui"
          refuse_placeholder="Non"
          type="danger"
        >
          Voulez-vous supprimer cette vidéo ?
        </ActionModal>
      )}
      {message && (
        <InfoModals type={type} title="Message">
          {message}
        </InfoModals>
      )}
    </>
  );
};

export default VideosCard;
