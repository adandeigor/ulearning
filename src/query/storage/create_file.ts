import { client } from "@/lib/appwrite";
import {  Storage, ID, Models } from "appwrite";


const storage = new Storage(client);

/**
 * Enregistre un fichier dans Appwrite
 * @param bucketId - L'identifiant du bucket Appwrite
 * @param fileInputId - L'identifiant HTML de l'élément input type file
 * @returns Une promesse contenant les détails du fichier enregistré
 */

export const uploadFile = async (bucketId: string, fileInputId: string): Promise<{response?: Models.File, error?: Error, success: boolean}> => {
    try {
        const fileInput = document.getElementById(fileInputId) as HTMLInputElement;
        if (!fileInput || !fileInput.files || fileInput.files.length === 0) {
            throw new Error("Aucun fichier sélectionné.");
        }
        const file = fileInput.files[0];
        const response = await storage.createFile(bucketId, ID.unique(), file);
        return {response:response, success:true};
    } catch (error) {
        return {error: error as Error, success : false}
    }
};