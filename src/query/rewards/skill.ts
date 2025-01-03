import { db } from "@/lib/firebase";
import { SkillGamificationType } from "@/lib/schema/user";
import { doc, getDoc, updateDoc } from "firebase/firestore";

export const GetSkillGamification = async (userId: string, skillId: string) => {
  const docRef = doc(db, `gamifications_skill/${userId}/skills`, skillId);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return { data: docSnap.data() };
  } else {
    return { message: "No skill gamification data found" };
  }
};

export const InitializeSkillGamification = async (
  userId: string,
  skillId: string
) => {
  const docRef = doc(db, `gamifications_skill/${userId}/skills`, skillId);
  const docSnap = await getDoc(docRef);

  // Si le document n'existe pas, on l'initialise avec les valeurs par défaut
  if (!docSnap.exists()) {
    try {
      await updateDoc(docRef, {
        points: 0,
        level: 1,
        videosWatchedCount: 0,
        lastVideoWatched: null,
        lastUpdated: new Date(),
      });
      return { message: "Skill gamification initialized" };
    } catch (error) {
      console.error("Error initializing skill gamification:", error);
      return { message: "Error initializing skill gamification" };
    }
  } else {
    return { message: "Skill gamification already initialized" };
  }
};

export const UpdateSkillGamification = async (
  userId: string,
  skillId: string,
  data: Partial<SkillGamificationType>
) => {
  const docRef = doc(db, `gamifications_skill/${userId}/skills`, skillId);
  try {
    await updateDoc(docRef, data);
    return { message: "Skill gamification updated successfully" };
  } catch (error) {
    console.error("Error updating skill gamification:", error);
    return { message: "Error updating skill gamification" };
  }
};

export const AddPointsToSkillGamification = async (
  userId: string,
  skillId: string,
  pointsToAdd: number
) => {
  const docRef = doc(db, `gamifications_skill/${userId}/skills`, skillId);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    const currentData = docSnap.data();
    const currentPoints = currentData?.points || 0;
    const newPoints = currentPoints + pointsToAdd;

    // Met à jour les points
    try {
      await updateDoc(docRef, { points: newPoints });
      return { message: "Points added successfully" };
    } catch (error) {
      console.error("Error adding points:", error);
      return { message: "Error adding points" };
    }
  } else {
    return { message: "Skill gamification data not found" };
  }
};

export const UpdateSkillLevel = async (
  userId: string,
  skillId: string,
  points: number
) => {
  const docRef = doc(db, `gamifications_skill/${userId}/skills`, skillId);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    const currentData = docSnap.data();
    let newLevel = currentData?.level || 1;

    // Exemple: chaque 100 points dans la compétence augmente d'un niveau
    if (points >= newLevel * 100) {
      newLevel = Math.floor(points / 100) + 1;
    }

    try {
      await updateDoc(docRef, { points, level: newLevel });
      return { message: "Skill level updated successfully" };
    } catch (error) {
      console.error("Error updating skill level:", error);
      return { message: "Error updating skill level" };
    }
  } else {
    return { message: "Skill gamification data not found" };
  }
};
