import axios from "axios";

const API_KEY = process.env.NEXT_PUBLIC_YOUTUBE_API; // Remplace par ta clé API

/**
 * Fonction pour extraire l'ID vidéo depuis un lien YouTube (formats courts comme youtu.be).
 * @param videoUrl Lien complet de la vidéo YouTube.
 * @returns L'ID de la vidéo ou null si l'URL est invalide.
 */
const extractVideoIdFromShortUrl = (videoUrl: string): string | null => {
  const shortUrlPattern = /youtu\.be\/([a-zA-Z0-9_-]{11})/;
  const match = videoUrl.match(shortUrlPattern);
  if (match) {
    return match[1];
  }
  return null;
};

/**
 * Fetch les informations d'une vidéo YouTube à partir de son lien.
 * @param videoUrl Lien complet de la vidéo YouTube.
 * @returns Les informations de la vidéo.
 */
export const fetchVideoInfo = async (videoUrl: string) => {
  try {
    // Essayez d'abord d'extraire l'ID vidéo à partir du format court
    let videoId = extractVideoIdFromShortUrl(videoUrl);

    // Si l'ID n'est pas trouvé dans le format court, essayez de récupérer l'ID dans une URL longue
    if (!videoId) {
      videoId = new URL(videoUrl).searchParams.get("v");
    }

    // Si l'ID vidéo n'est toujours pas trouvé, lancer une erreur
    if (!videoId) throw new Error("URL invalide ou vidéo ID manquant.");

    // Appel API pour récupérer les données
    const response = await axios.get("https://www.googleapis.com/youtube/v3/videos", {
      params: {
        id: videoId,
        part: "snippet,contentDetails",
        key: API_KEY,
      },
    });

    // Vérifier si des résultats ont été retournés
    const videoData = response.data.items[0];
    if (!videoData) throw new Error("Vidéo introuvable.");

    // Transformer la durée ISO8601 en secondes
    const duration = parseIsoDuration(videoData.contentDetails.duration);

    // Retourner les informations pertinentes
    return {
      id: videoData.id,
      title: videoData.snippet.title,
      description: videoData.snippet.description,
      duration: duration, // En secondes
    };
  } catch (error) {
    throw error;
  }
};

/**
 * Convertit une durée ISO8601 (PT#H#M#S) en secondes.
 * @param isoDuration Durée au format ISO8601.
 * @returns Durée en secondes.
 */
const parseIsoDuration = (isoDuration: string): number => {
  const match = isoDuration.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
  if (!match) return 0;

  const hours = parseInt(match[1] || "0", 10);
  const minutes = parseInt(match[2] || "0", 10);
  const seconds = parseInt(match[3] || "0", 10);

  return hours * 3600 + minutes * 60 + seconds;
};
