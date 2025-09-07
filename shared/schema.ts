import { z } from "zod";

// Service schema
export const serviceSchema = z.object({
  id: z.string(),
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  features: z.array(z.string()),
  price: z.string(),
  icon: z.string(),
  popular: z.boolean().default(false),
  createdAt: z.number().default(() => Date.now()),
});

export const insertServiceSchema = serviceSchema.omit({ id: true, createdAt: true });

// Portfolio schema
export const portfolioSchema = z.object({
  id: z.string(),
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  imageUrl: z.string().url("Invalid image URL"),
  tags: z.array(z.string()),
  category: z.string(),
  createdAt: z.number().default(() => Date.now()),
});

export const insertPortfolioSchema = portfolioSchema.omit({ id: true, createdAt: true });

// Testimonial schema
export const testimonialSchema = z.object({
  id: z.string(),
  name: z.string().min(1, "Name is required"),
  position: z.string().min(1, "Position is required"),
  content: z.string().min(1, "Content is required"),
  rating: z.number().min(1).max(5),
  createdAt: z.number().default(() => Date.now()),
});

export const insertTestimonialSchema = testimonialSchema.omit({ id: true, createdAt: true });

// FAQ schema
export const faqSchema = z.object({
  id: z.string(),
  question: z.string().min(1, "Question is required"),
  answer: z.string().min(1, "Answer is required"),
  order: z.number().default(0),
  createdAt: z.number().default(() => Date.now()),
});

export const insertFaqSchema = faqSchema.omit({ id: true, createdAt: true });

// Admin user schema
export const adminUserSchema = z.object({
  id: z.string(),
  username: z.string().min(1, "Username is required"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export const insertAdminUserSchema = adminUserSchema.omit({ id: true });

// Type exports
export type Service = z.infer<typeof serviceSchema>;
export type InsertService = z.infer<typeof insertServiceSchema>;
export type Portfolio = z.infer<typeof portfolioSchema>;
export type InsertPortfolio = z.infer<typeof insertPortfolioSchema>;
export type Testimonial = z.infer<typeof testimonialSchema>;
export type InsertTestimonial = z.infer<typeof insertTestimonialSchema>;
export type FAQ = z.infer<typeof faqSchema>;
export type InsertFAQ = z.infer<typeof insertFaqSchema>;
export type AdminUser = z.infer<typeof adminUserSchema>;
export type InsertAdminUser = z.infer<typeof insertAdminUserSchema>;
