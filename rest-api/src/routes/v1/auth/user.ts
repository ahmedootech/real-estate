import { Router, Request, Response, NextFunction } from 'express';
import { validateRequest } from '../../../common/middlewares/validate-request';
import { body } from 'express-validator';
import jwt from 'jsonwebtoken';
import { BadRequestError } from '../../../common/errors/bad-request-error';
import { requireAuth } from '../../../common/middlewares/require-auth';
import { authorization } from '../../../common/middlewares/authorization';
import { currentUser } from '../../../common/middlewares/current-user';
import { PasswordManager } from '../../../services/password-manager';
import { RequestValidationError } from '../../../common/errors/request-validation-error';
import { FieldValidationError, ValidationError } from 'express-validator';
import { User } from '../../../models/v1/user';

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
    body('address').notEmpty().withMessage('User address is required'),
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
    const { firstName, lastName, gender, phone, address, username, password } =
      req.body;
    const existingUser = await User.findOne({ username });
    if (existingUser)
      throw new RequestValidationError([
        {
          msg: 'Username already exist',
          path: 'username',
        } as FieldValidationError,
      ]);
    const user = User.build({
      firstName,
      lastName,
      gender,
      phone,
      address,
      username,
      password,
    });
    await user.save();

    res.status(201).send(user);
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

    const existingUser = await User.findOne({
      username,
      status: 'Active',
    });

    if (!existingUser) throw new BadRequestError('Invalid credentials');

    const passwordsMatch = await PasswordManager.compare(
      existingUser.password,
      password
    );

    if (!passwordsMatch) throw new BadRequestError('Invalid credentials');

    // Generate JWT
    const userJwt = jwt.sign(
      {
        id: existingUser.id,
        name: `${existingUser.firstName} ${existingUser.lastName}`,
        username: existingUser.username,
      },
      process.env.JWT_KEY!
    );

    res.status(200).send({ jwt: userJwt });
  }
);

export { router as userAuthRouter };
