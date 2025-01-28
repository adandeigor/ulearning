import { client } from "@/lib/appwrite";
import { Storage } from "appwrite";

const storage = new Storage(client);

/**
 * Supprime un fichier dans Appwrite
 * @param bucketId - L'identifiant du bucket Appwrite
 * @param fileId - L'identifiant du fichier à supprimer
 * @returns Une promesse qui confirme la suppression
 */

export const deleteFile = async (bucketId: string, fileId: string): Promise<{ success: boolean; result?: object | null; error?: Error | null }> => {
    try {
        const result = await storage.deleteFile(bucketId, fileId);
        return {success : true, result: result}
    } catch (error) {
        return {success : false, error: error as Error}
    }
};