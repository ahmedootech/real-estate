import { Request, Response, Router } from 'express';
import { Inspection } from '../../models/v1/inspection';
import { currentUser } from '../../common/middlewares/current-user';
import { requireAuth } from '../../common/middlewares/require-auth';
import { InspectionStatus } from '../../common/types';

const router = Router();

router.post(
  '/',
  [currentUser, requireAuth],
  async (req: Request, res: Response) => {
    const { date, time, message, property, agent } = req.body;
    console.log(req.body);
    const inspection = Inspection.build({
      property,
      date,
      time,
      message,
      agent,
      prospect: req.user.id,
    });
    await inspection.save();

    res.send(inspection);
  }
);

router.get(
  '/prospect',
  [currentUser, requireAuth],
  async (req: Request, res: Response) => {
    const inspections = await Inspection.find({
      prospect: req.user.id,
    }).populate([
      'agent',
      'property',
      'property.address.state',
      'property.address.lga',
      'property.address.ward',
      'property.address.area',
    ]);
    res.send(inspections);
  }
);
router.get(
  '/agent',
  [currentUser, requireAuth],
  async (req: Request, res: Response) => {
    const inspections = await Inspection.find({
      agent: req.user.id,
    }).populate([
      'prospect',
      'property',
      'property.address.state',
      'property.address.lga',
      'property.address.ward',
      'property.address.area',
    ]);
    res.send(inspections);
  }
);

router.put('/:inspectionId/visited', async (req: Request, res: Response) => {
  const { inspectionId } = req.params;
  const inspection = await Inspection.findByIdAndUpdate(
    inspectionId,
    { status: InspectionStatus.Visited },
    { new: true }
  );
  res.send(inspection);
});
export { router as v1InspectionRoutes };
