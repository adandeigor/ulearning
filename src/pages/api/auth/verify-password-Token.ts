import { db } from '@/lib/firebase';
import { doc, getDoc, deleteDoc } from 'firebase/firestore';
import { NextApiRequest, NextApiResponse } from 'next';

interface TokenData {
  user_id: string;
  expiration: string;  // Supposons que expiration soit une chaîne au format ISO 8601
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Méthode non autorisée' });
  }

  const { token } = req.body;
  if (!token) {
    return res.status(400).json({ message: 'Token manquant' });
  }

  try {
    // Récupère le document correspondant au token
    const tokenDoc = await getDoc(doc(db, 'password_verification_token', token));
    if (!tokenDoc.exists()) {
      return res.status(401).json({ message: 'Token invalide ou expiré', status : "danger" });
    }

    const tokenData = tokenDoc.data() as TokenData;

    // Vérifier si les données du token existent
    if (!tokenData || !tokenData.user_id || !tokenData.expiration) {
      return res.status(400).json({ message: 'Token mal formé' });
    }

    const { user_id, expiration } = tokenData;

    // Conversion de l'expiration en objet Date
    const expirationDate = new Date(expiration);
    const currentTime = new Date();



    // Vérifier si le token est expiré
    if (currentTime > expirationDate) {
      // Supprimer le token expiré de la base de données
      await deleteDoc(doc(db, 'password_verification_token', token));
      return res.status(401).json({ message: 'Le token a expiré', status : "danger" });
    }

    // Supprimer le token après validation
    await deleteDoc(doc(db, 'password_verification_token', token));

    // Mettre à jour l'utilisateur pour vérifier son email

    return res.status(200).json({ message: 'Email vérifié avec succès' , user_id: user_id, status : "success"});
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur serveur', status : "danger" });
  }
}
