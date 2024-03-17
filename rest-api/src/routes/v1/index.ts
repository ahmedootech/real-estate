import { Router } from 'express';
import { v1StaffRoutes } from './staff';
import { v1AuthRoutes } from './auth';
import { v1LocationRoutes } from './location';
import { v1PropertyRoutes } from './property';
import { v1CategoryRoutes } from './category';
import { v1InspectionRoutes } from './inspection';
import { v1DashboardRoutes } from './dashboard';

const router = Router();

router.use('/auth', v1AuthRoutes);
router.use('/staffs', v1StaffRoutes);
router.use('/location', v1LocationRoutes);
router.use('/properties', v1PropertyRoutes);
router.use('/categories', v1CategoryRoutes);
router.use('/inspections', v1InspectionRoutes);
router.use('/dashboards', v1DashboardRoutes);
export { router as v1Routes };
