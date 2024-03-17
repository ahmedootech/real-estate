import { Router, Request, Response, NextFunction } from 'express';
import { validateRequest } from '../../../common/middlewares/validate-request';
import { FieldValidationError, body } from 'express-validator';
import jwt from 'jsonwebtoken';
import { BadRequestError } from '../../../common/errors/bad-request-error';
import { requireAuth } from '../../../common/middlewares/require-auth';
import { authorization } from '../../../common/middlewares/authorization';
import { currentUser } from '../../../common/middlewares/current-user';
import { PasswordManager } from '../../../services/password-manager';
import { NotFoundError } from '../../../common/errors/not-found-error';
import { Staff } from '../../../models/v1/staff';
import { RequestValidationError } from '../../../common/errors/request-validation-error';

const router = Router();

router.post(
  '/register',
  [
    body('firstName')
      .trim()
      .notEmpty()
      .withMessage('First name cannot be empty'),
    body('lastName').trim().notEmpty().withMessage('Last name cannot be empty'),
    body('gender').notEmpty().withMessage('Gender not selected'),
    body('phone').notEmpty().withMessage('Phone number required'),
    body('address').notEmpty().withMessage('Staff address is required'),
    body('role').notEmpty().withMessage('Staff role is required'),
    body('username').trim().notEmpty().withMessage('Username cannot be empty'),
    body('password')
      .trim()
      .isLength({ min: 4, max: 8 })
      .withMessage('Password must be between 4 to 8 characters'),
  ],
  [
    validateRequest,
    currentUser,
    requireAuth,
    authorization(['Manager', 'Admin']),
  ],
  async (req: Request, res: Response) => {
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

    const existingUsername = await Staff.findOne({ username });
    if (existingUsername)
      throw new RequestValidationError([
        {
          msg: 'username already exist',
          path: 'username',
        } as FieldValidationError,
      ]);

    const staff = Staff.build({
      firstName,
      lastName,
      gender,
      phone,
      address,
      role,
      username,
      password,
    });
    await staff.save();

    res.status(201).send(staff);
  }
);

router.post(
  '/login',
  [
    body('username').notEmpty().withMessage('You must supply a username'),
    body('password').notEmpty().withMessage('You must supply a password'),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { username, password } = req.body;

    const existingStaff = await Staff.findOne({
      username,
      status: 'Active',
    });

    if (!existingStaff) throw new BadRequestError('Invalid credentials');

    const passwordsMatch = await PasswordManager.compare(
      existingStaff.password,
      password
    );

    if (!passwordsMatch) throw new BadRequestError('Invalid credentials');

    // Generate JWT
    const userJwt = jwt.sign(
      {
        id: existingStaff.id,
        name: `${existingStaff.firstName} ${existingStaff.lastName}`,
        username: existingStaff.username,
        role: existingStaff.role,
      },
      process.env.JWT_KEY!
    );

    res.status(200).send({ jwt: userJwt });
  }
);

export { router as staffAuthRouter };
