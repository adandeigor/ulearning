import { db } from "@/lib/firebase";
import {
  CategorySchema,
  CategoryType,
  CourseSchema,
  CoursesType,
  SkillsSchema,
  SkillsType,
  VideosSchema,
  VideosType,
} from "@/lib/schema/skills";
import {
  collection,
  deleteDoc,
  doc,
  DocumentData,
  getDoc,
  getDocs,
  query,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { v4 as uid } from "uuid";

////////////////////////////////  SKILLS Courses //////////////////////////////////

export const SetSKills = async (data: SkillsType) => {
  const Id = uid();
  data.id = Id;
  const validateData = SkillsSchema.parse(data);
  console.log(validateData);
  await setDoc(doc(db, "skills", Id), validateData);
  return true;
};

export const getSkills = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "skills"));
    const data: DocumentData[] = [];
    querySnapshot.forEach((doc) => {
      data.push(doc.data());
    });
    return data;
  } catch (error) {
    return error;
  }
};

export const getCategorySkills = async (category_id: string) => {
  try {
    const q = query(
      collection(db, "skills"),
      where("category", "==", category_id)
    );
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      return { data: doc.data() };
    });
  } catch (error) {
    return error;
  }
};

export const getOnceSkill = async (id: string) => {
  try {
    const docRef = doc(db, "skills", id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return { data: docSnap.data() };
    } else {
      return { message: "document not found" };
    }
  } catch (error) {
    return { message: error };
  }
};

export const updateSkill = async (
  id: string,
  data: Partial<SkillsType>
): Promise<boolean> => {
  try {
    const ref = doc(db, "skills", id);
    await updateDoc(ref, data);
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const deleteSkill = async (id: string): Promise<boolean> => {
  try {
    await deleteDoc(doc(db, "skills", id));
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};

////////////////////////////////    COURSE FUNCTIONS     ////////////////////////////////

export const setCourse = async (data: CoursesType) => {
  try {
    const Id = uid();
    data.id = Id;
    const validateData = CourseSchema.parse(data);
    await setDoc(doc(db, "courses", Id), validateData);
    return validateData;
  } catch (error) {
    return error;
  }
};

export const getCourses = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "courses"));
    const data: DocumentData[] = [];
    querySnapshot.forEach((doc) => {
      data.push(doc.data());
    });
    return data;
  } catch (error) {
    return error;
  }
};

export const getOnceCourse = async (id: string) => {
  try {
    const docRef = doc(db, "courses", id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return { data: docSnap.data() };
    } else {
      return { message: "document not found" };
    }
  } catch (error) {
    return { message: error };
  }
};

export const getSkillCourses = async (skill_id: string) => {
  try {
    const q = query(
      collection(db, "courses"),
      where("skill_id", "==", skill_id)
    );
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      return { data: doc.data() };
    });
  } catch (error) {
    return error;
  }
};

export const updateCourses = async (
  id: string,
  data: Partial<CoursesType>
): Promise<boolean> => {
  try {
    const ref = doc(db, "courses", id);
    await updateDoc(ref, data);
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const deleteCourses = async (id: string): Promise<boolean> => {
  try {
    await deleteDoc(doc(db, "courses", id));
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};

////////////////////////////////    VIDEOS Functions //////////////////////////////////

export const setVideo = async (data: VideosType) => {
  try {
    const Id = uid();
    data.id = Id;
    const validateData = VideosSchema.parse(data);
    await setDoc(doc(db, "videos", Id), validateData);
    return validateData;
  } catch (error) {
    return error;
  }
};

export const getVideos = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "videos"));
    const data: DocumentData[] = [];
    querySnapshot.forEach((doc) => {
      data.push(doc.data());
    });
    return data;
  } catch (error) {
    return error;
  }
};

export const getOnceVideo = async (id: string) => {
  try {
    const docRef = doc(db, "videos", id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return { data: docSnap.data() };
    } else {
      return { message: "document not found" };
    }
  } catch (error) {
    return { message: error };
  }
};

export const updateVideos = async (
  id: string,
  data: Partial<VideosType>
): Promise<boolean> => {
  try {
    const ref = doc(db, "videos", id);
    await updateDoc(ref, data);
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const deleteVideos = async (id: string): Promise<boolean> => {
  try {
    await deleteDoc(doc(db, "videos", id));
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};

//////////////////////////////// CATEGORY Functions //////////////////////////////////

export const setCategory = async (data: CategoryType) => {
  try {
    const Id = uid();
    data.id = Id;
    const validateData = CategorySchema.parse(data);
    await setDoc(doc(db, "category", Id), validateData);
    return { validateData: validateData, success: true };
  } catch (error) {
    return { error: error, success: false };
  }
};

export const getCategory = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "category"));
    const data: DocumentData[] = [];
    querySnapshot.forEach((doc) => {
      data.push(doc.data());
    });
    return data;
  } catch (error) {
    return error;
  }
};

export const getOnceCategory = async (id: string) => {
  try {
    const docRef = doc(db, "category", id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return { data: docSnap.data(), message: "Document founded" };
    } else {
      return { message: "Document not found" };
    }
  } catch (error) {
    return { message: error };
  }
};

export const updateCategory = async (
  id: string,
  data: Partial<CategoryType>
): Promise<boolean> => {
  try {
    const ref = doc(db, "category", id);
    await updateDoc(ref, data);
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const deleteCategory = async (id: string): Promise<boolean> => {
  try {
    await deleteDoc(doc(db, "category", id));
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};
