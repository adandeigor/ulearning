import { db } from "@/lib/firebase";
import { GlobalGamificationType } from "@/lib/schema/user";
import { doc, getDoc, updateDoc } from "firebase/firestore";

export const GetGlobalGamification = async (userId: string) => {
  const docRef = doc(db, "gamifications_global", userId);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return { data: docSnap.data() };
  } else {
    return { message: "No global gamification data found" };
  }
};

export const UpdateGlobalGamification = async (
  userId: string,
  data: Partial<GlobalGamificationType>
) => {
  const ref = doc(db, "gamifications_global", userId);
  await updateDoc(ref, data);
};

export const InitializeGlobalGamification = async (userId: string) => {
    const docRef = doc(db, "gamifications_global", userId);
    const docSnap = await getDoc(docRef);
  
    // Si le document n'existe pas, on l'initialise avec les valeurs par défaut
    if (!docSnap.exists()) {
      try {
        await updateDoc(docRef, {
          points: 0,
          level: 1,
          badges: [],
          lastUpdated: new Date(),
        });
        return { message: "Gamification initialized" };
      } catch (error) {
        console.error("Error initializing gamification:", error);
        return { message: "Error initializing gamification" };
      }
    } else {
      return { message: "Gamification already initialized" };
    }
  };
  
