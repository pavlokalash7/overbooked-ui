import { Router } from 'express';

import { getUserRecommendations } from '@/controllers/users-controller';

const router = Router();
router.get('/:user_id/recommendations', getUserRecommendations);

export default router;
