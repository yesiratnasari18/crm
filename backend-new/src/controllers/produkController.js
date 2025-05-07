import { getAllProduk, getProdukById, createProduk, updateProduk, deleteProduk } from '../models/produkModel';

// Get all products
export const getProduk = async (req, res) => {
  try {
    const produk = await getAllProduk();
    res.json(produk);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch products' });
  }
};

// Get a product by ID
export const getProdukByIdController = async (req, res) => {
  const { id } = req.params;
  try {
    const produk = await getProdukById(Number(id));
    if (!produk) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(produk);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch product' });
  }
};

// Create a new product
export const createProdukController = async (req, res) => {
  const { nama_produk, harga_produk } = req.body;
  try {
    const result = await createProduk({ id_produk: 0, nama_produk, harga_produk });
    res.status(201).json({ message: 'Product created successfully', result });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create product' });
  }
};

// Update an existing product
export const updateProdukController = async (req, res) => {
  const { id } = req.params;
  const { nama_produk, harga_produk } = req.body;
  try {
    const result = await updateProduk(Number(id), { id_produk: Number(id), nama_produk, harga_produk });
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json({ message: 'Product updated successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update product' });
  }
};

// Delete a product
export const deleteProdukController = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await deleteProduk(Number(id));
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete product' });
  }
};
