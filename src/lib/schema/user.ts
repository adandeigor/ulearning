import { z } from "zod";

// Schéma utilisateur
export const UserSchema = z.object({
  id: z.string(),
  name: z.string(),
  password: z.string(),
  email: z.string().email("Entrez un email valide"),
  role: z.enum(["admin", "user"]).default("user"),
  wishList: z.array(z.string()).nullable().optional(),
  created_at: z
    .union([z.date(), z.string()])
    .transform((value) =>
      typeof value === "string" ? new Date(value) : value
    ),
});

// Schéma de progression d'une compétence
export const SkillProgressSchema = z.object({
  skill_id: z.string().uuid(), // Lien vers l'identifiant de la compétence
  completed: z.boolean().default(false),
  videosWatchedCount: z.number().default(0), // Nombre total de vidéos regardées
  lastVideoWatched: z.string().nullable(), // null si aucune vidéo
  lastUpdated: z
    .union([z.date(), z.string()])
    .transform((value) =>
      typeof value === "string" ? new Date(value) : value
    ),
});


// Schéma de progression utilisateur
export const UserProgressSchema = z.object({
  user_id: z.string().uuid(),
  skill_progress: z.array(SkillProgressSchema), // Une liste de progressions liées aux compétences
});


export const GlobalGamificationSchema = z.object({
  user_id: z.string().uuid(), // Identifiant unique de l'utilisateur
  points: z.number().default(0), // Points totaux accumulés
  level: z.number().default(1), // Niveau global
  badges: z.array(z.string()).default([]), // Liste des badges globaux
  lastUpdated: z
    .union([z.date(), z.string()])
    .transform((value) =>
      typeof value === "string" ? new Date(value) : value
    ),
});

export const SkillGamificationSchema = z.object({
  user_id: z.string().uuid(), // Identifiant unique de l'utilisateur
  skill_id: z.string().uuid(), // Identifiant de la compétence
  points: z.number().default(0), // Points pour cette compétence
  level: z.number().default(1), // Niveau atteint pour cette compétence
  badges: z.array(z.string()).default([]), // Badges liés à cette compétence
  lastUpdated: z
    .union([z.date(), z.string()])
    .transform((value) =>
      typeof value === "string" ? new Date(value) : value
    ),
});


export const QuestionSchema = z.object({
  question: z.string(),
  options: z.array(z.string()), // Options de réponse
  answer: z.number(), // Index de la bonne réponse (dans options)
});

export const TestSchema = z.object({
  id: z.string().uuid(),
  course_id: z.string().uuid(), // Identifiant de la compétence associée
  title: z.string(),
  questions: z.array(QuestionSchema),
  created_at: z
    .union([z.date(), z.string()])
    .transform((value) =>
      typeof value === "string" ? new Date(value) : value
    ),
});

export const NotificationSchema = z.object({
  id: z.string().uuid(),
  user_id: z.string().uuid(), // Identifiant de l'utilisateur concerné
  message: z.string(), // Contenu de la notification
  type: z.enum(["info", "progress", "reminder"]), // Type de notification
  read: z.boolean().default(false), // Si la notification a été lue
  created_at: z
    .union([z.date(), z.string()])
    .transform((value) =>
      typeof value === "string" ? new Date(value) : value
    ),
});



// Types générés
export type UserType = z.infer<typeof UserSchema>;
export type UserProgressType = z.infer<typeof UserProgressSchema>;
export type GlobalGamificationType = z.infer<typeof GlobalGamificationSchema>;
export type SkillGamificationType = z.infer<typeof SkillGamificationSchema>;
export type TestType = z.infer<typeof TestSchema>;
export type QuestionType = z.infer<typeof QuestionSchema>;
export type NotificationType = z.infer<typeof NotificationSchema>;
