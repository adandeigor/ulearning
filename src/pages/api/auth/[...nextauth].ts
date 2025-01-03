/* eslint-disable @typescript-eslint/no-explicit-any */
import { db } from "@/lib/firebase"; // Chemin vers ton fichier Firebase
import { doc, getDoc } from "firebase/firestore"; // Import Firestore
import bcrypt from "bcrypt"; // Pour comparer les mots de passe
import CredentialsProvider from "next-auth/providers/credentials";
import NextAuth from "next-auth";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Connexion",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Mot de passe", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) {
          throw new Error("Veuillez fournir un email et un mot de passe.");
        }
        // Recherche de l'utilisateur dans Firestore
        const docRef = doc(db, "users", credentials.email);
        const docSnap = await getDoc(docRef);
        if (!docSnap.exists()) {
          throw new Error("Utilisateur introuvable.");
        }

        const userData = docSnap.data();

        // Vérification du mot de passe
        const isPasswordValid = await bcrypt.compare(
          credentials.password,
          userData.password // Champ contenant le mot de passe haché
        );

        if (!isPasswordValid) {
          throw new Error("Mot de passe incorrect.");
        }

        // Retourner uniquement les données nécessaires
        return {
          id: credentials.email,
          name: userData.name,
          email: userData.email,
          role: userData.role || "user", // Par défaut, rôle utilisateur
        };
      },
    }),
  ],
  callbacks: {
    async session({ session, token }: { session: any; token: any }) {
      // Ajout d'informations supplémentaires à la session utilisateur
      session.user = {
        id: token.id,
        email: token.email,
        name: token.name,
        role: token.role,
      };
      return session;
    },

    async jwt({ token, user }:any) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;
        token.role = user.role;
      }
      return token;
    },
  },
  pages: {
    signIn: "/auth/login", 
    signOut: "/auth/signout", 
    error: "/auth/error", 
    verifyRequest: "/auth/verify-request", 
  },
  secret: process.env.NEXTAUTH_SECRET !, 
  session: {
    jwt: true, // Utiliser JWT pour la session
    maxAge: 60 * 60, // 1 heure (en secondes)
    updateAge: 60 * 60, // Mettre à jour la session toutes les heures
  },
  jwt: {
    secret: process.env.NEXTAUTH_SECRET,
    maxAge: 60 * 60, // 1 heure
  },
};

export default NextAuth(authOptions);
