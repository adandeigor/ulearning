import { client } from "@/lib/appwrite";
import { Storage } from "appwrite";

const storage = new Storage(client);

/**
 * Met à jour un fichier dans Appwrite
 * @param bucketId - L'identifiant du bucket Appwrite
 * @param fileId - L'identifiant du fichier à mettre à jour
 * @param name - Nouveau nom du fichier (optionnel)
 * @param permissions - Permissions du fichier (optionnel)
 * @returns Une promesse contenant les détails du fichier mis à jour
 */
export const updateFile = async (
    bucketId: string,
    fileId: string,
    name?: string,
): Promise<{ fileId: string; name: string } | { error: Error }> => {
    try {
        const result = await storage.updateFile(bucketId, fileId, name);
        return {
            fileId,
            name: result.name,
        };
    } catch (error) {
        return {error: error as Error}
    }
};
