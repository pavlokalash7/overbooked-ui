import { z } from 'zod';

export const RecommendationValidator = z.object({
  user_id: z.string(),
  preferences: z.array(z.string()).min(1),
});

export type RecommendationSchema = z.infer<typeof RecommendationValidator>;
