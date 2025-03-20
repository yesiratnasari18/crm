// import React, { useState } from "react";
// import EditUserModal from "../Modal/Edit";
// import AddUserModal from "../Modal/Tambah";
// import HapusModal from "../Modal/Hapus"; // Import Hapus Modal

// const TableWithPagination = () => {
//   const [itemsPerPage, setItemsPerPage] = useState(3);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [data, setData] = useState([
//     { id: 1, nama: "Yesi", email: "email", password: "1234567", role: "Sales" },
//     { id: 2, nama: "Ratna", email: "email", password: "1234567", role: "Admin" },
//     { id: 3, nama: "Sari", email: "email", password: "1234567", role: "Admin" },
//     { id: 4, nama: "Dina", email: "email", password: "1234567", role: "Sales" },
//     { id: 5, nama: "Rina", email: "email", password: "1234567", role: "Admin" },
//   ]);

//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [isAddModalOpen, setIsAddModalOpen] = useState(false);
//   const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false); // State untuk modal hapus
//   const [editingUser, setEditingUser] = useState(null);
//   const [selectedUser, setSelectedUser] = useState(null); // User yang akan dihapus

//   const handleItemsPerPageChange = (e) => {
//     setItemsPerPage(Number(e.target.value));
//     setCurrentPage(1);
//   };

//   const handleEditClick = (user) => {
//     setEditingUser(user);
//     setIsModalOpen(true);
//   };

//   const handleSaveUser = (updatedUser) => {
//     setData((prevData) =>
//       prevData.map((user) =>
//         user.id === updatedUser.id ? updatedUser : user
//       )
//     );
//   };

//   const handleAddUser = (newUser) => {
//     setData((prevData) => {
//       // Get the last ID and increment it by 1
//       const lastId = Math.max(...prevData.map(user => user.id), 0);
//       const newId = lastId + 1;
//       return [
//         ...prevData,
//         { id: newId, ...newUser }
//       ];
//     });
//   };

//   const handleDeleteClick = (user) => {
//     setSelectedUser(user);
//     setIsDeleteModalOpen(true);
//   };

//   const handleConfirmDelete = () => {
//     setData((prevData) =>
//       prevData.filter((item) => item.id !== selectedUser.id)
//     );
//     setIsDeleteModalOpen(false);
//     setSelectedUser(null);
//   };

//   const totalPages = Math.ceil(data.length / itemsPerPage);
//   const paginatedData = data.slice(
//     (currentPage - 1) * itemsPerPage,
//     currentPage * itemsPerPage
//   );

//   return (
//     <div className="container mx-auto p-4">
//       <div className="flex items-center justify-between mb-4">
//         <div className="flex items-center">
//           <label htmlFor="itemsPerPage" className="mr-2">
//             Items per Page:
//           </label>
//           <select
//             id="itemsPerPage"
//             className="border rounded p-1"
//             value={itemsPerPage}
//             onChange={handleItemsPerPageChange}
//           >
//             <option value="3">3</option>
//             <option value="5">5</option>
//             <option value="10">10</option>
//           </select>
//         </div>
//         <button
//           className="bg-blue-500 text-white p-2 rounded flex items-center"
//           onClick={() => setIsAddModalOpen(true)}
//         >
//           <i className="fas fa-user-plus mr-2"></i>Add User
//         </button>
//       </div>

//       <div className="overflow-x-auto">
//         <table className="min-w-full bg-white border border-gray-300">
//           <thead>
//             <tr>
//               <th className="py-2 px-4 border border-gray-300">No</th>
//               <th className="py-2 px-4 border border-gray-300">Nama</th>
//               <th className="py-2 px-4 border border-gray-300">Email</th>
//               <th className="py-2 px-4 border border-gray-300">Password</th>
//               <th className="py-2 px-4 border border-gray-300">Role</th>
//               <th className="py-2 px-4 border border-gray-300">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {paginatedData.map((row, index) => (
//               <tr key={index}>
//                 <td className="py-2 px-4 border border-gray-300">{row.id}</td>
//                 <td className="py-2 px-4 border border-gray-300">{row.nama}</td>
//                 <td className="py-2 px-4 border border-gray-300">{row.email}</td>
//                 <td className="py-2 px-4 border border-gray-300">{row.password}</td>
//                 <td className="py-2 px-4 border border-gray-300">{row.role}</td>
//                 <td className="py-2 px-4 border border-gray-300">
//                   <button
//                     className="text-blue-500 mr-2"
//                     onClick={() => handleEditClick(row)}
//                   >
//                     <i className="fas fa-edit"></i>
//                   </button>
//                   <button
//                     className="text-red-500"
//                     onClick={() => handleDeleteClick(row)} // Open delete modal
//                   >
//                     <i className="fas fa-trash"></i>
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       <div className="flex items-center justify-between mt-4">
//         <div className="flex items-center">
//           <button
//             className="border rounded p-2 mr-2"
//             disabled={currentPage === 1}
//             onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
//           >
//             <i className="fas fa-angle-left"></i>
//           </button>
//           {Array.from({ length: totalPages }, (_, index) => (
//             <button
//               key={index}
//               className={`border rounded p-2 mx-1 ${currentPage === index + 1 ? "bg-blue-500 text-white" : ""}`}
//               onClick={() => setCurrentPage(index + 1)}
//             >
//               {index + 1}
//             </button>
//           ))}
//           <button
//             className="border rounded p-2 ml-2"
//             disabled={currentPage === totalPages}
//             onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
//           >
//             <i className="fas fa-angle-right"></i>
//           </button>
//         </div>
//         <button className="bg-red-500 text-white p-2 rounded">Remove All</button>
//       </div>

//       {/* Edit User Modal */}
//       <EditUserModal
//         isOpen={isModalOpen}
//         onClose={() => setIsModalOpen(false)}
//         userData={editingUser}
//         onSave={handleSaveUser}
//       />

//       {/* Add User Modal */}
//       <AddUserModal
//         isOpen={isAddModalOpen}
//         onClose={() => setIsAddModalOpen(false)}
//         onAdd={handleAddUser}
//       />

//       {/* Hapus User Modal */}
//       <HapusModal
//         isOpen={isDeleteModalOpen}
//         onClose={() => setIsDeleteModalOpen(false)}
//         onDelete={handleConfirmDelete}
//       />
//     </div>
//   );
// };

// export default TableWithPagination;

// import React, { useState, useEffect } from "react";
// import EditUserModal from "../Modal/Edit";
// import AddUserModal from "../Modal/Tambah";
// import HapusModal from "../Modal/Hapus";
// import axios from "axios";

// const TableWithPagination = () => {
//   const [itemsPerPage, setItemsPerPage] = useState(3);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [data, setData] = useState([]);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [isAddModalOpen, setIsAddModalOpen] = useState(false);
//   const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
//   const [editingUser, setEditingUser] = useState(null);
//   const [selectedUser, setSelectedUser] = useState(null);

//   // Fetch data from backend on component mount
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axios.get("http://localhost:3000/user/getUsers");
//         setData(response.data);
//       } catch (error) {
//         console.error("Error fetching data:", error);
//       }
//     };
//     fetchData();
//   }, []);

//   const handleItemsPerPageChange = (e) => {
//     setItemsPerPage(Number(e.target.value));
//     setCurrentPage(1);
//   };

//   const handleEditClick = (user) => {
//     setEditingUser(user);
//     setIsModalOpen(true);
//   };

//   const handleSaveUser = (updatedUser) => {
//     setData((prevData) =>
//       prevData.map((user) =>
//         user.id_user === updatedUser.id_user ? updatedUser : user
//       )
//     );
//   };

//   const handleAddUser = (newUser) => {
//     setData((prevData) => {
//       const lastId = Math.max(...prevData.map(user => user.id_user), 0);
//       const newId = lastId + 1;
//       return [...prevData, { id_user: newId, ...newUser }];
//     });
//   };

//   const handleDeleteClick = (user) => {
//     setSelectedUser(user);
//     setIsDeleteModalOpen(true);
//   };

//   const handleConfirmDelete = () => {
//     setData((prevData) =>
//       prevData.filter((item) => item.id_user !== selectedUser.id_user)
//     );
//     setIsDeleteModalOpen(false);
//     setSelectedUser(null);
//   };

//   const totalPages = Math.ceil(data.length / itemsPerPage);
//   const paginatedData = data.slice(
//     (currentPage - 1) * itemsPerPage,
//     currentPage * itemsPerPage
//   );

//   return (
//     <div className="container mx-auto p-4">
//       <div className="flex items-center justify-between mb-4">
//         <div className="flex items-center">
//           <label htmlFor="itemsPerPage" className="mr-2">
//             Items per Page:
//           </label>
//           <select
//             id="itemsPerPage"
//             className="border rounded p-1"
//             value={itemsPerPage}
//             onChange={handleItemsPerPageChange}
//           >
//             <option value="3">3</option>
//             <option value="5">5</option>
//             <option value="10">10</option>
//           </select>
//         </div>
//         <button
//           className="bg-blue-500 text-white p-2 rounded flex items-center"
//           onClick={() => setIsAddModalOpen(true)}
//         >
//           <i className="fas fa-user-plus mr-2"></i>Add User
//         </button>
//       </div>

//       <div className="overflow-x-auto">
//         <table className="min-w-full bg-white border border-gray-300">
//           <thead>
//             <tr>
//               <th className="py-2 px-4 border border-gray-300">No</th>
//               <th className="py-2 px-4 border border-gray-300">Nama</th>
//               <th className="py-2 px-4 border border-gray-300">Email</th>
//               <th className="py-2 px-4 border border-gray-300">Role</th>
//               <th className="py-2 px-4 border border-gray-300">Password</th>
//               <th className="py-2 px-4 border border-gray-300">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {paginatedData.map((row, index) => (
//               <tr key={row.id_user}>
//                 <td className="py-2 px-4 border border-gray-300">
//                   {(currentPage - 1) * itemsPerPage + index + 1}
//                 </td>
//                 <td className="py-2 px-4 border border-gray-300">{row.nama}</td>
//                 <td className="py-2 px-4 border border-gray-300">{row.email}</td>
//                 <td className="py-2 px-4 border border-gray-300">{row.roles}</td>
//                 <td className="py-2 px-4 border border-gray-300">{row.password}</td>
//                 <td className="py-2 px-4 border border-gray-300">
//                   <button
//                     className="text-blue-500 mr-2"
//                     onClick={() => handleEditClick(row)}
//                   >
//                     <i className="fas fa-edit"></i>
//                   </button>
//                   <button
//                     className="text-red-500"
//                     onClick={() => handleDeleteClick(row)}
//                   >
//                     <i className="fas fa-trash"></i>
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       <div className="flex items-center justify-between mt-4">
//         <div className="flex items-center">
//           <button
//             className="border rounded p-2 mr-2"
//             disabled={currentPage === 1}
//             onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
//           >
//             <i className="fas fa-angle-left"></i>
//           </button>
//           {Array.from({ length: totalPages }, (_, index) => (
//             <button
//               key={index}
//               className={`border rounded p-2 mx-1 ${currentPage === index + 1 ? "bg-blue-500 text-white" : ""
//                 }`}
//               onClick={() => setCurrentPage(index + 1)}
//             >
//               {index + 1}
//             </button>
//           ))}
//           <button
//             className="border rounded p-2 ml-2"
//             disabled={currentPage === totalPages}
//             onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
//           >
//             <i className="fas fa-angle-right"></i>
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default TableWithPagination;


// import React, { useState, useEffect } from "react";
// import EditUserModal from "../Modal/Edit";
// import AddUserModal from "../Modal/Tambah";
// import HapusModal from "../Modal/Hapus";
// import axios from "axios";

// const TableWithPagination = () => {
//   const [itemsPerPage, setItemsPerPage] = useState(3);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [data, setData] = useState([]);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [isAddModalOpen, setIsAddModalOpen] = useState(false);
//   const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
//   const [editingUser, setEditingUser] = useState(null);
//   const [selectedUser, setSelectedUser] = useState(null);

//   // Fetch data from backend on component mount
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axios.get("http://localhost:3000/user/getUsers");
//         setData(response.data);
//       } catch (error) {
//         console.error("Error fetching data:", error);
//       }
//     };
//     fetchData();
//   }, []);

//   const handleItemsPerPageChange = (e) => {
//     setItemsPerPage(Number(e.target.value));
//     setCurrentPage(1);
//   };

//   const handleEditClick = (user) => {
//     setEditingUser(user);
//     setIsModalOpen(true);
//   };

//   const handleSaveUser = (updatedUser) => {
//     setData((prevData) =>
//       prevData.map((user) =>
//         user.id_user === updatedUser.id_user ? updatedUser : user
//       )
//     );
//     setIsModalOpen(false);
//   };

//   const handleAddUser = (newUser) => {
//     setData((prevData) => {
//       const lastId = Math.max(...prevData.map(user => user.id_user), 0);
//       const newId = lastId + 1;
//       return [...prevData, { id_user: newId, ...newUser }];
//     });
//     setIsAddModalOpen(false);
//   };

//   const handleDeleteClick = (user) => {
//     setSelectedUser(user);
//     setIsDeleteModalOpen(true);
//   };

//   const handleConfirmDelete = () => {
//     setData((prevData) =>
//       prevData.filter((item) => item.id_user !== selectedUser.id_user)
//     );
//     setIsDeleteModalOpen(false);
//     setSelectedUser(null);
//   };

//   const totalPages = Math.ceil(data.length / itemsPerPage);
//   const paginatedData = data.slice(
//     (currentPage - 1) * itemsPerPage,
//     currentPage * itemsPerPage
//   );

//   return (
//     <div className="container mx-auto p-4">
//       <div className="flex items-center justify-between mb-4">
//         <div className="flex items-center">
//           <label htmlFor="itemsPerPage" className="mr-2">
//             Items per Page:
//           </label>
//           <select
//             id="itemsPerPage"
//             className="border rounded p-1"
//             value={itemsPerPage}
//             onChange={handleItemsPerPageChange}
//           >
//             <option value="3">3</option>
//             <option value="5">5</option>
//             <option value="10">10</option>
//           </select>
//         </div>
//         <button
//           className="bg-blue-500 text-white p-2 rounded flex items-center"
//           onClick={() => setIsAddModalOpen(true)}
//         >
//           <i className="fas fa-user-plus mr-2"></i>Add User
//         </button>
//       </div>

//       <div className="overflow-x-auto">
//         <table className="min-w-full bg-white border border-gray-300">
//           <thead>
//             <tr>
//               <th className="py-2 px-4 border border-gray-300">No</th>
//               <th className="py-2 px-4 border border-gray-300">Nama</th>
//               <th className="py-2 px-4 border border-gray-300">Email</th>
//               <th className="py-2 px-4 border border-gray-300">Role</th>
//               <th className="py-2 px-4 border border-gray-300">Password</th>
//               <th className="py-2 px-4 border border-gray-300">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {paginatedData.map((row, index) => (
//               <tr key={row.id_user}>
//                 <td className="py-2 px-4 border border-gray-300">
//                   {(currentPage - 1) * itemsPerPage + index + 1}
//                 </td>
//                 <td className="py-2 px-4 border border-gray-300">{row.nama}</td>
//                 <td className="py-2 px-4 border border-gray-300">{row.email}</td>
//                 <td className="py-2 px-4 border border-gray-300">{row.roles}</td>
//                 <td className="py-2 px-4 border border-gray-300">{row.password}</td>
//                 <td className="py-2 px-4 border border-gray-300">
//                   <button
//                     className="text-blue-500 mr-2"
//                     onClick={() => handleEditClick(row)}
//                   >
//                     <i className="fas fa-edit"></i>
//                   </button>
//                   <button
//                     className="text-red-500"
//                     onClick={() => handleDeleteClick(row)}
//                   >
//                     <i className="fas fa-trash"></i>
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       <div className="flex items-center justify-between mt-4">
//         <div className="flex items-center">
//           <button
//             className="border rounded p-2 mr-2"
//             disabled={currentPage === 1}
//             onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
//           >
//             <i className="fas fa-angle-left"></i>
//           </button>
//           {Array.from({ length: totalPages }, (_, index) => (
//             <button
//               key={index}
//               className={`border rounded p-2 mx-1 ${currentPage === index + 1 ? "bg-blue-500 text-white" : ""
//                 }`}
//               onClick={() => setCurrentPage(index + 1)}
//             >
//               {index + 1}
//             </button>
//           ))}
//           <button
//             className="border rounded p-2 ml-2"
//             disabled={currentPage === totalPages}
//             onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
//           >
//             <i className="fas fa-angle-right"></i>
//           </button>
//         </div>
//       </div>

//       {/* Modals */}
//       {isModalOpen && <EditUserModal user={editingUser} onClose={() => setIsModalOpen(false)} onSave={handleSaveUser} />}
//       {isAddModalOpen && <AddUserModal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} onAdd={handleAddUser} />}
//       {isDeleteModalOpen && <HapusModal isOpen={isDeleteModalOpen} onClose={() => setIsDeleteModalOpen(false)} onDelete={handleConfirmDelete} />}
//     </div>
//   );
// };

// export default TableWithPagination;


// import React, { useState, useEffect } from "react";
// import EditUserModal from "../Modal/Edit";
// import AddUserModal from "../Modal/Tambah";
// import HapusModal from "../Modal/Hapus";
// import axios from "axios";

// const TableWithPagination = () => {
//   const [itemsPerPage, setItemsPerPage] = useState(3);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [data, setData] = useState([]);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [isAddModalOpen, setIsAddModalOpen] = useState(false);
//   const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
//   const [editingUser, setEditingUser] = useState(null);
//   const [selectedUser, setSelectedUser] = useState(null);

//   // Fetch data from backend on component mount
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axios.get("http://localhost:3000/user/getUsers");
//         setData(response.data);
//       } catch (error) {
//         console.error("Error fetching data:", error);
//       }
//     };
//     fetchData();
//   }, []);

//   const handleItemsPerPageChange = (e) => {
//     setItemsPerPage(Number(e.target.value));
//     setCurrentPage(1);
//   };

//   const handleEditClick = (user) => {
//     setEditingUser(user);
//     setIsModalOpen(true);
//   };

//   const handleSaveUser = async (updatedUser) => {
//     try {
//       await axios.put(`http://localhost:3000/user/updateUser/${updatedUser.id_user}`, updatedUser);
//       setData((prevData) =>
//         prevData.map((user) =>
//           user.id_user === updatedUser.id_user ? updatedUser : user
//         )
//       );
//       setIsModalOpen(false);
//     } catch (error) {
//       console.error("Error updating user:", error);
//     }
//   };

//   const handleAddUser = async (newUser) => {
//     try {
//       const response = await axios.post("http://localhost:3000/user/addUser", newUser);
//       setData((prevData) => [
//         ...prevData,
//         { id_user: response.data.userId, ...newUser },
//       ]);
//       setIsAddModalOpen(false);
//     } catch (error) {
//       console.error("Error adding user:", error);
//     }
//   };

//   const handleDeleteClick = (user) => {
//     setSelectedUser(user);
//     setIsDeleteModalOpen(true);
//   };

//   const handleConfirmDelete = async () => {
//     try {
//       await axios.delete(`http://localhost:3000/user/deleteUser/${selectedUser.id_user}`);
//       setData((prevData) =>
//         prevData.filter((item) => item.id_user !== selectedUser.id_user)
//       );
//       setIsDeleteModalOpen(false);
//       setSelectedUser(null);
//     } catch (error) {
//       console.error("Error deleting user:", error);
//     }
//   };

//   const totalPages = Math.ceil(data.length / itemsPerPage);
//   const paginatedData = data.slice(
//     (currentPage - 1) * itemsPerPage,
//     currentPage * itemsPerPage
//   );

//   return (
//     <div className="container mx-auto p-4">
//       <div className="flex items-center justify-between mb-4">
//         <div className="flex items-center">
//           <label htmlFor="itemsPerPage" className="mr-2">
//             Items per Page:
//           </label>
//           <select
//             id="itemsPerPage"
//             className="border rounded p-1"
//             value={itemsPerPage}
//             onChange={handleItemsPerPageChange}
//           >
//             <option value="3">3</option>
//             <option value="5">5</option>
//             <option value="10">10</option>
//           </select>
//         </div>
//         <button
//           className="bg-blue-500 text-white p-2 rounded flex items-center"
//           onClick={() => setIsAddModalOpen(true)}
//         >
//           <i className="fas fa-user-plus mr-2"></i>Add User
//         </button>
//       </div>

//       <div className="overflow-x-auto">
//         <table className="min-w-full bg-white border border-gray-300">
//           <thead>
//             <tr>
//               <th className="py-2 px-4 border border-gray-300">No</th>
//               <th className="py-2 px-4 border border-gray-300">Nama</th>
//               <th className="py-2 px-4 border border-gray-300">Email</th>
//               <th className="py-2 px-4 border border-gray-300">Role</th>
//               <th className="py-2 px-4 border border-gray-300">Password</th>
//               <th className="py-2 px-4 border border-gray-300">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {paginatedData.map((row, index) => (
//               <tr key={row.id_user}>
//                 <td className="py-2 px-4 border border-gray-300">
//                   {(currentPage - 1) * itemsPerPage + index + 1}
//                 </td>
//                 <td className="py-2 px-4 border border-gray-300">{row.nama}</td>
//                 <td className="py-2 px-4 border border-gray-300">{row.email}</td>
//                 <td className="py-2 px-4 border border-gray-300">{row.roles}</td>
//                 <td className="py-2 px-4 border border-gray-300">{row.password}</td>
//                 <td className="py-2 px-4 border border-gray-300">
//                   <button
//                     className="text-blue-500 mr-2"
//                     onClick={() => handleEditClick(row)}
//                   >
//                     <i className="fas fa-edit"></i>
//                   </button>
//                   <button
//                     className="text-red-500"
//                     onClick={() => handleDeleteClick(row)}
//                   >
//                     <i className="fas fa-trash"></i>
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       <div className="flex items-center justify-between mt-4">
//         <div className="flex items-center">
//           <button
//             className="border rounded p-2 mr-2"
//             disabled={currentPage === 1}
//             onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
//           >
//             <i className="fas fa-angle-left"></i>
//           </button>
//           {Array.from({ length: totalPages }, (_, index) => (
//             <button
//               key={index}
//               className={`border rounded p-2 mx-1 ${currentPage === index + 1 ? "bg-blue-500 text-white" : ""}`}
//               onClick={() => setCurrentPage(index + 1)}
//             >
//               {index + 1}
//             </button>
//           ))}
//           <button
//             className="border rounded p-2 ml-2"
//             disabled={currentPage === totalPages}
//             onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
//           >
//             <i className="fas fa-angle-right"></i>
//           </button>
//         </div>
//       </div>

//       {/* Modals */}
//       {isModalOpen && <EditUserModal user={editingUser} onClose={() => setIsModalOpen(false)} onSave={handleSaveUser} />}
//       {isAddModalOpen && <AddUserModal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} onAdd={handleAddUser} />}
//       {isDeleteModalOpen && <HapusModal isOpen={isDeleteModalOpen} onClose={() => setIsDeleteModalOpen(false)} onConfirm={handleConfirmDelete} />}
//     </div>
//   );
// };

// export default TableWithPagination;


// import React, { useState, useEffect } from "react";
// import EditUserModal from "../Modal/Edit";
// import AddUserModal from "../Modal/Tambah";
// import HapusModal from "../Modal/Hapus";
// import axios from "axios";

// const TableWithPagination = () => {
//   const [itemsPerPage, setItemsPerPage] = useState(3);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [data, setData] = useState([]);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [isAddModalOpen, setIsAddModalOpen] = useState(false);
//   const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
//   const [editingUser, setEditingUser] = useState(null);
//   const [selectedUser, setSelectedUser] = useState(null);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axios.get("http://localhost:3000/user/getUsers");
//         setData(response.data);
//       } catch (error) {
//         console.error("Error fetching data:", error);
//       }
//     };
//     fetchData();
//   }, []);

//   const handleItemsPerPageChange = (e) => {
//     setItemsPerPage(Number(e.target.value));
//     setCurrentPage(1);
//   };

//   const handleEditClick = (user) => {
//     setEditingUser(user);
//     setIsModalOpen(true);
//   };

//   const handleSaveUser = async (updatedUser) => {
//     try {
//       await axios.put(`http://localhost:3000/user/updateUser/${updatedUser.id_user}`, updatedUser);
//       setData((prevData) =>
//         prevData.map((user) =>
//           user.id_user === updatedUser.id_user ? updatedUser : user
//         )
//       );
//       setIsModalOpen(false);
//     } catch (error) {
//       console.error("Error updating user:", error);
//     }
//   };

//   const handleAddUser = async (newUser) => {
//     try {
//       const response = await axios.post("http://localhost:3000/user/addUser", newUser);
//       setData((prevData) => [
//         ...prevData,
//         { id_user: response.data.userId, ...newUser },
//       ]);
//       setIsAddModalOpen(false);
//     } catch (error) {
//       console.error("Error adding user:", error);
//     }
//   };

//   const handleDeleteClick = (user) => {
//     setSelectedUser(user);
//     setIsDeleteModalOpen(true);
//   };

//   const handleConfirmDelete = async () => {
//     try {
//       await axios.delete(`http://localhost:3000/user/deleteUser/${selectedUser.id_user}`);
//       setData((prevData) =>
//         prevData.filter((item) => item.id_user !== selectedUser.id_user)
//       );
//       setIsDeleteModalOpen(false);
//       setSelectedUser(null);
//     } catch (error) {
//       console.error("Error deleting user:", error);
//     }
//   };

//   const totalPages = Math.ceil(data.length / itemsPerPage);
//   const paginatedData = data.slice(
//     (currentPage - 1) * itemsPerPage,
//     currentPage * itemsPerPage
//   );

//   return (
//     <div className="container mx-auto p-4">
//       <div className="flex items-center justify-between mb-4">
//         <div className="flex items-center">
//           <label htmlFor="itemsPerPage" className="mr-2">Items per Page:</label>
//           <select
//             id="itemsPerPage"
//             className="border rounded p-1"
//             value={itemsPerPage}
//             onChange={handleItemsPerPageChange}
//           >
//             <option value="3">3</option>
//             <option value="5">5</option>
//             <option value="10">10</option>
//           </select>
//         </div>
//         <button
//           className="bg-blue-500 text-white p-2 rounded flex items-center"
//           onClick={() => setIsAddModalOpen(true)}
//         >
//           <i className="fas fa-user-plus mr-2"></i>Add User
//         </button>
//       </div>

//       <div className="overflow-x-auto">
//         <table className="min-w-full bg-white border border-gray-300">
//           <thead>
//             <tr>
//               <th className="py-2 px-4 border border-gray-300">No</th>
//               <th className="py-2 px-4 border border-gray-300">Nama</th>
//               <th className="py-2 px-4 border border-gray-300">Email</th>
//               <th className="py-2 px-4 border border-gray-300">Role</th>
//               <th className="py-2 px-4 border border-gray-300">Password</th>
//               <th className="py-2 px-4 border border-gray-300">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {paginatedData.map((row, index) => (
//               <tr key={row.id_user}>
//                 <td className="py-2 px-4 border border-gray-300">
//                   {(currentPage - 1) * itemsPerPage + index + 1}
//                 </td>
//                 <td className="py-2 px-4 border border-gray-300">{row.nama}</td>
//                 <td className="py-2 px-4 border border-gray-300">{row.email}</td>
//                 <td className="py-2 px-4 border border-gray-300">{row.roles}</td>
//                 <td className="py-2 px-4 border border-gray-300">{row.password}</td>
//                 <td className="py-2 px-4 border border-gray-300">
//                   <button
//                     className="text-blue-500 mr-2"
//                     onClick={() => handleEditClick(row)}
//                   >
//                     <i className="fas fa-edit"></i>
//                   </button>
//                   <button
//                     className="text-red-500"
//                     onClick={() => handleDeleteClick(row)}
//                   >
//                     <i className="fas fa-trash"></i>
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       <div className="flex items-center justify-between mt-4">
//         <div className="flex items-center">
//           <button
//             className="border rounded p-2 mr-2"
//             disabled={currentPage === 1}
//             onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
//           >
//             <i className="fas fa-angle-left"></i>
//           </button>
//           {Array.from({ length: totalPages }, (_, index) => (
//             <button
//               key={index}
//               className={`border rounded p-2 mx-1 ${currentPage === index + 1 ? "bg-blue-500 text-white" : ""}`}
//               onClick={() => setCurrentPage(index + 1)}
//             >
//               {index + 1}
//             </button>
//           ))}
//           <button
//             className="border rounded p-2 ml-2"
//             disabled={currentPage === totalPages}
//             onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
//           >
//             <i className="fas fa-angle-right"></i>
//           </button>
//         </div>
//       </div>

//       {/* Modals */}
//       {isModalOpen && <EditUserModal user={editingUser} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onSave={handleSaveUser} />}
//       {isAddModalOpen && <AddUserModal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} onAdd={handleAddUser} />}
//       {isDeleteModalOpen && <HapusModal isOpen={isDeleteModalOpen} onClose={() => setIsDeleteModalOpen(false)} onConfirm={handleConfirmDelete} />}
//     </div>
//   );
// };

// export default TableWithPagination;



// TableWithPagination.js
import React, { useState, useEffect } from "react";
import EditUserModal from "../Modal/Edit";
import AddUserModal from "../Modal/Tambah";
import HapusModal from "../Modal/Hapus";
import axios from "axios";

const TableWithPagination = () => {
  const [itemsPerPage, setItemsPerPage] = useState(3);
  const [currentPage, setCurrentPage] = useState(1);
  const [data, setData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/user/getUsers");
        setData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const handleItemsPerPageChange = (e) => {
    setItemsPerPage(Number(e.target.value));
    setCurrentPage(1);
  };

  const handleEditClick = (user) => {
    setEditingUser(user);
    setIsModalOpen(true);
  };

  const handleSaveUser = async (updatedUser) => {
    try {
      await axios.put(`http://localhost:3000/user/updateUser/${updatedUser.id_user}`, updatedUser);
      setData((prevData) =>
        prevData.map((user) =>
          user.id_user === updatedUser.id_user ? updatedUser : user
        )
      );
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  const handleAddUser = async (newUser) => {
    try {
      const response = await axios.post("http://localhost:3000/user/addUser", newUser);
      setData((prevData) => [
        ...prevData,
        { id_user: response.data.userId, ...newUser },
      ]);
      setIsAddModalOpen(false);
    } catch (error) {
      console.error("Error adding user:", error);
    }
  };

  const handleDeleteClick = (user) => {
    setSelectedUser(user);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    try {
      await axios.delete(`http://localhost:3000/user/deleteUser/${selectedUser.id_user}`);
      setData((prevData) =>
        prevData.filter((item) => item.id_user !== selectedUser.id_user)
      );
      setIsDeleteModalOpen(false);
      setSelectedUser(null);
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const totalPages = Math.ceil(data.length / itemsPerPage);
  const paginatedData = data.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="container mx-auto p-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <label htmlFor="itemsPerPage" className="mr-2">Items per Page:</label>
          <select
            id="itemsPerPage"
            className="border rounded p-1"
            value={itemsPerPage}
            onChange={handleItemsPerPageChange}
          >
            <option value="3">3</option>
            <option value="5">5</option>
            <option value="10">10</option>
          </select>
        </div>
        <button
          className="bg-blue-500 text-white p-2 rounded flex items-center"
          onClick={() => setIsAddModalOpen(true)}
        >
          <i className="fas fa-user-plus mr-2"></i>Add User
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr>
              <th className="py-2 px-4 border border-gray-300">No</th>
              <th className="py-2 px-4 border border-gray-300">Nama</th>
              <th className="py-2 px-4 border border-gray-300">Email</th>
              <th className="py-2 px-4 border border-gray-300">Role</th>
              <th className="py-2 px-4 border border-gray-300">Password</th>
              <th className="py-2 px-4 border border-gray-300">Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedData.map((row, index) => (
              <tr key={row.id_user}>
                <td className="py-2 px-4 border border-gray-300">
                  {(currentPage - 1) * itemsPerPage + index + 1}
                </td>
                <td className="py-2 px-4 border border-gray-300">{row.nama}</td>
                <td className="py-2 px-4 border border-gray-300">{row.email}</td>
                <td className="py-2 px-4 border border-gray-300">{row.roles}</td>
                <td className="py-2 px-4 border border-gray-300">{row.password}</td>
                <td className="py-2 px-4 border border-gray-300">
                  <button
                    className="text-blue-500 mr-2"
                    onClick={() => handleEditClick(row)}
                  >
                    <i className="fas fa-edit"></i>
                  </button>
                  <button
                    className="text-red-500"
                    onClick={() => handleDeleteClick(row)}
                  >
                    <i className="fas fa-trash"></i>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-between mt-4">
        <div className="flex items-center">
          <button
            className="border rounded p-2 mr-2"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          >
            <i className="fas fa-angle-left"></i>
          </button>
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index}
              className={`border rounded p-2 mx-1 ${currentPage === index + 1 ? "bg-blue-500 text-white" : ""}`}
              onClick={() => setCurrentPage(index + 1)}
            >
              {index + 1}
            </button>
          ))}
          <button
            className="border rounded p-2 ml-2"
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          >
            <i className="fas fa-angle-right"></i>
          </button>
        </div>
      </div>

      {/* Modals */}
      {isModalOpen && <EditUserModal user={editingUser} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onSave={handleSaveUser} />}
      {isAddModalOpen && <AddUserModal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} onAdd={handleAddUser} />}
      {isDeleteModalOpen && <HapusModal isOpen={isDeleteModalOpen} onClose={() => setIsDeleteModalOpen(false)} onConfirm={handleConfirmDelete} />}
    </div>
  );
};

export default TableWithPagination;
