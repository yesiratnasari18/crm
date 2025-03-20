import React from "react";

const HapusModal = ({ isOpen, onClose, onDelete }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg w-96">
        <h2 className="text-xl font-semibold mb-4">Delete User</h2>
        <p className="mb-4">Are you sure you want to delete this user?</p>
        <div className="flex justify-between">
          <button
            className="bg-gray-300 text-black p-2 rounded"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="bg-red-500 text-white p-2 rounded"
            onClick={onDelete}
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default HapusModal;
