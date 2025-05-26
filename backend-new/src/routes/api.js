import { Router } from "express";
import { login } from "../controllers/authController";
import { getUser, getUserByEmailController, getUserByIdController, createUserController, updateUserController } from "../controllers/userController";
import { getSektor, getSektorByIdController, createSektorController, updateSektorController, deleteSektorController } from '../controllers/sektorController';
import { getProduk, getProdukByIdController, createProdukController, updateProdukController, deleteProdukController } from '../controllers/produkController';
import { getContact, getContactByIdController, createContactController, updateContactController, deleteContactController } from '../controllers/contactController';
import verifyToken from "../middleware/verifyToken";
import { getList } from "../controllers/listController";
import { getListById, updateList } from "../models/listModel";
import { getTransaksi, getTransaksiByIdController, createTransaksiController, updateTransaksiController, updateListTransaksiController, deleteTransaksiController } from '../controllers/transaksiController';

const router = Router();

// Auth Route
router.post('/login', login);

// User Route
router.get('/user', verifyToken, getUser);
router.get('/user/:id', verifyToken, getUserByIdController);
router.get('/user/:email', verifyToken, getUserByEmailController);
router.post('/user/store', verifyToken, createUserController);
router.put('/user/update/:id', verifyToken, updateUserController);

// Sektor Route
router.get('/sektor', verifyToken, getSektor);
router.get('/sektor/:id', verifyToken, getSektorByIdController);
router.post('/sektor/store', verifyToken, createSektorController);
router.put('/sektor/update/:id', verifyToken, updateSektorController);
router.delete('/sektor/delete/:id', verifyToken, deleteSektorController);

// Produk Route
router.get('/produk', verifyToken, getProduk);
router.get('/produk/:id', verifyToken, getProdukByIdController);
router.post('/produk/store', verifyToken, createProdukController);
router.put('/produk/update/:id', verifyToken, updateProdukController);
router.delete('/produk/delete/:id', verifyToken, deleteProdukController);

// Contact Route
router.get('/contact', verifyToken, getContact);
router.get('/contact/:id', verifyToken, getContactByIdController);
router.post('/contact/store', verifyToken, createContactController);
router.put('/contact/update/:id', verifyToken, updateContactController);
router.delete('/contact/delete/:id', verifyToken, deleteContactController);

// List Route
router.get('/list', verifyToken, getList);
router.get('/list/:id', verifyToken, getListById);

// Transaksi Route
router.post('/transaksi/store', verifyToken, createTransaksiController);
router.post('/transaksi/update/:id', verifyToken, updateTransaksiController);
router.post('/transaksi/list/update/:id', verifyToken, updateListTransaksiController);

export default router;