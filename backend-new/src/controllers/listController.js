import { getAllList, getListById, createList, updateList, deleteList } from '../models/listModel';

// Get all lists
export const getList = async (req, res) => {
  try {
    const list = await getAllList();
    res.json(list);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch lists' });
  }
};

// Get a list by ID
export const getListByIdController = async (req, res) => {
  const { id } = req.params;
  try {
    const list = await getListById(Number(id));
    if (!list) {
      return res.status(404).json({ message: 'List not found' });
    }
    res.json(list);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch list' });
  }
};

// Create a new list
export const createListController = async (req, res) => {
  const { nama_list } = req.body;
  try {
    const result = await createList({ nama_list });
    res.status(201).json({ message: 'List created successfully', result });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create list' });
  }
};

// Update an existing list
export const updateListController = async (req, res) => {
  const { id } = req.params;
  const { nama_list } = req.body;
  try {
    const result = await updateList(Number(id), { nama_list });
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'List not found' });
    }
    res.json({ message: 'List updated successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update list' });
  }
};

// Delete a list
export const deleteListController = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await deleteList(Number(id));
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'List not found' });
    }
    res.json({ message: 'List deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete list' });
  }
};
