import { getAllTransaksi, getTransaksiById, createTransaksi, updateTransaksi, updateListTransaksi, deleteTransaksi } from '../models/transaksiModel';

// Get all transaksis
export const getTransaksi = async (req, res) => {
  try {
    const transaksi = await getAllTransaksi();
    res.json(transaksi);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch transaksis' });
  }
};

// Get a transaksi by ID
export const getTransaksiByIdController = async (req, res) => {
  const { id } = req.params;
  try {
    const transaksi = await getTransaksiById(Number(id));
    if (!transaksi) {
      return res.status(404).json({ message: 'Transaksi not found' });
    }
    res.json(transaksi);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch transaksi' });
  }
};

// Create a new transaksi
export const createTransaksiController = async (req, res) => {
  const { id_list, id_contact, id_produk, jumlah, catatan } = req.body;
  try {
    const result = await createTransaksi({ id_list, id_contact, id_produk, jumlah, catatan });
    res.status(201).json({ message: 'Transaksi created successfully', result });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create transaksi' });
  }
};

// Update an existing transaksi
export const updateTransaksiController = async (req, res) => {
  const { id } = req.params;
  const { id_contact, id_produk, jumlah, catatan } = req.body;
  try {
    const result = await updateTransaksi(Number(id), { id_contact, id_produk, jumlah, catatan });
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Transaksi not found' });
    }
    res.json({ message: 'Transaksi updated successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update transaksi' });
  }
};

// Update an existing transaksi
export const updateListTransaksiController = async (req, res) => {
  const { id } = req.params;
  const { id_list } = req.body;
  try {
    const result = await updateListTransaksi(Number(id), { id_list });
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Transaksi not found' });
    }
    res.json({ message: 'List Transaksi updated successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update list transaksi' });
  }
};

// Delete a transaksi
export const deleteTransaksiController = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await deleteTransaksi(Number(id));
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Transaksi not found' });
    }
    res.json({ message: 'Transaksi deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete transaksi' });
  }
};
