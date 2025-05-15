import { Router } from 'express';
import { login } from '../controllers/authController';

const router = Router();

// Define routes for Auth
router.post('/login', login);

export default router;
