import { Router } from 'express';
import SessionController from '../controllers/session';

const router = Router();

router.post('/login', SessionController.login);

export default router;
