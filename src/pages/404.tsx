/* eslint-disable react/no-unescaped-entities */
// pages/404.tsx

import ThemedText from "@/utilities/typography";
import Image from "next/image";
import Link from "next/link";

const NotFound = () => {
  return (
    <>
        <div className="flex flex-col justify-between items-center py-6">
          <ThemedText className='text-center font-bold' variant="heading-1" color="primary"> Erreur : Cette page est introuvable ou n'existe pas</ThemedText>
          <Image src={'/images/error404.png'} alt="error-image" width={500} height={200}></Image>
          <Link href={'/'} className="text-primary font-bold">Retourner sur la page d'acceuil</Link>
        </div>
    </>
  );
};

export default NotFound;
