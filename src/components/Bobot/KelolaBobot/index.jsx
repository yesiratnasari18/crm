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
// import HapusModal from "../Modal/Hapus"; // Import Hapus Modal

// const TableWithPagination = () => {
//   const [itemsPerPage, setItemsPerPage] = useState(3);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [data, setData] = useState([]);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [isAddModalOpen, setIsAddModalOpen] = useState(false);
//   const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false); // State untuk modal hapus
//   const [editingUser, setEditingUser] = useState(null);
//   const [selectedUser, setSelectedUser] = useState(null); // User yang akan dihapus

//   useEffect(() => {
//     // Memuat data dari API atau database
//     // Mengganti data awal dengan data dari API atau backend
//     fetchData();
//   }, []);

//   const fetchData = async () => {
//     try {
//       const response = await fetch("/api/bobot"); // Ganti dengan URL endpoint backend Anda
//       const result = await response.json();
//       setData(result);
//     } catch (error) {
//       console.error("Error fetching data:", error);
//     }
//   };

//   const handleItemsPerPageChange = (e) => {
//     setItemsPerPage(Number(e.target.value));
//     setCurrentPage(1);
//   };

//   const handleEditClick = (item) => {
//     setEditingUser(item);
//     setIsModalOpen(true);
//   };

//   const handleSaveUser = (updatedItem) => {
//     setData((prevData) =>
//       prevData.map((item) =>
//         item.id_bobot === updatedItem.id_bobot ? updatedItem : item
//       )
//     );
//   };

//   const handleAddUser = (newUser) => {
//     setData((prevData) => [
//       ...prevData,
//       { id_bobot: Date.now(), ...newUser }, // Generate ID baru menggunakan timestamp
//     ]);
//   };

//   const handleDeleteClick = (item) => {
//     setSelectedUser(item);
//     setIsDeleteModalOpen(true);
//   };

//   const handleConfirmDelete = () => {
//     setData((prevData) =>
//       prevData.filter((item) => item.id_bobot !== selectedUser.id_bobot)
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
//           <i className="fas fa-user-plus mr-2"></i>Add Bobot
//         </button>
//       </div>

//       <div className="overflow-x-auto">
//         <table className="min-w-full bg-white border border-gray-300">
//           <thead>
//             <tr>
//               <th className="py-2 px-4 border border-gray-300">No</th>
//               <th className="py-2 px-4 border border-gray-300">Kriteria</th>
//               <th className="py-2 px-4 border border-gray-300">Nilai</th>
//               <th className="py-2 px-4 border border-gray-300">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {paginatedData.map((row, index) => (
//               <tr key={index}>
//                 <td className="py-2 px-4 border border-gray-300">{row.id_bobot}</td>
//                 <td className="py-2 px-4 border border-gray-300">{row.kriteria}</td>
//                 <td className="py-2 px-4 border border-gray-300">{row.nilai}</td>
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



import React, { useState, useEffect } from "react";
import EditUserModal from "../Modal/Edit";
// import AddUserModal from "../Modal/Tambah";
// import HapusModal from "../Modal/Hapus"; // Import Hapus Modal

const TableWithPagination = () => {
  const [itemsPerPage, setItemsPerPage] = useState(3);
  const [currentPage, setCurrentPage] = useState(1);
  const [data, setData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false); // State untuk modal hapus
  const [editingUser, setEditingUser] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null); // User yang akan dihapus

  useEffect(() => {
    // Memuat data dari API atau database
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:3000/user/getBobot"); // Ganti dengan URL endpoint backend Anda
      const result = await response.json();
      setData(result);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleItemsPerPageChange = (e) => {
    setItemsPerPage(Number(e.target.value));
    setCurrentPage(1);
  };

  const handleEditClick = (item) => {
    setEditingUser(item);  // Set the user to edit
    setIsModalOpen(true);  // Open the modal
  };

  const handleSaveUser = async (updatedItem) => {
    try {
      const response = await fetch(`http://localhost:3000/user/updateBobot/${updatedItem.id_bobot}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          kriteria: updatedItem.kriteria,
          nilai: updatedItem.nilai,
        }),
      });
      const result = await response.json();
      if (response.ok) {
        setData((prevData) =>
          prevData.map((item) =>
            item.id_bobot === result.id_bobot ? result : item
          )
        );
        setIsModalOpen(false); // Close the modal after saving
      } else {
        console.error("Failed to update:", result.error);
      }
    } catch (error) {
      console.error("Error saving data:", error);
    }
  };

  // const handleAddUser = (newUser) => {
  //   setData((prevData) => [
  //     ...prevData,
  //     { id_bobot: Date.now(), ...newUser }, // Generate ID baru menggunakan timestamp
  //   ]);
  // };

  // const handleDeleteClick = (item) => {
  //   setSelectedUser(item);
  //   setIsDeleteModalOpen(true);
  // };

  // const handleConfirmDelete = () => {
  //   setData((prevData) =>
  //     prevData.filter((item) => item.id_bobot !== selectedUser.id_bobot)
  //   );
  //   setIsDeleteModalOpen(false);
  //   setSelectedUser(null);
  // };

  const totalPages = Math.ceil(data.length / itemsPerPage);
  const paginatedData = data.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="container mx-auto p-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <label htmlFor="itemsPerPage" className="mr-2">
            Items per Page:
          </label>
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
        {/* <button
          className="bg-blue-500 text-white p-2 rounded flex items-center"
          onClick={() => setIsAddModalOpen(true)}
        >
          <i className="fas fa-user-plus mr-2"></i>Add Bobot
        </button> */}
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr>
              <th className="py-2 px-4 border border-gray-300">No</th>
              <th className="py-2 px-4 border border-gray-300">Kriteria</th>
              <th className="py-2 px-4 border border-gray-300">Nilai</th>
              <th className="py-2 px-4 border border-gray-300">Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedData.map((row, index) => (
              <tr key={index}>
                <td className="py-2 px-4 border border-gray-300">{row.id_bobot}</td>
                <td className="py-2 px-4 border border-gray-300">{row.kriteria}</td>
                <td className="py-2 px-4 border border-gray-300">{row.nilai}</td>
                <td className="py-2 px-4 border border-gray-300">
                  <button
                    className="text-blue-500 mr-2"
                    onClick={() => handleEditClick(row)} // This will open the edit modal
                  >
                    <i className="fas fa-edit"></i>
                  </button>
                  {/* <button
                    className="text-red-500"
                    onClick={() => handleDeleteClick(row)} // Open delete modal
                  >
                    <i className="fas fa-trash"></i>
                  </button> */}
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

      {/* Edit User Modal */}
      <EditUserModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        userData={editingUser}
        onSave={handleSaveUser}
      />

      {/* Add User Modal */}
      {/* <AddUserModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAdd={handleAddUser}
      /> */}

      {/* Hapus User Modal */}
      {/* <HapusModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onDelete={handleConfirmDelete}
      /> */}
    </div>
  );
};

export default TableWithPagination;
