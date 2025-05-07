import { Router } from 'express';
import { getProduk, getProdukByIdController, createProdukController, updateProdukController, deleteProdukController } from '../controllers/produkController';

const router = Router();

// Define routes for CRUD operations
router.get('/produk', getProduk);
router.get('/produk/:id', getProdukByIdController);
router.post('/produk', createProdukController);
router.put('/produk/:id', updateProdukController);
router.delete('/produk/:id', deleteProdukController);

export default router;
