//////////////////// User Functions //////////////////////////////////

import { db } from "@/lib/firebase";
import { UserType } from "@/lib/schema/user";
import { deleteDoc, doc, DocumentData, getDoc, updateDoc } from "firebase/firestore";
export type UserCredentialType = {
  data : DocumentData | string,
  success : boolean
}
export const GetUserCredentials = async(id:string):Promise<UserCredentialType> => {
  try {
    const docRef = doc(db, "users", id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
        return {data: docSnap.data(), success : true};
    } else {
      return {data : "No such document", success : false}
    }
  } catch (error) {
    return {data  : error as string, success : false};
  }
};

export const UpdateUserCredentials = async(
    id: string,
  data: Partial<UserType>
):Promise<boolean>  => {
    try {
        const ref = doc(db, "users", id);
        await updateDoc(ref, data);
        return true;
      } catch (error) {
        console.log(error);
        return false;
      }
}

export const DeleteUser = async(id:string):Promise<boolean> =>{
    try {
        await deleteDoc(doc(db, "users", id));
        return true;
      } catch (error) {
        console.log(error);
        return false;
      }
}


