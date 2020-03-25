import { Router } from 'express';
import OngController from '../controllers/ong';

const router = Router();

router.get('/', OngController.index);
router.post('/', OngController.store);
router.delete('/:id', OngController.delete);

export default router;