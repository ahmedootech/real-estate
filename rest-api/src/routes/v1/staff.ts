import { Request, Response, Router } from 'express';
import { StaffRoles } from '../../common/types/staff-roles';
import { currentUser } from '../../common/middlewares/current-user';
import { requireAuth } from '../../common/middlewares/require-auth';
import { authorization } from '../../common/middlewares/authorization';
import { Staff } from '../../models/v1/staff';

const router = Router();

router.get(
  '/',
  [currentUser, requireAuth, authorization(['Admin', 'Manager'])],
  async (req: Request, res: Response) => {
    const staffs = await Staff.find({}).limit(20);
    res.json(staffs);
  }
);

router.get('/roles', (req: Request, res: Response) => {
  const roles = Object.values(StaffRoles);
  res.json(roles);
});

export { router as v1StaffRoutes };
