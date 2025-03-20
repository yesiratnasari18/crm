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

const EditUserModal = ({ isOpen, onClose, user, onSave }) => {
  const [formData, setFormData] = useState({
    id_user: "",
    nama: "",
    email: "",
    password: "",
    roles: "",
  });

  useEffect(() => {
    if (user) {
      setFormData({
        id_user: user.id_user,
        nama: user.nama,
        email: user.email,
        password: user.password,
        roles: user.roles,
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSave = () => {
    onSave(formData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded shadow-lg w-1/3">
        <h2 className="text-xl font-bold mb-4">Edit User</h2>
        <form>
          {/* <div className="mb-4">
            <label htmlFor="id_user" className="block text-sm font-medium">
              No
            </label>
            <input
              type="text"
              name="id_user"
              value={formData.id_user}
              onChange={handleChange}
              className="w-full border border-gray-300 p-2 rounded"
              id="id_user"
              readOnly
            />
          </div> */}
          <div className="mb-4">
            <label htmlFor="nama" className="block text-sm font-medium">
              Nama
            </label>
            <input
              type="text"
              name="nama"
              value={formData.nama}
              onChange={handleChange}
              className="w-full border border-gray-300 p-2 rounded"
              id="nama"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full border border-gray-300 p-2 rounded"
              id="email"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full border border-gray-300 p-2 rounded"
              id="password"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="roles" className="block text-sm font-medium">
              Role
            </label>
            <select
              name="roles"
              value={formData.roles}
              onChange={handleChange}
              className="w-full border border-gray-300 p-2 rounded"
              id="roles"
            >
              <option value="">Select Role</option>
              <option value="Sales">Sales</option>
              <option value="Admin">Admin</option>
            </select>
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              className="bg-blue-500 text-white p-2 rounded mr-2"
              onClick={handleSave}
            >
              Save
            </button>
            <button
              type="button"
              className="bg-gray-500 text-white p-2 rounded"
              onClick={onClose}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditUserModal;
