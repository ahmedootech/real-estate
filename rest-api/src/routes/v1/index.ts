import { Router } from 'express';
import { v1StaffRoutes } from './staff';
import { v1AuthRoutes } from './auth';
import { v1LocationRoutes } from './location';

const router = Router();

router.use('/auth', v1AuthRoutes);
router.use('/staffs', v1StaffRoutes);
router.use('/location', v1LocationRoutes);
export { router as v1Routes };
