import { db } from "@/lib/firebase";
import { NotificationType } from "@/lib/schema/user";
import { addDoc, collection, deleteDoc, doc, getDocs, query, where } from "firebase/firestore";

// Récupérer les notifications d'un utilisateur
export const GetNotifications = async (userId: string) => {
  try {
    const q = query(collection(db, "notifications"), where("user_id", "==", userId));
    const querySnapshot = await getDocs(q);
    const notifications = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    return { data: notifications };
  } catch (error) {
    return error;
  }
};

// Ajouter une notification
export const AddNotification = async (notification: Partial<NotificationType>): Promise<boolean> => {
  try {
    const ref = collection(db, "notifications");
    await addDoc(ref, notification);
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};

// Supprimer une notification
export const DeleteNotification = async (notificationId: string): Promise<boolean> => {
  try {
    await deleteDoc(doc(db, "notifications", notificationId));
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};
