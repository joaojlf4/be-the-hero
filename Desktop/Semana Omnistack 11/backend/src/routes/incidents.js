import { Router } from 'express';
import IncidentController from '../controllers/incident';
import OwnerShipController from '../controllers/ownership';

const router = Router();

router.get('/', IncidentController.index);
router.get('/own', OwnerShipController.index);
router.post('/', IncidentController.store);
router.delete('/:id', IncidentController.delete);

export default router;