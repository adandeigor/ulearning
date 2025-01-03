import { z } from "zod";

// Base Schema
const BaseSchema = z.object({
  id: z.string().uuid().optional(),
  created_at: z.date(),
  updated_at: z.date().optional(),
});

// Category Schema
export const CategorySchema = BaseSchema.extend({
  name: z.string(),
  description: z.string().optional(),
});

// Videos Schema
export const VideosSchema = BaseSchema.extend({
  title: z.string(),
  url: z.string().url(),
  duration: z.number(),
});

// Courses Schema
export const CourseSchema = z.object({
  id: z.string().uuid().optional(),
  title: z.string(),
  content: z.string(),
  skill_id: z.string().uuid(), // Référence à une compétence
  image: z.string().url().optional(),
  videos: z.array(z.string().uuid()).optional(), // URLs des vidéos associées
  downloadable_files: z.array(z.string().url()).optional(), // URLs des fichiers PDF ou autres supports
  created_at: z.date().default(() => new Date()),
  updated_at: z.date().optional(),
});

// Skills Schema
export const SkillsSchema = BaseSchema.extend({
  name: z.string(),
  description: z.string(),
  color: z.string(),
  category: z.string().uuid(), // Référence à une catégorie
  level: z.enum(["debutant", "amateur", "master"]).default("debutant"),
  courses: z.array(z.string().uuid()).optional(), // Référence aux IDs des cours
});

// Statistics Schema
export const StatisticsSchema = z.object({
  user_id: z.string().uuid(),
  totalCoursesCompleted: z.number().default(0),
  successRate: z.number().min(0).max(100).default(0),
  totalTestsPassed: z.number().default(0),
  totalPointsEarned: z.number().default(0),
  badgesEarned: z.array(z.string()).optional(),
  updated_at: z.date().default(() => new Date()),
});

// Comment Schema
export const CommentSchema = z.object({
  id: z.string().uuid(),
  course_id: z.string().uuid(),
  user_id: z.string().uuid(),
  message: z.string(),
  parent_id: z.string().uuid().nullable(),
  created_at: z.date().default(() => new Date()),
  updated_at: z.date().optional(),
});

// Challenge Schema
export const ChallengeSchema = z.object({
  id: z.string().uuid(),
  title: z.string(),
  description: z.string(),
  skill_id: z.string().uuid(),
  participants: z.array(z.string().uuid()),
  start_date: z.date(),
  end_date: z.date(),
  points: z.number().default(0),
  created_at: z.date().default(() => new Date()),
  updated_at: z.date().optional(),
});

export const ProjectSchema = z.object({
  id: z.string().uuid(),
  title: z.string(),
  description: z.string(),
  skill_id: z.string().uuid(), // Référence à une compétence
  members: z.array(z.string().uuid()), // Liste des membres (utilisateurs)
  progress: z.number().min(0).max(100).default(0), // Progression en %
  created_at: z.date().default(() => new Date()),
  updated_at: z.date().optional(),
});

export const CertificationSchema = z.object({
  id: z.string().uuid(),
  user_id: z.string().uuid(), // Référence à un utilisateur
  course_id: z.string().uuid(), // Référence à un cours
  date_issued: z.date().default(() => new Date()),
  expiry_date: z.date().nullable(), // Date d'expiration (facultatif)
  certificate_url: z.string().url(), // URL du certificat téléchargeable
});

export type CertificationType = z.infer<typeof CertificationSchema>;
export type ChallengeType = z.infer<typeof ChallengeSchema>;
export type ProjectType = z.infer<typeof ProjectSchema>;
export type CommentType = z.infer<typeof CommentSchema>;
export type StatisticsType = z.infer<typeof StatisticsSchema>;
export type SkillsType = z.infer<typeof SkillsSchema>;
export type CoursesType = z.infer<typeof CourseSchema>;
export type VideosType = z.infer<typeof VideosSchema>;
export type CategoryType = z.infer<typeof CategorySchema>;
