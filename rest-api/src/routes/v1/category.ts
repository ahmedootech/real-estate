import { Request, Response, Router } from 'express';
import { Category } from '../../models/v1/category';
import { RequestValidationError } from '../../common/errors/request-validation-error';
import { FieldValidationError } from 'express-validator';

const router = Router();

router.post('/', async (req: Request, res: Response) => {
  const { name, description } = req.body;

  const existingCategory = await Category.findOne({ name });
  if (existingCategory)
    throw new RequestValidationError([
      {
        msg: 'Category name already exist',
        path: 'name',
      } as FieldValidationError,
    ]);

  const category = Category.build({ name, description });
  await category.save();

  res.json(category);
});

router.put('/:categoryId', async (req: Request, res: Response) => {
  const { categoryId } = req.params;
  const { name, description } = req.body;

  const category = await Category.findByIdAndUpdate(categoryId, {
    name,
    description,
  });

  res.send(category);
});
router.get('/', async (req: Request, res: Response) => {
  const categories = await Category.find({}).sort({ _id: -1 });
  res.send(categories);
});
export { router as v1CategoryRoutes };
