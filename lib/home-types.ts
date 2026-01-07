// ============================================
// [Security] Home Page Component Props Types
// Trinity Core: Props Validation for WordPress Data
// ============================================

import { z } from 'zod';

// ============================================
// Hero Section
// ============================================
export const HeroSectionSchema = z.object({
  title: z.string(),
  subtitle: z.string().optional(),
  description: z.string().optional(),
  ctaText: z.string().optional(),
  ctaUrl: z.string().optional(),
});

export type HeroSectionProps = z.infer<typeof HeroSectionSchema>;

// ============================================
// Feature Grid
// ============================================
export const FeatureItemSchema = z.object({
  title: z.string(),
  description: z.string(),
  icon: z.string().optional(),
});

export const FeatureGridSchema = z.object({
  title: z.string().optional(),
  features: z.array(FeatureItemSchema),
});

export type FeatureGridProps = z.infer<typeof FeatureGridSchema>;
export type FeatureItem = z.infer<typeof FeatureItemSchema>;

// ============================================
// Services Tabs
// ============================================
export const ServiceTabSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  content: z.string(),
});

export const ServicesTabsSchema = z.object({
  title: z.string().optional(),
  tabs: z.array(ServiceTabSchema),
});

export type ServicesTabsProps = z.infer<typeof ServicesTabsSchema>;
export type ServiceTab = z.infer<typeof ServiceTabSchema>;

// ============================================
// FAQ Section
// ============================================
export const FaqItemSchema = z.object({
  question: z.string(),
  answer: z.string(),
});

export const FaqSectionSchema = z.object({
  title: z.string().optional(),
  faqs: z.array(FaqItemSchema),
});

export type FaqSectionProps = z.infer<typeof FaqSectionSchema>;
export type FaqItem = z.infer<typeof FaqItemSchema>;

