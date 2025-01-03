import fs from 'fs';
import mjml from 'mjml'
import sendEmail from './nodemailer';

function getMjmlTemplate(filePath: string, variables: Record<string, string>): string {
  const mjmlContent = fs.readFileSync(filePath, 'utf-8');

  const mjmlWithVariables = mjmlContent.replace(/{{(.*?)}}/g, (_, variable) => variables[variable.trim()] || '');

  const { html } = mjml(mjmlWithVariables);
  return html;
}



async function mainExecute() {
    const templatePath = '../email/verify-email.mjml'; 
    
    const variables = {
      username: 'Igor',
      action_url: 'https://ton-site.com/reset-password'
    };
    
    const htmlContent = getMjmlTemplate(templatePath, variables);
  
    // Envoyer l'email
    await sendEmail('igoradande44@example.com', 'Bienvenue sur ULearning !', htmlContent);
    console.log('Email envoyé avec succès !');
  }
export default mainExecute  