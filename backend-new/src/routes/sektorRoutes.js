import { Router } from 'express';
import { getSektor, getSektorByIdController, createSektorController, updateSektorController, deleteSektorController } from '../controllers/sektorController';

const router = Router();

// Define routes for CRUD operations
router.get('/sektor', getSektor);
router.get('/sektor/:id', getSektorByIdController);
router.post('/sektor', createSektorController);
router.put('/sektor/:id', updateSektorController);
router.delete('/sektor/:id', deleteSektorController);

export default router;
