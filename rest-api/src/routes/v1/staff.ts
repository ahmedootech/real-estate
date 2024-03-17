import { Request, Response, Router } from 'express';
import { StaffRoles } from '../../common/types/staff-roles';
import { currentUser } from '../../common/middlewares/current-user';
import { requireAuth } from '../../common/middlewares/require-auth';
import { authorization } from '../../common/middlewares/authorization';
import { Staff } from '../../models/v1/staff';
import { RequestValidationError } from '../../common/errors/request-validation-error';
import { FieldValidationError } from 'express-validator';

const router = Router();

router.get(
  '/',
  [currentUser, requireAuth, authorization(['Admin', 'Manager'])],
  async (req: Request, res: Response) => {
    const staffs = await Staff.find({}).limit(20);
    res.json(staffs);
  }
);

router.put('/:staffId', async (req: Request, res: Response) => {
  const { staffId } = req.params;
  const {
    firstName,
    lastName,
    gender,
    phone,
    address,
    role,
    username,
    password,
  } = req.body;

  // const existingUsername = await Staff.findOne({ username });
  // if (existingUsername)
  //   throw new RequestValidationError([
  //     {
  //       msg: 'username already exist',
  //       path: 'username',
  //     } as FieldValidationError,
  //   ]);
  const staff = await Staff.findByIdAndUpdate(
    staffId,
    {
      firstName,
      lastName,
      gender,
      phone,
      address,
      role,
      // username, 
      // password,
    },
    { new: true }
  );

  res.send(staff);
});

router.get('/roles', (req: Request, res: Response) => {
  const roles = Object.values(StaffRoles);
  res.json(roles);
});

export { router as v1StaffRoutes };
