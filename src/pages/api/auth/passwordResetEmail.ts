import nodemailer from "nodemailer";
import mjml2html from "mjml";
import { NextApiRequest, NextApiResponse } from "next";
import { db } from "@/lib/firebase";
import { doc, setDoc } from "firebase/firestore";
import { v4 as uid } from "uuid";

// Fonction API pour envoyer un email
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Méthode non autorisée" });
  }

  const { to, subject, username } = req.body;

  if (!to || !username) {
    return res.status(400).json({ message: "Email et username sont requis" });
  }

  try {
    // Générer un token unique pour la vérification
    const password_verification_token = uid();
    const expiration = new Date();
    expiration.setHours(expiration.getHours() + 1);

    // Enregistrer le token dans Firestore
    await setDoc(doc(db, "password_verification_token", password_verification_token), {
      token: password_verification_token,
      user_id: to,
      created_at: new Date().toISOString(),
      expiration: expiration.toISOString(),
    });

    // Générer le lien de vérification
    const action_url = `${process.env.NEXT_PUBLIC_BASE_URL}/auth/password-verify?token=${password_verification_token}`;

    // Contenu MJML avec des variables dynamiques
    const mjmlTemplate = `
<mjml>
  <mj-head>
    <mj-preview>Réinitialisez votre mot de passe sur ULearning</mj-preview>
    <mj-style inline="inline">
      .button { 
        background-color: #FF5722; 
        border-radius: 5px; 
        padding: 15px 25px; 
        color: white; 
        text-decoration: none; 
        font-weight: bold; 
        display: inline-block; 
      }
      .footer-link {
        color: #888888;
        text-decoration: none;
        font-size: 14px;
      }
    </mj-style>
  </mj-head>
  <mj-body>
    <mj-section background-color="#f4f4f4" padding="20px">
      <mj-column>
        <mj-image width="150px" src="https://cloud.appwrite.io/v1/storage/buckets/67773cfd002d838e494a/files/67773d65003785beb66c/view?project=67773b3400015b0d3fc3&project=67773b3400015b0d3fc3&mode=admin" alt="ULearning Logo" />
        <mj-divider border-color="#e0e0e0" />
        <mj-text font-size="20px" font-family="Helvetica" align="center" color="#333333" font-weight="bold">
          Réinitialisez votre mot de passe
        </mj-text>
        <mj-text font-size="16px" font-family="Helvetica" align="center" color="#555555">
          Bonjour {{username}}, nous avons reçu une demande de réinitialisation de votre mot de passe. Cliquez sur le bouton ci-dessous pour définir un nouveau mot de passe.
        </mj-text>
        <mj-button href="{{action_url}}" background-color="#FF5722" color="white" font-size="16px" padding="10px 25px" border-radius="5px">
          Réinitialiser mon mot de passe
        </mj-button>
        <mj-text font-size="14px" font-family="Helvetica" align="center" color="#777777">
          Si vous n’avez pas fait cette demande, vous pouvez ignorer cet email.
        </mj-text>
      </mj-column>
    </mj-section>
    <mj-section background-color="#fafafa" padding="10px">
      <mj-column>
        <mj-text font-size="14px" font-family="Helvetica" align="center" color="#999999">
          ULearning | <a href="{{helpLink}}" class="footer-link">Centre d’aide</a> | <a href="{{unsubscribeLink}}" class="footer-link">Se désabonner</a>
        </mj-text>
      </mj-column>
    </mj-section>
  </mj-body>
</mjml>`;

    // Injecter les variables dynamiques dans le MJML
    const variables: { [key: string]: string } = {
        username,
        action_url,
        helpLink: `${process.env.NEXT_PUBLIC_BASE_URL}/help`,
        unsubscribeLink: `${process.env.NEXT_PUBLIC_BASE_URL}/unsubscribe`,
      };
  
      // Injecter les variables dynamiques dans le MJML
      const mjmlWithVariables = mjmlTemplate.replace(/{{(.*?)}}/g, (_, key) => variables[key.trim()] || "");
    // Convertir MJML en HTML
    const { html } = mjml2html(mjmlWithVariables);

    // Configuration de Nodemailer
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.NEXT_PUBLIC_EMAIL_USER, // Ton email
        pass: process.env.NEXT_PUBLIC_EMAIL_PASS, // Mot de passe d'application Gmail
      },
    });

    // Envoyer l'email
    await transporter.sendMail({
      from: `"ULearning" <${process.env.NEXT_PUBLIC_EMAIL_USER}>`,
      to,
      subject,
      html,
    });

    // Réponse de succès
    res.status(200).json({ message: "Email envoyé avec succès !", status : "success" });
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de l'envoi de l'email." , error : error , status : "danger" });
  }
}
