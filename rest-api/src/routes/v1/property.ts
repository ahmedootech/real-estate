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
import { Category } from '../../models/v1/category';
import { Area } from '../../models/v1/location.area';
import { Ward } from '../../models/v1/location.ward';
import { Lga } from '../../models/v1/location.lga';
import { State } from '../../models/v1/location.state';

interface Query {
  [key: string]: any;
}
const router = Router();
router.post(
  '/',
  [currentUser, requireAuth, authorization(['Admin', 'Manager', 'Agent'])],
  // [upload.array('images', 5)],
  upload.fields([
    { name: 'images', maxCount: 5 },
    { name: 'arModel', maxCount: 1 },
  ]),
  [
    body('title').notEmpty().withMessage('Property name is required').trim(),
    body('category').notEmpty().withMessage('Category is required').trim(),
    body('type').notEmpty().withMessage('Type is required').trim(),
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
      category,
      type,
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
    let imageUrls: { path: string }[] = [];
    let arModelUrl: { path: string } = { path: '' };

    if (req.files) {
      // Check if 'images' and 'arModel' exist in req.files
      if ('images' in req.files) {
        imageUrls = (req.files['images'] as Express.Multer.File[]).map(
          (file) => {
            return { path: `public/images/${file.filename}` };
          }
        );
      }

      if (
        'arModel' in req.files &&
        req.files['arModel'] &&
        req.files['arModel'].length > 0
      ) {
        const arModelFile = req.files['arModel'][0];
        arModelUrl = { path: `public/images/${arModelFile.filename}` };
      }
    }
    const property = Property.build({
      title,
      category,
      type,
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
      arModelUrl: arModelUrl,
    });

    await property.save();

    res.status(201).json({ message: 'Property added successfully' });
  }
);
router.put(
  '/:propertyId',
  [currentUser, requireAuth, authorization(['Admin', 'Manager', 'Agent'])],
  [upload.array('images', 5)],
  // upload.fields([
  //   { name: 'images', maxCount: 5 },
  //   { name: 'arModel', maxCount: 1 },
  // ]),
  [
    body('title').notEmpty().withMessage('Property name is required').trim(),
    body('category').notEmpty().withMessage('Category is required').trim(),
    body('type').notEmpty().withMessage('Type is required').trim(),
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

  [/*validateRequest,*/ currentUser, requireAuth],
  async (req: Request, res: Response) => {
    const { propertyId } = req.params;

    const {
      title,
      category,
      type,
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
    // let imageUrls: { path: string }[] = [];
    // let arModelUrl: { path: string } = { path: '' };

    // if (req.files) {
    //   // Check if 'images' and 'arModel' exist in req.files
    //   if ('images' in req.files) {
    //     imageUrls = (req.files['images'] as Express.Multer.File[]).map(
    //       (file) => {
    //         return { path: `public/images/${file.filename}` };
    //       }
    //     );
    //   }

    //   if (
    //     'arModel' in req.files &&
    //     req.files['arModel'] &&
    //     req.files['arModel'].length > 0
    //   ) {
    //     const arModelFile = req.files['arModel'][0];
    //     arModelUrl = { path: `public/images/${arModelFile.filename}` };
    //   }
    // }
    const property = await Property.findByIdAndUpdate(
      propertyId,
      {
        title,
        category,
        type,
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
        // imageURLs: imageUrls,
        // arModelUrl: arModelUrl,
      },
      { new: true }
    );

    res.status(201).json({ message: 'Property updated successfully' });
  }
);
router.get('/categories', async (req: Request, res: Response) => {
  const categories = await Category.find({});
  res.send(categories);
});
router.get('/search', async (req: Request, res: Response) => {
  try {
    const { searchArea, category, bedrooms, minPrice, maxPrice } = req.query;
    let query: any = {};

    if (typeof searchArea === 'string') {
      const searchTerms = searchArea
        .split(',')
        .map((term: string) => new RegExp(term, 'i'));
      query['$or'] = [
        {
          'address.area': {
            $in: await Area.find({ name: { $in: searchTerms } }).distinct(
              '_id'
            ),
          },
        },
        {
          'address.ward': {
            $in: await Ward.find({ name: { $in: searchTerms } }).distinct(
              '_id'
            ),
          },
        },
        {
          'address.lga': {
            $in: await Lga.find({ name: { $in: searchTerms } }).distinct('_id'),
          },
        },
        // {
        //   'address.state': {
        //     $in: await State.find({ name: { $in: searchTerms } }).distinct(
        //       '_id'
        //     ),
        //   },
        // },
      ];
    }

    if (category && category !== 'any') {
      query.category = category;
    }

    if (bedrooms && +bedrooms > 0) {
      query.bedrooms = +bedrooms;
    }

    if (minPrice && +minPrice > 0) {
      query.price = { $gte: +minPrice };
    }

    if (maxPrice && +maxPrice > 0) {
      query.price = { ...query.price, $lte: +maxPrice };
    }

    // Find properties that match the query criteria
    const properties = await Property.find(query)
      .populate([
        'address.state',
        'address.lga',
        'address.ward',
        'address.area',
        'agent',
        'category',
      ])
      .exec();

    res.json(properties);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});
// router.get('/search', async (req, res) => {
//   try {
//     const { search } = req.query;

//     let query: Query = {};

//     if (typeof search === 'string') {
//       const searchTerms = search.split(' ').map(term => new RegExp(term, 'i'));

//       // Search in area, ward, LGA, and state using search terms
//       query['$or'] = [
//         { 'address.area': { $in: await Area.find({ name: { $in: searchTerms } }).distinct('_id') } },
//         { 'address.ward': { $in: await Ward.find({ name: { $in: searchTerms } }).distinct('_id') } },
//         { 'address.lga': { $in: await Lga.find({ name: { $in: searchTerms } }).distinct('_id') } },
//         { 'address.state': { $in: await State.find({ name: { $in: searchTerms } }).distinct('_id') } }
//       ];
//     }

//     const properties = await Property.find(query).populate(['address.area']).exec();

//     res.json(properties);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// });
router.get(
  '/:propertyId',
  [currentUser, requireAuth, authorization(['Admin', 'Manager', 'Agent'])],
  async (req: Request, res: Response) => {
    const propertyId = req.params.propertyId;
    const properties = await Property.findOne({
      _id: propertyId,
      agent: req.user.id,
    }).populate([
      'address.state',
      'address.lga',
      'address.ward',
      'address.area',
      'category',
    ]);
    res.send(properties);
  }
);
router.get(
  '/public/:propertyId/details',

  async (req: Request, res: Response) => {
    const propertyId = req.params.propertyId;
    const properties = await Property.findOne({
      _id: propertyId,
    }).populate([
      'address.state',
      'address.lga',
      'address.ward',
      'address.area',
      'category',
      'agent',
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
      'category',
    ]);
    res.send(properties);
  }
);

router.get('/public/types/:type', async (req: Request, res: Response) => {
  const { type } = req.params;
  let propertyType = type;

  if (type === 'to-rent') propertyType = 'To rent';
  if (type === 'for-sale') propertyType = 'For sale';

  let options = { type: propertyType };
  // if (category === 'all') options = {};
  // else options = { category };
  const properties = await Property.find(options).populate([
    'address.state',
    'address.lga',
    'address.ward',
    'address.area',
    'agent',
    'category',
  ]);
  res.send(properties);
});

router.get('/public/:category', async (req: Request, res: Response) => {
  const { category } = req.params;
  let options = {};
  if (category === 'all') options = {};
  else options = { category };
  const properties = await Property.find(options).populate([
    'address.state',
    'address.lga',
    'address.ward',
    'address.area',
    'agent',
    'category',
  ]);
  res.send(properties);
});

router.put(
  '/:propertyId/neighborhood',
  [
    body('overview').notEmpty().withMessage('Overview is required'),
    body('schools').notEmpty().withMessage('Schools are required'),
    body('crimeRate').notEmpty().withMessage('Crime Rate is required'),
  ],
  [validateRequest],
  async (req: Request, res: Response) => {
    const { propertyId } = req.params;
    const {
      overview,
      parks,
      schools,
      shopping,
      restaurants,
      entertainment,
      publicTransit,
      majorHighways,
      crimeRate,
      policeStations,
      fireStations,
    } = req.body;

    const property = {
      neighborhood: {
        overview: overview,
        amenities: {
          parks,
          schools,
          shopping,
          restaurants,
          entertainment,
        },
        transportation: {
          publicTransit,
          majorHighways,
        },
        safety: {
          crimeRate,
          policeStations,
          fireStations,
        },
      },
    };
    const propertyNeighborhood = await Property.findByIdAndUpdate(
      propertyId,
      property,
      { new: true } // To return the updated document
    );
    res.send(propertyNeighborhood);
  }
);

export { router as v1PropertyRoutes };
