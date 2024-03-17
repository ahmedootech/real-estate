import { Request, Response, Router } from 'express';
import { currentUser } from '../../common/middlewares/current-user';
import { requireAuth } from '../../common/middlewares/require-auth';
import { Staff } from '../../models/v1/staff';
import { Property } from '../../models/v1/property';
import { Category } from '../../models/v1/category';
import { Inspection } from '../../models/v1/inspection';

const router = Router();
interface DashboardProperty {
  label: string;
  value: string | number;
}
router.get(
  '/',
  [currentUser, requireAuth],
  async (req: Request, res: Response) => {
    let dashboards: DashboardProperty[] = [];

    const totalStaffs = (await Staff.find({})).length;
    const totalProperties = (await Property.find({ agent: req.user.id }))
      .length;
    const totalCategories = (await Category.find({})).length;
    const totalInspections = await Inspection.find({
      $or: [{ agent: req.user.id }, { prospect: req.user.id }],
    }).countDocuments();

    dashboards = dashboards.concat([
      { label: 'Total Properties', value: totalProperties },
      { label: 'Total Inspections', value: totalInspections },
    ]);

    if (['Admin', 'Manager'].includes(req.user.role)) {
      dashboards = dashboards.concat([
        { label: 'Total Staff', value: totalStaffs },
        { label: 'Total Categories', value: totalCategories },
      ]);
    }

    res.send(dashboards);
  }
);

export { router as v1DashboardRoutes };
