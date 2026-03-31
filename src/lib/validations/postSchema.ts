import { z } from "zod";

export const postSchema = z.object({
  title: z
    .string()
    .min(5, "Title must be at least 5 characters")
    .max(100, "Title must not exceed 100 characters")
    .trim(),
  content: z
    .string()
    .min(20, "Content must be at least 20 characters")
    .max(5000, "Content must not exceed 5000 characters"),
  category: z.enum(["quantum-gravity", "metamaterials", "peer-reviewed", "hfgw"]),
  author: z.string().optional(),
});

export type PostInput = z.infer<typeof postSchema>;
