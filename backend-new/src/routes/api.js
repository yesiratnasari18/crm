import { Router } from "express";
import { login } from "../controllers/authController";
import { getUser, getUserByEmailController, getUserByIdController, createUserController, updateUserController } from "../controllers/userController";
import { getSektor, getSektorByIdController, createSektorController, updateSektorController, deleteSektorController } from '../controllers/sektorController';
import { getProduk, getProdukByIdController, createProdukController, updateProdukController, deleteProdukController } from '../controllers/produkController';
import { getContact, getContactByIdController, createContactController, updateContactController, deleteContactController } from '../controllers/contactController';

const router = Router();

// Auth Route
router.post('/login', login);

// User Route
router.get('/user', getUser);
router.get('/user/:id', getUserByIdController);
router.get('/user/:email', getUserByEmailController);
router.post('/user/store', createUserController);
router.put('/user/update/:id', updateUserController);

// Sektor Route
router.get('/sektor', getSektor);
router.get('/sektor/:id', getSektorByIdController);
router.post('/sektor/store', createSektorController);
router.put('/sektor/update/:id', updateSektorController);
router.delete('/sektor/delete/:id', deleteSektorController);

// Produk Route
router.get('/produk', getProduk);
router.get('/produk/:id', getProdukByIdController);
router.post('/produk/store', createProdukController);
router.put('/produk/update/:id', updateProdukController);
router.delete('/produk/delete/:id', deleteProdukController);

// Contact Route
router.get('/contact', getContact);
router.get('/contact/:id', getContactByIdController);
router.post('/contact/store', createContactController);
router.put('/contact/update/:id', updateContactController);
router.delete('/contact/delete/:id', deleteContactController);

export default router;