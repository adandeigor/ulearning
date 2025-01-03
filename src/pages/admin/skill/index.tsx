import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import ThemedText from "@/utilities/typography";
import AdminPanel from "..";
import ThemedButton from "@/utilities/button";
import ThemedInputs from "@/utilities/forms/input";
import { FieldValues, useForm } from "react-hook-form";
import ThemedTextArea from "@/utilities/forms/textarea";
import { deleteSkill, getCategory, getSkills, SetSKills, updateSkill } from "@/query/skills";
import { DocumentData } from "firebase/firestore";
import SelectForm from "@/utilities/forms/select";
import SkillCard from "@/utilities/admin/skill_card";
import InfoModals from "@/utilities/modals/info_modals";
import ActionModal from "@/utilities/modals/action_modal";

const SkillsComponent = () => {
  const { register, formState: { errors }, reset, handleSubmit } = useForm();

  const [categories, setCategory] = useState<{ id: string; name: string }[]>([]);
  const [skills, setSkillsState] = useState<DocumentData[]>([]);
  const [actionMessage, setActionMessage] = useState("");
  const [currentSkill, setCurrentSkill] = useState<{
    id: string;
    name: string;
    description: string;
    category: string;
    level: string;
    color: string;
  } | null>(null);

  const [add, setAdd] = useState(false);
  const [update, setUpdate] = useState(false);
  const [action, setAction] = useState(false);
  const [info, setInfo] = useState(false);
  const [message, setMessage] = useState("");
  const [type, setType] = useState<"info" | "success" | "warning" | "danger" | undefined>(undefined);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const levels = [
    { name: "débutant", id: "débutant" },
    { name: "amateur", id: "amateur" },
    { name: "master", id: "master" },
  ];

  // Récupération des catégories et des compétences
  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedCategories = await getCategory() as DocumentData[];
        const fetchedSkills = await getSkills() as DocumentData[];
        setCategory(fetchedCategories.map(doc => ({ id: doc.id, name: doc.name })));
        setSkillsState(fetchedSkills);
      } catch {
        setMessage("Erreur lors du chargement des données");
        setType("danger");
      }
    };
    fetchData();
  }, []);

  const handleAdd = () => setAdd(!add);
  const handleUpdate = () => setUpdate(!update);
  const handleChangeValue = (
    id: string,
    name: string,
    color: string,
    category: string,
    level: string,
    description: string
  ) => {
    const updatedSkill = { id, name, color, category, level, description };
    setCurrentSkill(updatedSkill); // Mettre à jour l'état
    
    // Forcer la mise à jour des valeurs du formulaire
    reset({
      name: updatedSkill.name,
      description: updatedSkill.description,
      color: updatedSkill.color,
      category: updatedSkill.category,
      level: updatedSkill.level,
    });
  };
  const handleAction = ()=>{
    setAction(true)
  }
  const handleDeleteAction = (skill: DocumentData) => {
      const skillData = {
          id: skill.id,
          name: skill.name,
          description: skill.description,
          category: skill.category,
          level: skill.level,
          color: skill.color,
      };
      setCurrentSkill(skillData);
      handleAction()
      setActionMessage("Voulez-vous supprimer cette compétence ?");
  }

  const handleDelete = async (id: string) => {
    if (!id) return;
    try {
      const result = await deleteSkill(id);
      if (result == true) {
        setAction(false)
        setInfo(true)
        setType("success");
        setMessage("Compétence supprimée avec succès");
        setSkillsState(skills.filter(skill => skill.id !== id));
      } else {
        setType("danger");
        setMessage("Suppression échouée");
      }
    } catch {
      setType("danger");
      setMessage("Erreur lors de la suppression");
    }
  };


  const onSubmit = async (data: FieldValues) => {
    setIsSubmitting(true);
    try {
      if (update && currentSkill) {
        console.log(data);
        const result = await updateSkill(currentSkill.id, {
          name: data.name,
          description: data.description,
          color: data.color,
          level: data.level,
          category: data.category,
          updated_at: new Date(),
        });
        
        setInfo(true);
        setType(result ? "success" : "danger");
        setMessage(result ? "La compétence a été mise à jour" : "La mise à jour n'a pas pu être effectuée");
      } else {
        await SetSKills({
          name: data.name,
          description: data.description,
          color: data.color,
          level: data.level,
          created_at: new Date(),
          category: data.category,
        });
        
        setInfo(true);
        setType("success");
        setMessage("La compétence a bien été créée");
      }
    } catch {
      setInfo(true);
      setType("danger");
      setMessage(update ? "La mise à jour a échoué" : "La création a échoué");
    } finally {
      setInfo(false);
      setIsSubmitting(false);
      setAdd(false);
      setUpdate(false);
      reset();
    }
  };
  
  console.log(currentSkill)
  return (
    <AdminPanel>
      <div className="flex flex-col gap-5">
        {/* En-tête */}
        <div className="flex flex-row items-center justify-between gap-7">
          <ThemedText color="gray" variant="title">
            Compétences
          </ThemedText>
        </div>
        <div className="flex flex-row items-end justify-end">
          <ThemedButton onClick={handleAdd}>
            {add ? "Annuler" : "Ajouter une compétence"}
          </ThemedButton>
        </div>

        {/* Formulaire */}
        {(add || update) && (
          <AnimatePresence>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
                <ThemedInputs
                  type="text"
                  placeholder="Compétence"
                  name="name"
                  isRequired={true}
                  errorText="Le nom est requis"
                  disabled={isSubmitting}
                  register={register}
                  errors={errors}
                  label="Nom"
                />
                <ThemedTextArea
                  name="description"
                  isRequired={true}
                  errorText="La description est requise"
                  disabled={isSubmitting}
                  label="Description"
                  register={register}
                  errors={errors}
                />
                <SelectForm
                  id="category"
                  label="Catégorie"
                  options={categories}
                  register={register}
                  errors={errors}
                />
                <SelectForm
                  id="level"
                  label="Niveau"
                  options={levels}
                  register={register}
                  errors={errors}
                />
                <div className="flex flex-col gap-2">
                  <label htmlFor="color" className="text-sm font-semibold">
                    Couleur
                  </label>
                  <input
                    type="color"
                    id="color"
                    {...register("color", { required: "Ce champ est obligatoire" })}
                    className="w-full h-10 p-1 border rounded"
                  />
                  {errors.color?.message && (
                    <span className="text-red text-small-text">{String(errors.color.message)}</span>
                  )}
                </div>
                <ThemedButton type="submit" state={isSubmitting ? "disabled" : "useable"}>
                  {update ? "Modifier" : "Créer"}
                </ThemedButton>
              </form>
            </motion.div>
          </AnimatePresence>
        )}
        {/* Liste des compétences */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {skills.map((skill) => (
            <SkillCard
              key={skill.id}
              id={skill.id}
              name={skill.name}
              color={skill.color}
              category={
                categories.find((category) => category.id === skill.category)?.name || "Non défini"
              }
              onEdit={() => {
                handleUpdate();
                handleChangeValue(skill.id, skill.name, skill.color, skill.category, skill.level, skill.description);
              }}
              onDelete={() => handleDeleteAction(skill)}
            />
          ))}
        </motion.div>

        {/* Message */}
        {(message || info) && (
          <InfoModals title="Message" type={type}>
            {message}
          </InfoModals>
        )}

        {/* Modal de confirmation de suppression */}
        {action && currentSkill && (
          <ActionModal 
            type="danger" 
            title="Suppression de compétence" 
            accept_action={() => handleDelete(currentSkill.id)} 
            accept_placeholder="Supprimer" 
            refuse_placeholder="Annuler"
          >
            {actionMessage}
          </ActionModal>
        )}
      </div>
    </AdminPanel>
  );
};

export default SkillsComponent;
