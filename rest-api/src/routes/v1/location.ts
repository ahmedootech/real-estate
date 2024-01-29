import { Request, Response, Router } from 'express';
import { StaffRoles } from '../../common/types/staff-roles';
import { currentUser } from '../../common/middlewares/current-user';
import { requireAuth } from '../../common/middlewares/require-auth';
import { authorization } from '../../common/middlewares/authorization';
import { Staff } from '../../models/v1/staff';
import { State } from '../../models/v1/location.state';
import { Lga } from '../../models/v1/location.lga';
import { Ward } from '../../models/v1/location.ward';
import { Area } from '../../models/v1/location.area';

const router = Router();

router.get('/states', async (req: Request, res: Response) => {
  const states = await State.find({});
  res.json(states);
});

router.get('/states/:stateId/lgas', async (req: Request, res: Response) => {
  const stateId = req.params.stateId;
  const lgas = await Lga.find({ state_id: stateId });
  res.json(lgas);
});

router.get('/lgas/:lgaId/wards', async (req: Request, res: Response) => {
  const lgaId = req.params.lgaId;
  const wards = await Ward.find({ lga_id: lgaId });
  res.json(wards);
});

router.get('/wards/:wardId/areas', async (req: Request, res: Response) => {
  const wardId = req.params.wardId;
  const areas = await Area.find({ ward_id: wardId });
  res.json(areas);
});

router.get('/roles', (req: Request, res: Response) => {
  const roles = Object.values(StaffRoles);
  res.json(roles);
});

export { router as v1LocationRoutes };
