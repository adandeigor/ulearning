import { db } from '@/lib/firebase';
import { doc, getDoc, deleteDoc, updateDoc } from 'firebase/firestore';
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
    const tokenDoc = await getDoc(doc(db, 'verification_token', token));
    if (!tokenDoc.exists()) {
      return res.status(404).json({ message: 'Token invalide ou expiré' });
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

    // Log des valeurs pour déboguer
    console.log('Expiration Date:', expirationDate);
    console.log('Current Time:', currentTime);

    // Vérifier si le token est expiré
    if (currentTime > expirationDate) {
      // Supprimer le token expiré de la base de données
      await deleteDoc(doc(db, 'verification_token', token));
      return res.status(400).json({ message: 'Le token a expiré' });
    }

    // Supprimer le token après validation
    await deleteDoc(doc(db, 'verification_token', token));

    // Mettre à jour l'utilisateur pour vérifier son email
    const ref = doc(db, 'users', user_id);
    await updateDoc(ref, {
      emailVerified: true,
    });

    res.status(200).json({ message: 'Email vérifié avec succès' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
}
