import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { GoTrash } from 'react-icons/go';
import ThemedText from '../typography';
import ActionModal from '../modals/action_modal';
import InfoModals from '../modals/info_modals';
import { deleteCategory } from '@/query/skills';
import { FaFilePen } from 'react-icons/fa6';

interface CategoryCardProps {
  id: string;
  name: string;
  description: string;
}

const CategoryCard = ({ id, name, description }: CategoryCardProps) => {
  const [open, setOpen] = useState(false);
  const [endMessage, setEndMessage] = useState('');

  const toggleOpen = () => setOpen(!open);

  const DeleteToggle = async () => {
    setOpen(false);
    await deleteCategory(id);
    setEndMessage('Catégorie supprimée avec succès');
  };

  return (
    <>
      <AnimatePresence>
        {!endMessage && (
          <motion.div
            className="flex flex-col max-w-[300px] justify-between items-center gap-[20px] p-6 rounded shadow-lg bg-silver"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
          >
            <ThemedText variant="small-text" color="gray">{name}</ThemedText>
            <ThemedText variant="small-text" color="gray">{description}</ThemedText>
            <div className="flex flex-row items-center justify-between gap-20">
              <Link href={`/admin/category/update?id=${id}`} className="flex flex-row items-center justify-normal gap-2">
                <FaFilePen className="text-primary" />
                <ThemedText color="primary">Update</ThemedText>
              </Link>
              <Link href={''} onClick={toggleOpen} className="flex flex-row items-center justify-normal gap-2">
                <GoTrash color="red" />
                <ThemedText color="red">Delete</ThemedText>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      {open && (
        <ActionModal
          title="Suppression"
          type="danger"
          accept_action={DeleteToggle}
          accept_placeholder="Oui"
          refuse_placeholder="Annuler"
          refuse_action={() => setOpen(false)}
        >
          Voulez-vous supprimer cette catégorie ?
        </ActionModal>
      )}
      {endMessage && (
        <InfoModals title="Message" type="success" duration={2}>
          {endMessage}
        </InfoModals>
      )}
    </>
  );
};

export default CategoryCard;    