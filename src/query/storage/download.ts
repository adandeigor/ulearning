import { client } from "@/lib/appwrite";
import { Storage } from "appwrite";

const storage = new Storage(client);


/**
 * Télécharge un fichier depuis Appwrite
 * @param bucketId - L'identifiant du bucket Appwrite
 * @param fileId - L'identifiant du fichier dans le bucket
 * @returns Une promesse contenant l'URL de téléchargement du fichier
 */
export const downloadFile = async (bucketId: string, fileId: string): Promise<{ result?: string, success: boolean, error?: Error }> => {
    try {
        const result = await storage.getFileDownload(bucketId, fileId);
        return {result : result.toString(), success:true};
    } catch (error) {
        return {success : false, error : error as Error}
    }
};