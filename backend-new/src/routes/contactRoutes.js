import { Router } from 'express';
import { getContact, getContactByIdController, createContactController, updateContactController, deleteContactController } from '../controllers/contactController';

const router = Router();

// Define routes for CRUD operations
router.get('/contact', getContact);
router.get('/contact/:id', getContactByIdController);
router.post('/contact', createContactController);
router.put('/contact/:id', updateContactController);
router.delete('/contact/:id', deleteContactController);

export default router;
