import { UpdateUserCredentials } from '@/query/user';
import ThemedInputs from '@/utilities/forms/input';
import ActionModal from '@/utilities/modals/action_modal';
import InfoModals from '@/utilities/modals/info_modals';
import ThemedText from '@/utilities/typography';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { FieldValues, useForm } from 'react-hook-form';
import bcrypt from 'bcryptjs';
import ThemedButton from '@/utilities/button';

const VerifyPage = () => {
  const router = useRouter();
  const { token } = router.query; // Récupère le token de l'URL
  const [status, setStatus] = useState<'loading' | 'success' | 'danger' | ''>('');
  const [userId, setUserId] = useState<string | null>(null); // État pour stocker le user_id
  const [message, setMessage] = useState<string>('');
  const [isDone, setIsDone] = useState('');
  const [updateMessage, setUpdateMessage] = useState('');
  const [isEnd, setIsEnd] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset
  } = useForm()

  useEffect(() => {
    if (!token) return; // Attends que le token soit présent
    const verifyToken = async () => {
      try {
        const response = await fetch('/api/auth/verify-password-Token', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ token }),
        });

        if (response.ok) {
          const data = await response.json(); // Extraire les données JSON
          console.log(data); // Vérifie le contenu retourné dans la console
          setUserId(data.user_id); // Stocke le user_id
          setStatus(data.status); // Stocke le status
          setMessage(data.message); // Stocke le message
        } else {
          // Gérer les erreurs en fonction du code d'erreur
          if (response.status === 401) {
            setStatus('danger');
            setMessage("Token invalide ou expiré");
          } else {
            setStatus('danger');
            setMessage("Erreur lors de la vérification de token");
          }
        }
      } catch (err) {
        setStatus('danger');
        setMessage("Erreur lors de la vérification de token :" + err);
      }
    };
    verifyToken();
  }, [token]);

  if (status === 'loading') {
    return (
      <InfoModals type='info' title='Message'>
        Vérification en cours...
      </InfoModals>
    );
  }

  if (status === 'danger') {
    return (
      <ActionModal type='danger' title='Erreur' accept_action={() => router.push('/auth/reset-password')} accept_placeholder='Réessayer' refuse_placeholder='Annuler'>
        {message}
      </ActionModal>
    );
  }

  if (status === 'success') {

    const onSubmit = async(data:FieldValues)=>{
      setIsSubmitting(true);
      const hashedPassword = await bcrypt.hash(data.password, 10);
      const result = await UpdateUserCredentials(userId as string, {password : hashedPassword});
      reset()
      if(result == true){
        setIsSubmitting(false);
        setIsEnd(true);
        setIsDone('success');
        setUpdateMessage('Mot de passe modifié avec succès');
      }else{
        setIsSubmitting(false);
        setIsEnd(true)
        setIsDone('danger');
        setUpdateMessage('Erreur lors de la modification du mot de passe');
      }
    }
    return (
      <>
         <div className='max-w-2xl mx-auto'>
          <ThemedText variant='heading-3' color='primary' className='text-center'>Modification de votre mot de passe</ThemedText>
          <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col justify-normal gap-6'>
            <ThemedInputs
            type='password'
            placeholder='Nouveau mot de passe'
            name='password'
            errorText='Le mot de passe est requis et est de 6 caractères minimum'
            isRequired={true}
            register={register}
            errors={errors}
            label='Nouveau mot de passe'
            disabled = {isSubmitting}
            minLength={6}
            >
            </ThemedInputs>
            <ThemedButton type='submit'>Modifier</ThemedButton>
          </form>
         </div>
         {
          isEnd && 
            <ActionModal type={isDone as 'success' | 'danger'} title='Message' accept_action={() => router.push('/auth/login')} accept_placeholder='Se connecter' refuse_placeholder='Annuler'>
                {updateMessage}
            </ActionModal>
         }
      </>
    );
  }
  return (
    <>
      <InfoModals type='info' title='Information'>
        Veuillez patienter...
      </InfoModals>
    </>
  );
};

export default VerifyPage;
