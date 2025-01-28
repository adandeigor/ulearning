import { motion } from "framer-motion";
import ThemedText from "@/utilities/typography";
import AdminPanel from "..";
import { useEffect, useState } from "react";
import { DocumentData } from "firebase/firestore";
import { getVideos } from "@/query/skills";
import ThemedButton from "@/utilities/button";
import { useRouter } from "next/router";
import VideosCard from "@/utilities/admin/videosCard";

const VideosComponent = () => {
  const router = useRouter();
  const [videos, setVideos] = useState<DocumentData>();

  useEffect(() => {
    const fetchVideos = async () => {
      const result = await getVideos();
      setVideos(result as DocumentData);
    };
    fetchVideos();
  }, []);
  console.log(videos)

  // Variants pour les animations Framer Motion
  const containerVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.3,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
    hover: {
      scale: 1.05, // Augmente légèrement la taille
      boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.2)", // Effet d'ombre
      transition: { duration: 0.2 }, // Animation rapide
    },
  };

  return (
    <AdminPanel>
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="mb-4"
      >
        <ThemedText color="gray" variant="title">
          Vidéos
        </ThemedText>
        <ThemedButton onClick={() => router.push("/admin/videos/create")}>
          Ajouter une vidéo
        </ThemedButton>
      </motion.div>
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {videos?.length > 0 ? (
          videos?.map((video: DocumentData) => (
            <VideosCard
              key={video.id}
              id={video.id}
              title={video.title}
              duration={video.duration}
            ></VideosCard>
          ))
        ) : (
          <motion.div variants={itemVariants}>
            <ThemedText variant="small-text" color="gray">
              Aucune vidéo n&apos;est disponible
            </ThemedText>
          </motion.div>
        )}
      </motion.div>
    </AdminPanel>
  );
};

export default VideosComponent;
