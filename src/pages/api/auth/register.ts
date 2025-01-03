/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextApiRequest, NextApiResponse } from "next";
import validator from "validator";
import bcrypt from "bcrypt";
import { collection, doc, getDocs, query, setDoc, where } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { UserSchema } from "@/lib/schema/user";

const RegisterUserService = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (req.method !== "POST") {
      return res.status(405).json({
        message: "Method not allowed. Use POST instead.",
      });
    }

    const { email, password, name } = req.body;

    // Validation des champs requis
    if (!email || !password || !name) {
      return res.status(400).json({
        message: "Missing required parameters: email, password, or name.",
      });
    }

    // Validation de l'email
    if (!validator.isEmail(email)) {
      return res.status(400).json({
        message: "Entrez un email valide",
        type:"danger"
      });
    }

    // Validation du mot de passe (exemple: longueur minimale)
    if (password.length < 6) {
      return res.status(400).json({
        message: "Password must be at least 6 characters long.",
        type : "danger"
      });
    }

    // Hashage du mot de passe
    const hashedPassword = await bcrypt.hash(password, 10);

    // Création du document utilisateur
    const UserDoc = {
      email: email.toLowerCase(), // Normalisation de l'email
      password: hashedPassword,
      name,
      id:email.toLowerCase(),
      role: "user",
      created_at: new Date(), // Ajout d'une date de création
    };
    const validateData = UserSchema.parse(UserDoc)
    const q = query(collection(db, "users"), where("email", "==", email))
    const querySnapshot = await getDocs(q);
    if (!querySnapshot.empty) {
      return res.status(403).json({
        message : 'Cet email est déjà utilisé',
        type:"danger",
      })
    }
    // Enregistrement dans Firestore
    await setDoc(doc(db, "users", UserDoc.id), validateData);

    return res.status(201).json({
      message: "Félicitations, votre compte a été créer !",
      type:"success"
    });
  } catch (error : any ) {
    return res.status(500).json({
      message: "Internal server error.",
      type:"danger",
      error: error.message,
    });
  }
};

export default RegisterUserService;
