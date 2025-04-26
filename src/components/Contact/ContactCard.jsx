import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ContactDrawer = ({ contact, isOpen, onClose }) => {
  return (
    <div
      className={`fixed top-0 right-0 w-96 h-full bg-white shadow-lg transform transition-transform duration-300 ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      }`}
    >
      <div className="p-4">
        <button
          onClick={onClose}
          className="text-gray-500 hover:text-gray-800 mb-4 focus:outline-none"
        >
          Close
        </button>
        {contact && (
          <form className="text-left">
            <div className="mb-4">
              <label className="block text-gray-700 font-semibold">Name</label>
              <input
                type="text"
                value={contact.nama}
                readOnly
                className="w-full px-3 py-2 border border-gray-300 rounded bg-gray-100 text-gray-700"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-semibold">Phone</label>
              <input
                type="text"
                value={contact.no_telp}
                readOnly
                className="w-full px-3 py-2 border border-gray-300 rounded bg-gray-100 text-gray-700"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-semibold">Email</label>
              <input
                type="text"
                value={contact.email}
                readOnly
                className="w-full px-3 py-2 border border-gray-300 rounded bg-gray-100 text-gray-700"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-semibold">Company</label>
              <input
                type="text"
                value={contact.perusahaan}
                readOnly
                className="w-full px-3 py-2 border border-gray-300 rounded bg-gray-100 text-gray-700"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-semibold">Address</label>
              <textarea
                value={contact.alamat}
                readOnly
                className="w-full px-3 py-2 border border-gray-300 rounded bg-gray-100 text-gray-700"
              ></textarea>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

// export default ContactList;
const ContactList = () => {
  const [contacts, setContacts] = useState([]);
  const [selectedContact, setSelectedContact] = useState(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1); // Track current page
  const [itemsPerPage, setItemsPerPage] = useState(10); // Track items per page
  const fetchContacts = async () => {
    try {
      const response = await axios.get('http://localhost:3000/user/contact');
      if (response.status == 200) {
        setContacts(response.data.tasks);
      }
      if (response.status != 200)
      {
        throw "Error at Backend!";
      }
    } catch (error) {
      console.error('Error fetching contacts:', error);
    }
  };
  useEffect(() => {
    fetchContacts();
  }, []);

  const openDrawer = (contact) => {
    setSelectedContact(contact);
    setIsDrawerOpen(true);
  };

  const closeDrawer = () => {
    setIsDrawerOpen(false);
  };

  // Helper function to get dynamic styles for status
  const getStatusStyle = (status) => {
    switch (status) {
      case 'Active':
        return 'bg-green-500 text-white';
      case 'Inactive':
        return 'bg-red-500 text-white';
      case 'Pending':
        return 'bg-yellow-500 text-black';
      default:
        return 'bg-gray-500 text-white';
    }
  };

  // Pagination logic
  const indexOfLastContact = currentPage * itemsPerPage;
  const indexOfFirstContact = indexOfLastContact - itemsPerPage;
  const currentContacts = contacts.slice(indexOfFirstContact, indexOfLastContact);

  // Calculate total pages
  const totalPages = Math.ceil(contacts.length / itemsPerPage);

  const handleItemsPerPageChange = (e) => {
    setItemsPerPage(Number(e.target.value));
    setCurrentPage(1); // Reset to first page when items per page changes
  };

  const handlePageChange = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  return (
    <section className="container mx-auto p-6 font-mono">
      <div className="flex justify-between mb-4">
        <div>
          <label className="mr-2">Items per page:</label>
          <select
            value={itemsPerPage}
            onChange={handleItemsPerPageChange}
            className="px-3 py-2 border border-gray-300 rounded"
          >
            {[5, 10, 15, 20].map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>

        {/* Pagination controls */}
        <div className="flex items-center space-x-2">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-4 py-2 border rounded bg-gray-200 hover:bg-gray-300"
          >
            Previous
          </button>
          <span className="text-gray-700">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-4 py-2 border rounded bg-gray-200 hover:bg-gray-300"
          >
            Next
          </button>
        </div>
      </div>

      <div className="w-full mb-8 overflow-hidden rounded-lg shadow-lg">
        <div className="w-full overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-md font-semibold tracking-wide text-left text-gray-900 bg-gray-100 uppercase border-b border-gray-600">
                <th className="px-4 py-3">No</th>
                <th className="px-4 py-3">Nama</th>
                <th className="px-4 py-3">Perusahaan</th>
                <th className="px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {currentContacts.map((person, index) => (
                <tr key={index} className="text-gray-700 hover:bg-gray-100">
                  <td className="px-4 py-3 text-md font-semibold border">{index + 1}</td>
                  <td className="px-4 py-3 text-md font-semibold border">{person.nama}</td>
                  <td className="px-4 py-3 text-md font-semibold border">{person.perusahaan}</td>
                  <td className="px-4 py-3 text-center border">
                    <button
                      onClick={() => openDrawer(person)}
                      className="text-blue-500 hover:text-blue-700"
                    >
                      <i className="fas fa-eye"></i>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <ContactDrawer
        contact={selectedContact}
        isOpen={isDrawerOpen}
        onClose={closeDrawer}
      />
    </section>
  );
};

export default ContactList;

