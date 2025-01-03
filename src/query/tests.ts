import { db } from "@/lib/firebase";
import { TestType } from "@/lib/schema/user";
import { addDoc, collection, doc, getDoc, updateDoc } from "firebase/firestore";

// Récupérer un test par ID
export const GetTestById = async (testId: string) => {
  try {
    const docRef = doc(db, "tests", testId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return { data: docSnap.data() };
    } else {
      return { message: "No such test found" };
    }
  } catch (error) {
    return error;
  }
};

// Ajouter un test
export const AddTest = async (test: Partial<TestType>): Promise<boolean> => {
  try {
    const ref = collection(db, "tests");
    await addDoc(ref, test);
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};

// Mettre à jour un test
export const UpdateTest = async (testId: string, updates: Partial<TestType>): Promise<boolean> => {
  try {
    const ref = doc(db, "tests", testId);
    await updateDoc(ref, updates);
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};
