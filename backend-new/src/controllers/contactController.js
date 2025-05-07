import { getAllContact, getContactById, createContact, updateContact, deleteContact } from '../models/contactModel';

// Get all contacts
export const getContact = async (req, res) => {
  try {
    const contact = await getAllContact();
    res.json(contact);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch contacts' });
  }
};

// Get a product by ID
export const getContactByIdController = async (req, res) => {
  const { id } = req.params;
  try {
    const contact = await getContactById(Number(id));
    if (!contact) {
      return res.status(404).json({ message: 'Contact not found' });
    }
    res.json(contact);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch contact' });
  }
};

// Create a new contact
export const createContactController = async (req, res) => {
  const { nama, perusahaan, email, no_telp, id_sektor, alamat } = req.body;
  try {
    const result = await createContact({ nama, perusahaan, email, no_telp, id_sektor, alamat });
    res.status(201).json({ message: 'Contact created successfully', result });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create contact' });
  }
};

// Update an existing contact
export const updateContactController = async (req, res) => {
  const { id } = req.params;
  const { nama, perusahaan, email, no_telp, id_sektor, alamat } = req.body;
  try {
    const result = await updateContact(Number(id), { nama, perusahaan, email, no_telp, id_sektor, alamat });
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Contact not found' });
    }
    res.json({ message: 'Contact updated successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update contact' });
  }
};

// Delete a contact
export const deleteContactController = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await deleteContact(Number(id));
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Contact not found' });
    }
    res.json({ message: 'Contact deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete contact' });
  }
};
