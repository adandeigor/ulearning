/* eslint-disable react/no-unescaped-entities */
import ActionModal from '@/utilities/modals/action_modal';
import InfoModals from '@/utilities/modals/info_modals';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const VerifyPage = () => {
  const router = useRouter();
  const { token } = router.query; // Récupère le token de l'URL
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');

  useEffect(() => {
    if (!token) return; // Attends que le token soit présent
    const verifyToken = async () => {
      try {
        const response = await fetch('/api/auth/verifyToken', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ token }),
        });
        if (response.ok) {
          setStatus('success');
        } else {
          setStatus('error');
        }
      } catch (err) {
        console.error(err);
        setStatus('error');
      }
    };
    verifyToken();
  }, [token]);

  if (status === 'loading') {
    return <InfoModals title="Vérification de l'email" type='info'>
      Vérification de l'email en cours...
    </InfoModals>
  }
  if (status === 'success') {
    return <ActionModal title="Email vérifié" type='success' accept_action={() => router.push('/auth/login')} accept_placeholder='Se connecter' refuse_placeholder='Fermer'>
      Votre email a été vérifié avec succès ! Vous pouvez maintenant vous connecter.
    </ActionModal>
  }
  return <ActionModal title="Erreur de vérification" type='danger' accept_action={() => router.push('/auth/verify-email')} accept_placeholder='Demander' refuse_placeholder='Fermer'>
    Le lien est invalide ou a expiré. Veuillez demander un nouveau lien de vérification.
     </ActionModal>
};

export default VerifyPage;
