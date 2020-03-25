import { Router } from 'express';
import ongs from './ongs'
import incidents from './incidents';
import sessions from './session';

const router = Router();

router.use('/ongs', ongs);
router.use('/incidents', incidents);
router.use('/sessions', sessions);

export default router;