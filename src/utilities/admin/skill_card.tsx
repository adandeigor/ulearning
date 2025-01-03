import React from 'react';
import { AnimatePresence, motion } from "framer-motion";
import ThemedText from "../typography";
import { FaFilePen } from "react-icons/fa6";
import { GoTrash } from "react-icons/go";

interface SkillCardProps {
  id: string;
  name: string;
  color: string;
  category: string;
  onEdit: () => void;
  onDelete: () => void;
}

const SkillCard: React.FC<SkillCardProps> = ({ id, name, color, category, onEdit, onDelete }) => {
  return (
    <AnimatePresence>
      <motion.div
        key={id}
        className="relative flex flex-col items-center gap-4 p-4 bg-white shadow-md rounded-lg hover:shadow-lg transition-shadow"
        whileHover={{ scale: 1.05 }}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9 }}
      >
        {/* Skill Color Indicator */}
        <div
          className="w-full h-[50px] rounded"
          style={{ backgroundColor: color }}
        ></div>

        {/* Skill Name */}
        <ThemedText color="dark" variant="title" className="font-medium">
          {name}
        </ThemedText>

        {/* Skill category */}
        <ThemedText color="gray" variant="small-text" className="text-center">
          {category}
        </ThemedText>

        {/* Action Buttons */}
        <div className="flex gap-10">
          <button onClick={onEdit} className="flex items-center gap-1 text-primary">
            <FaFilePen />
          </button>
          <button onClick={onDelete} className="flex items-center gap-1 text-red">
            <GoTrash />
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default SkillCard;