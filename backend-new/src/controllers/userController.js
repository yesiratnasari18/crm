import { getAllUser, createUser, updateUser } from '../models/userModel';

// Get all users
export const getUser = async (req, res) => {
  try {
    const user = await getAllUser();
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch users' });
  }
};

// Get a user by ID
export const getUserByIdController = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await getUserByParams('id', Number(id));
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch user' });
  }
};

export const getUserByEmailController = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await getUserByParams('email', email);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch user' });
  }
};

// Create a new user
export const createUserController = async (req, res) => {
  const { nama, email, password, roles } = req.body;
  try {
    const result = await createUser({ nama, email, password, roles });
    res.status(201).json({ message: 'User created successfully', result });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create user' });
  }
};

// Update an existing user
export const updateUserController = async (req, res) => {
  const { id } = req.params;
  const { nama, email, password, roles } = req.body;
  try {
    const result = await updateUser(Number(id), { nama, email, password, roles });
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json({ message: 'User updated successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update user' });
  }
};

