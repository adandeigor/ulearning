/* eslint-disable @typescript-eslint/no-explicit-any */
import { db } from "@/lib/firebase";
import { SkillProgressSchema } from "@/lib/schema/user";
import { doc, getDoc, updateDoc, arrayUnion } from "firebase/firestore";
import { z } from "zod";

// Récupérer la progression d'un utilisateur
export const GetUserProgress = async (userId: string) => {
  try {
    const docRef = doc(db, "user_progress", userId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return { data: docSnap.data() };
    } else {
      return { message: "No progress found for this user" };
    }
  } catch (error) {
    return error;
  }
};

// Ajouter une compétence à la progression utilisateur
export const AddSkillProgress = async (
  userId: string,
  skillProgress: Partial<z.infer<typeof SkillProgressSchema>>
): Promise<boolean> => {
  try {
    const ref = doc(db, "user_progress", userId);
    await updateDoc(ref, {
      skill_progress: arrayUnion(skillProgress),
    });
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};

// Mettre à jour une compétence dans la progression utilisateur
export const UpdateSkillProgress = async (
  userId: string,
  skillId: string,
  updates: Partial<z.infer<typeof SkillProgressSchema>>
): Promise<boolean> => {
  try {
    const docRef = doc(db, "user_progress", userId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const progress = docSnap.data();
      const updatedProgress = progress.skill_progress.map((skill: any) =>
        skill.skill_id === skillId ? { ...skill, ...updates } : skill
      );

      await updateDoc(docRef, { skill_progress: updatedProgress });
      return true;
    } else {
      console.log("No progress found for this user");
      return false;
    }
  } catch (error) {
    console.log(error);
    return false;
  }
};

// Supprimer une compétence de la progression utilisateur
export const RemoveSkillProgress = async (
  userId: string,
  skillId: string
): Promise<boolean> => {
  try {
    const ref = doc(db, "user_progress", userId);
    const docSnap = await getDoc(ref);

    if (docSnap.exists()) {
      const progress = docSnap.data();
      const updatedProgress = progress.skill_progress.filter(
        (skill: any) => skill.skill_id !== skillId
      );

      await updateDoc(ref, { skill_progress: updatedProgress });
      return true;
    } else {
      console.log("No progress found for this user");
      return false;
    }
  } catch (error) {
    console.log(error);
    return false;
  }
};
