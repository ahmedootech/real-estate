import { Router, Request, Response, NextFunction } from 'express';
import { requireAuth } from '../../../common/middlewares/require-auth';
import { currentUser } from '../../../common/middlewares/current-user';
import { staffAuthRouter } from './staff';
import { userAuthRouter } from './user';

const router = Router();

router.use('/staff', staffAuthRouter);
router.use('/users', userAuthRouter);
router.get(
  '/me',
  [currentUser, requireAuth],
  async (req: Request, res: Response, next: NextFunction) => {
    res.send({ ...(req.user || null) });
  }
);

export { router as v1AuthRoutes };
