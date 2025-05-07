import { Router } from 'express';
import { getUser, createUserController, getUserByIdController, updateUserController } from '../controllers/userController';

const router = Router();

// Define routes for CRUD operations
router.get('/user', getUser);
router.get('/user/:id', getUserByIdController);
router.post('/user', createUserController);
router.put('/user/:id', updateUserController);

export default router;
