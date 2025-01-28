import { fetchVideoInfo } from "./fetchVideosInfo";

/**
 * Vérifie si les informations d'une vidéo sont en cache, sinon les fetch depuis l'API.
 * @param videoUrl Lien complet de la vidéo YouTube.
 * @returns Les informations de la vidéo (depuis le cache ou l'API).
 */
export const getVideoInfoWithCache = async (videoUrl: string) => {
    const extractVideoIdFromShortUrl = (videoUrl: string): string | null => {
        const shortUrlPattern = /youtu\.be\/([a-zA-Z0-9_-]{11})/;
        const match = videoUrl.match(shortUrlPattern);
        if (match) {
          return match[1];
        }
        return null;
      };
    const videoId = extractVideoIdFromShortUrl(videoUrl);
    if (!videoId) throw new Error("URL invalide ou vidéo ID manquant.");
  
    // Vérifier dans le cache
    const cachedData = localStorage.getItem(`video_${videoId}`);
    if (cachedData) {
      const data = JSON.parse(cachedData);
      return data
    }
  
    // Sinon, fetch depuis l'API
    const videoInfo = await fetchVideoInfo(videoUrl);
  
    // Mettre en cache les données pour une future utilisation
    localStorage.setItem(`video_${videoId}`, JSON.stringify(videoInfo));
  
    return videoInfo;
  };
  