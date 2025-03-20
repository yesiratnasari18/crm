// import React, { useState, useEffect } from "react";

// const EditUserModal = ({ isOpen, onClose, userData, onSave }) => {
//   const [formData, setFormData] = useState({
//     id: "",
//     nama: "",
//     email: "",
//     password: "",
//     role: "",
//   });

//   useEffect(() => {
//     if (userData) {
//       setFormData({
//         id: userData.id,
//         nama: userData.nama,
//         email: userData.email,
//         password: userData.password,
//         role: userData.role,
//       });
//     }
//   }, [userData]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prevData) => ({
//       ...prevData,
//       [name]: value,
//     }));
//   };

//   const handleSave = () => {
//     onSave(formData);
//     onClose();
//   };

//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
//       <div className="bg-white p-6 rounded shadow-lg w-1/3">
//         <h2 className="text-xl font-bold mb-4">Edit User</h2>
//         <form>
//           <div className="mb-4">
//             <label htmlFor="id" className="block text-sm font-medium">
//               No
//             </label>
//             <input
//               type="text"
//               name="id"
//               value={formData.id}
//               onChange={handleChange}
//               className="w-full border border-gray-300 p-2 rounded"
//               id="id"
//               readOnly
//             />
//           </div>
//           <div className="mb-4">
//             <label htmlFor="nama" className="block text-sm font-medium">
//               Nama
//             </label>
//             <input
//               type="text"
//               name="nama"
//               value={formData.nama}
//               onChange={handleChange}
//               className="w-full border border-gray-300 p-2 rounded"
//               id="nama"
//             />
//           </div>
//           <div className="mb-4">
//             <label htmlFor="email" className="block text-sm font-medium">
//               Email
//             </label>
//             <input
//               type="email"
//               name="email"
//               value={formData.email}
//               onChange={handleChange}
//               className="w-full border border-gray-300 p-2 rounded"
//               id="email"
//             />
//           </div>
//           <div className="mb-4">
//             <label htmlFor="password" className="block text-sm font-medium">
//               Password
//             </label>
//             <input
//               type="password"
//               name="password"
//               value={formData.password}
//               onChange={handleChange}
//               className="w-full border border-gray-300 p-2 rounded"
//               id="password"
//             />
//           </div>
//           <div className="mb-4">
//             <label htmlFor="role" className="block text-sm font-medium">
//               Role
//             </label>
//             <select
//               name="role"
//               value={formData.role}
//               onChange={handleChange}
//               className="w-full border border-gray-300 p-2 rounded"
//               id="role"
//             >
//               <option value="">Select Role</option>
//               <option value="Sales">Sales</option>
//               <option value="Admin">Admin</option>
//             </select>
//           </div>
//           <div className="flex justify-end">
//             <button
//               type="button"
//               className="bg-blue-500 text-white p-2 rounded mr-2"
//               onClick={handleSave}
//             >
//               Save
//             </button>
//             <button
//               type="button"
//               className="bg-gray-500 text-white p-2 rounded"
//               onClick={onClose}
//             >
//               Cancel
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default EditUserModal;


import React, { useState, useEffect } from "react";

const EditUserModal = ({ isOpen, onClose, userData, onSave }) => {
  const [kriteria, setKriteria] = useState("");
  const [nilai, setNilai] = useState("");

  useEffect(() => {
    if (userData) {
      setKriteria(userData.kriteria);
      setNilai(userData.nilai);
    }
  }, [userData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ ...userData, kriteria, nilai }); // Save updated data
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-4 rounded-md w-1/3">
        <h2 className="text-xl mb-4">Edit Bobot</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="kriteria" className="block text-sm font-medium">
              Kriteria
            </label>
            <input
              id="kriteria"
              type="text"
              value={kriteria}
              onChange={(e) => setKriteria(e.target.value)}
              className="border rounded w-full p-2 mt-1"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="nilai" className="block text-sm font-medium">
              Nilai
            </label>
            <input
              id="nilai"
              type="text"
              value={nilai}
              onChange={(e) => setNilai(e.target.value)}
              className="border rounded w-full p-2 mt-1"
            />
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-300 text-gray-700 px-4 py-2 rounded mr-2"
            >
              Cancel
            </button>
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditUserModal;
