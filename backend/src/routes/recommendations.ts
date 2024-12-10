import { Router } from 'express';

import { generateRecommendations } from '@/controllers/recommendations-controller';

const router = Router();
router.post('/', generateRecommendations);

export default router;
