import { getAllSektor, getSektorById, createSektor, updateSektor, deleteSektor } from '../models/sektorModel';

// Get all sektor
export const getSektor = async (req, res) => {
  try {
    const sektor = await getAllSektor();
    res.json(sektor);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch sektor' });
  }
};

// Get a sektor by ID
export const getSektorByIdController = async (req, res) => {
  const { id } = req.params;
  try {
    const sektor = await getSektorById(Number(id));
    if (!sektor) {
      return res.status(404).json({ message: 'Sektor not found' });
    }
    res.json(sektor);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch sektor' });
  }
};

// Create a new sektor
export const createSektorController = async (req, res) => {
  const { nama_sektor, bg_color, text_color } = req.body;
  try {
    const result = await createSektor({ nama_sektor, bg_color, text_color });
    res.status(201).json({ message: 'Sektor created successfully', result });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create sektor' });
  }
};

// Update an existing sektor
export const updateSektorController = async (req, res) => {
  const { id } = req.params;
  const { nama_sektor, bg_color, text_color } = req.body;
  try {
    const result = await updateSektor(Number(id), { nama_sektor, bg_color, text_color });
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Sektor not found' });
    }
    res.json({ message: 'Sektor updated successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update sektor' });
  }
};

// Delete a sektor
export const deleteSektorController = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await deleteSektor(Number(id));
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Sektor not found' });
    }
    res.json({ message: 'Sektor deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete sektor' });
  }
};
