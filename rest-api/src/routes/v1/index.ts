import { Router } from 'express';
import { v1StaffRoutes } from './staff';
import { v1AuthRoutes } from './auth';
import { v1LocationRoutes } from './location';
import { v1PropertyRoutes } from './property';

const router = Router();

router.use('/auth', v1AuthRoutes);
router.use('/staffs', v1StaffRoutes);
router.use('/location', v1LocationRoutes);
router.use('/properties', v1PropertyRoutes);
export { router as v1Routes };
