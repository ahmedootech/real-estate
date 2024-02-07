import { Router, Request, Response, NextFunction } from 'express';
import { body } from 'express-validator';
import { BadRequestError } from '../../common/errors/bad-request-error';
import { NotFoundError } from '../../common/errors/not-found-error';
import { authorization } from '../../common/middlewares/authorization';
import { currentUser } from '../../common/middlewares/current-user';
import { requireAuth } from '../../common/middlewares/require-auth';
import { validateRequest } from '../../common/middlewares/validate-request';
import { upload } from '../../common/middlewares/file-upload';
import { Property } from '../../models/v1/property';

const router = Router();
router.post(
  '/',
  [currentUser, requireAuth, authorization(['Admin', 'Manager', 'Agent'])],
  [upload.array('images', 5)],
  [
    body('title').notEmpty().withMessage('Property name is required').trim(),
    body('price')
      .notEmpty()
      .withMessage('Property price is required')
      .isNumeric()
      .withMessage('Only numbers are allowed'),
    body('bedrooms')
      .notEmpty()
      .withMessage('No of bedrooms is required')
      .isNumeric()
      .withMessage('Only numbers are allowed'),
    body('toilets')
      .notEmpty()
      .withMessage('No of toilets is required')
      .isNumeric()
      .withMessage('Only numbers are allowed'),
    body('sittingRooms').isNumeric().withMessage('Only numbers are allowed'),
    body('state').notEmpty().withMessage('State is required').trim(),
    body('lga').notEmpty().withMessage('Lga is required').trim(),
    body('ward').notEmpty().withMessage('Ward is required').trim(),
    body('area').notEmpty().withMessage('Area is required').trim(),
    body('houseNoStreet')
      .notEmpty()
      .withMessage('House no & street is required')
      .trim(),
    body('description').notEmpty().withMessage('Description is required'),
  ],

  [validateRequest, currentUser, requireAuth],
  async (req: Request, res: Response) => {
    const {
      title,
      price,
      bedrooms,
      toilets,
      sittingRooms,
      state,
      lga,
      ward,
      area,
      houseNoStreet,
      description,
    } = req.body;

    const imageUrls = (req.files as Express.Multer.File[]).map((file) => {
      return { path: `public/images/${file.filename}` };
    });

    const property = new Property({
      title,
      price,
      bedrooms,
      toilets,
      sittingRooms,
      address: {
        state,
        lga,
        ward,
        area,
        houseNoStreet,
      },
      description,
      agent: req.user.id,
      imageURLs: imageUrls,
    });

    await property.save();

    res.status(201).json({ message: 'Property added successfully' });
  }
);

router.get(
  '/:propertyId',
  [currentUser, requireAuth, authorization(['Admin', 'Manager', 'Agent'])],
  async (req: Request, res: Response) => {
    const propertyId = req.params.propertyId
    const properties = await Property.findOne({ _id: propertyId,  agent: req.user.id }).populate([
      'address.state',
      'address.lga',
      'address.ward',
      'address.area',
    ]);
    res.send(properties);
  }
);
router.get(
  '/',
  [currentUser, requireAuth, authorization(['Admin', 'Manager', 'Agent'])],
  async (req: Request, res: Response) => {
    const properties = await Property.find({ agent: req.user.id }).populate([
      'address.state',
      'address.lga',
      'address.ward',
      'address.area',
    ]);
    res.send(properties);
  }
);


export { router as v1PropertyRoutes };
