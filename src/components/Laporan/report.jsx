// import React from 'react';

// const DataTable = () => {
//     return (

//         <section className="container mx-auto p-6 font-mono">
//             <div className="w-full mb-8 overflow-hidden rounded-lg shadow-lg">
//                 <div className="w-full overflow-x-auto">
//                     <table className="w-full">
//                         <thead>
//                             <tr className="text-md font-semibold tracking-wide text-left text-gray-900 bg-gray-100 uppercase border-b border-gray-600">
//                                 <th className="px-4 py-3">Nama</th>
//                                 <th className="px-4 py-3">Sektor</th>
//                                 <th className="px-4 py-3">Status</th>
//                                 <th className="px-4 py-3">Date</th>
//                             </tr>
//                         </thead>
//                         <tbody className="bg-white">
//                             {[
//                                 { name: 'Sufyan', sektor: 'Industri', status: 'Acceptable', date: '6/4/2000', role: 'Developer', statusColor: 'text-green-700 bg-green-100' },
//                                 { name: 'Stevens', sektor: 'Pertanian', status: 'Pending', date: '6/10/2020', role: 'Programmer', statusColor: 'text-orange-700 bg-gray-100' },
//                                 { name: 'Nora', sektor: 'Pendidikan', status: 'Unacceptable', date: '6/10/2020', role: 'Designer', statusColor: 'text-red-700 bg-red-100' },
//                                 { name: 'Ali', sektor: 'Perbankan', status: 'Acceptable', date: '6/10/2020', role: 'Programmer', statusColor: 'text-green-700 bg-green-100' },
//                                 { name: 'Khalid', sektor: 'Pertambangan', status: 'Pending', date: '6/10/2020', role: 'Designer', statusColor: 'text-gray-700 bg-gray-100' },
//                                 { name: 'Nasser', sektor: 'Kesehatan', status: 'Acceptable', date: '6/10/2020', role: 'Pen Tester', statusColor: 'text-green-700 bg-green-100' },
//                                 { name: 'Mohammed', sektor: 'Pemerintahan', status: 'Acceptable', date: '6/10/2020', role: 'Web Designer', statusColor: 'text-green-700 bg-green-100' },
//                                 { name: 'Saad', sektor: 'Teknologi', status: 'Acceptable', date: '6/10/2020', role: 'Data', statusColor: 'text-green-700 bg-green-100' },
//                                 { name: 'Sami', sektor: 'Manufaktur', status: 'Acceptable', date: '6/10/2020', role: 'Developer', statusColor: 'text-green-700 bg-green-100' },
//                             ].map((person, index) => (
//                                 <tr key={index} className="text-gray-700">
//                                     <td className="px-4 py-3 border">
//                                         <div className="flex items-center text-sm">
//                                             <div className="relative w-8 h-8 mr-3 rounded-full">
//                                                 <img
//                                                     className="object-cover w-full h-full rounded-full"
//                                                     src="https://imsektors.pexels.com/photos/5212324/pexels-photo-5212324.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260"
//                                                     alt=""
//                                                     loading="lazy"
//                                                 />
//                                                 <div className="absolute inset-0 rounded-full shadow-inner" aria-hidden="true"></div>
//                                             </div>
//                                             <div>
//                                                 <p className="font-semibold text-black">{person.name}</p>
//                                                 <p className="text-xs text-gray-600">{person.role}</p>
//                                             </div>
//                                         </div>
//                                     </td>
//                                     <td className="px-4 py-3 text-md font-semibold border">{person.sektor}</td>
//                                     <td className="px-4 py-3 text-xs border">
//                                         <span className={`px-2 py-1 font-semibold leading-tight ${person.statusColor} rounded-sm`}>
//                                             {person.status}
//                                         </span>
//                                     </td>
//                                     <td className="px-4 py-3 text-sm border">{person.date}</td>
//                                 </tr>
//                             ))}
//                         </tbody>
//                     </table>
//                 </div>
//             </div>
//         </section>
//     );
// };

// export default DataTable;


// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const DataTable = () => {
//   const [data, setData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     // Fetch data from the backend API
//     axios.get('http://localhost:3000/user/contact')
//       .then((response) => {
//         setData(response.data.tasks);  // Set data from the backend response
//         setLoading(false);  // Set loading state to false once data is fetched
//       })
//       .catch((err) => {
//         console.error("Error fetching data:", err);
//         setError("Failed to load data");  // Handle error
//         setLoading(false);
//       });
//   }, []);

//   if (loading) {
//     return <p>Loading...</p>;
//   }

//   if (error) {
//     return <p>{error}</p>;
//   }

//   return (
//     <section className="container mx-auto p-6 font-mono">
//       <div className="w-full mb-8 overflow-hidden rounded-lg shadow-lg">
//         <div className="w-full overflow-x-auto">
//           <table className="w-full">
//             <thead>
//               <tr className="text-md font-semibold tracking-wide text-left text-gray-900 bg-gray-100 uppercase border-b border-gray-600">
//                 <th className="px-4 py-3">Nama</th>
//                 <th className="px-4 py-3">Sektor</th>
//                 <th className="px-4 py-3">Status</th>
//                 <th className="px-4 py-3">Phone</th>
//               </tr>
//             </thead>
//             <tbody className="bg-white">
//               {data.map((person, index) => (
//                 <tr key={index} className="text-gray-700">
//                   <td className="px-4 py-3 border">
//                     <div className="flex items-center text-sm">
//                       <div className="relative w-8 h-8 mr-3 rounded-full">
//                         <img
//                           className="object-cover w-full h-full rounded-full"
//                           src="https://imsektors.pexels.com/photos/5212324/pexels-photo-5212324.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260"
//                           alt="avatar"
//                           loading="lazy"
//                         />
//                       </div>
//                       <div>
//                         <p className="font-semibold text-black">{person.nama}</p>
//                         <p className="text-xs text-gray-600">{person.perusahaan}</p>
//                       </div>
//                     </div>
//                   </td>
//                   <td className="px-4 py-3 text-md font-semibold border">{person.sektor?.title}</td>
//                   <td className="px-4 py-3 text-xs border">
//                     <span className={`px-2 py-1 font-semibold leading-tight ${person.sektor?.bg} rounded-sm`}>
//                       {person.status || 'Unknown'}
//                     </span>
//                   </td>
//                   <td className="px-4 py-3 text-sm border">{person.no_telp}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default DataTable;



// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const DataTable = () => {
//   const [data, setData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     // Fetch data from the backend API
//     axios.get('http://localhost:3000/user/contact')
//       .then((response) => {
//         setData(response.data.tasks);  // Set data from the backend response
//         setLoading(false);  // Set loading state to false once data is fetched
//       })
//       .catch((err) => {
//         console.error("Error fetching data:", err);
//         setError("Failed to load data");  // Handle error
//         setLoading(false);
//       });
//   }, []);

//   if (loading) {
//     return <p>Loading...</p>;
//   }

//   if (error) {
//     return <p>{error}</p>;
//   }

//   return (
//     <section className="container mx-auto p-6 font-mono">
//       <div className="w-full mb-8 overflow-hidden rounded-lg shadow-lg">
//         <div className="w-full overflow-x-auto">
//           <table className="w-full">
//             <thead>
//               <tr className="text-md font-semibold tracking-wide text-left text-gray-900 bg-gray-100 uppercase border-b border-gray-600">
//                 <th className="px-4 py-3">Nama</th>
//                 <th className="px-4 py-3">Sektor</th>
//                 <th className="px-4 py-3">Status</th>
//                 <th className="px-4 py-3">Phone</th>
//               </tr>
//             </thead>
//             <tbody className="bg-white">
//               {data.map((person, index) => (
//                 <tr key={index} className="text-gray-700">
//                   <td className="px-4 py-3 border">
//                     <div className="flex items-center text-sm">
//                       <div className="relative w-8 h-8 mr-3 rounded-full">
//                         <img
//                           className="object-cover w-full h-full rounded-full"
//                           src="https://imsektors.pexels.com/photos/5212324/pexels-photo-5212324.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260"
//                           alt="avatar"
//                           loading="lazy"
//                         />
//                       </div>
//                       <div>
//                         <p className="font-semibold text-black">{person.nama}</p>
//                         <p className="text-xs text-gray-600">{person.perusahaan}</p>
//                       </div>
//                     </div>
//                   </td>
//                   <td className="px-4 py-3 text-md font-semibold border">{person.sektor?.title}</td>
//                   <td className="px-4 py-3 text-xs border">
//                     <span 
//                       className={`px-2 py-1 font-semibold leading-tight rounded-sm`}
//                       style={{ backgroundColor: person.sektor?.bg, color: person.sektor?.text }}
//                     >
//                       {person.status || 'Unknown'}
//                     </span>
//                   </td>
//                   <td className="px-4 py-3 text-sm border">{person.no_telp}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default DataTable;


// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const DataTable = () => {
//     const [data, setData] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);

//     useEffect(() => {
//         // Fetch data from the backend API
//         axios.get('http://localhost:3000/user/contact')
//             .then((response) => {
//                 setData(response.data.tasks);  // Set data from the backend response
//                 setLoading(false);  // Set loading state to false once data is fetched
//             })
//             .catch((err) => {
//                 console.error("Error fetching data:", err);
//                 setError("Failed to load data");  // Handle error
//                 setLoading(false);
//             });
//     }, []);

//     const getStatusStyle = (status) => {
//         switch (status) {
//             case 'PROSPECTING':
//                 return { backgroundColor: '#003366', color: '#fff' }; // Green
//             case 'CONTACTING':
//                 return { backgroundColor: '#E91E63', color: '#fff' }; // Red
//             case 'DISCUSSION':
//                 return { backgroundColor: '#FF9800', color: '#fff' }; // Orange
//             case 'NEGOTIATING':
//                 return { backgroundColor: '#FF9800', color: '#fff' }; // Blue
//             case 'COMPLETE':
//                 return { backgroundColor: '#4CAF50', color: '#fff' }; // Grey
//             case 'JUNK':
//                 return { backgroundColor: '#F44336', color: '#fff' }; // Pink
//             default:
//                 return { backgroundColor: '#B0BEC5', color: '#fff' }; // Default color
//         }
//     };

//     if (loading) {
//         return <p>Loading...</p>;
//     }

//     if (error) {
//         return <p>{error}</p>;
//     }

//     return (
//         <section className="container mx-auto p-6 font-mono">
//             <div className="w-full mb-8 overflow-hidden rounded-lg shadow-lg">
//                 <div className="w-full overflow-x-auto">
//                     <table className="w-full">
//                         <thead>
//                             <tr className="text-md font-semibold tracking-wide text-left text-gray-900 bg-gray-100 uppercase border-b border-gray-600">
//                                 <th className="px-4 py-3">No</th>
//                                 <th className="px-4 py-3">Nama</th>
//                                 <th className="px-4 py-3">Sektor</th>
//                                 <th className="px-4 py-3">Status</th>
//                                 <th className="px-4 py-3">Action</th>
//                             </tr>
//                         </thead>
//                         <tbody className="bg-white">
//                             {data.map((person, index) => (
//                                 <tr key={index} className="text-gray-700">
//                                     <td className="px-4 py-3 text-md font-semibold border">{index + 1}</td>
//                                     <td className="px-4 py-3 border">
//                                         <div className="flex items-center text-sm">
//                                             <div>
//                                                 <p className="font-semibold text-black">{person.nama}</p>
//                                                 <p className="text-xs text-gray-600">{person.perusahaan}</p>
//                                             </div>
//                                         </div>
//                                     </td>
//                                     <td className="px-4 py-3 text-md font-semibold border">{person.sektor?.title}</td>
//                                     <td className="px-4 py-3 text-xs border">
//                                         <span
//                                             className={`px-2 py-1 font-semibold leading-tight rounded-sm`}
//                                             style={getStatusStyle(person.status)}  // Apply dynamic styles
//                                         >
//                                             {person.status || 'Unknown'}
//                                         </span>
//                                     </td>
//                                     <td className="px-4 py-3 text-sm border"></td>
//                                 </tr>
//                             ))}
//                         </tbody>
//                     </table>
//                 </div>
//             </div>
//         </section>
//     );
// };

// export default DataTable;


// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { Link } from 'react-router-dom'; // Import Link for navigation

// const DataTable = () => {
//     const [data, setData] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);
//     const [statusFilter, setStatusFilter] = useState(''); // State for selected filter

//     useEffect(() => {
//         // Fetch data from the backend API
//         axios.get('http://localhost:3000/user/contact')
//             .then((response) => {
//                 setData(response.data.tasks);  // Set data from the backend response
//                 setLoading(false);  // Set loading state to false once data is fetched
//             })
//             .catch((err) => {
//                 console.error("Error fetching data:", err);
//                 setError("Failed to load data");  // Handle error
//                 setLoading(false);
//             });
//     }, []);

//     const getStatusStyle = (status) => {
//         switch (status) {
//             case 'PROSPECTING':
//                 return { backgroundColor: '#003366', color: '#fff' }; // Green
//             case 'CONTACTING':
//                 return { backgroundColor: '#E91E63', color: '#fff' }; // Red
//             case 'NEGOTIATION':
//                 return { backgroundColor: '#FF9800', color: '#fff' }; // Orange
//             // case 'NEGOTIATING':
//             //     return { backgroundColor: '#FF9800', color: '#fff' }; // Blue
//             case 'DEALING':
//                 return { backgroundColor: '#4CAF50', color: '#fff' }; // Grey
//             case 'JUNK':
//                 return { backgroundColor: '#F44336', color: '#fff' }; // Pink
//             default:
//                 return { backgroundColor: '#B0BEC5', color: '#fff' }; // Default color
//         }
//     };

//     // Filter data based on selected status
//     const filteredData = statusFilter
//         ? data.filter((person) => person.status === statusFilter)
//         : data;

//     if (loading) {
//         return <p>Loading...</p>;
//     }

//     if (error) {
//         return <p>{error}</p>;
//     }

//     return (
//         <section className="container mx-auto p-6 font-mono">
//             <div className="mb-4">
//                 {/* Status Filter Dropdown */}
//                 <select
//                     className="p-2 border rounded"
//                     value={statusFilter}
//                     onChange={(e) => setStatusFilter(e.target.value)}
//                 >
//                     <option value="">All Statuses</option>
//                     <option value="PROSPECTING">Prospecting</option>
//                     <option value="CONTACTING">Contacting</option>
//                     {/* <option value="DISCUSSION">Discussion</option> */}
//                     <option value="NEGOTIATION">Negotiation</option>
//                     <option value="DEALING">Dealing</option>
//                     <option value="JUNK">Junk</option>
//                 </select>
//             </div>
//             <div className="w-full mb-8 overflow-hidden rounded-lg shadow-lg">
//                 <div className="w-full overflow-x-auto">
//                     <table className="w-full">
//                         <thead>
//                             <tr className="text-md font-semibold tracking-wide text-left text-gray-900 bg-gray-100 uppercase border-b border-gray-600">
//                                 <th className="px-4 py-3">No</th>
//                                 <th className="px-4 py-3">Nama</th>
//                                 <th className="px-4 py-3">Sektor</th>
//                                 <th className="px-4 py-3">Status</th>
//                                 <th className="px-4 py-3">Action</th>
//                             </tr>
//                         </thead>
//                         <tbody className="bg-white">
//                             {filteredData.map((person, index) => (
//                                 <tr key={index} className="text-gray-700">
//                                     <td className="px-4 py-3 text-md font-semibold border">{index + 1}</td>
//                                     <td className="px-4 py-3 border">
//                                         <div className="flex items-center text-sm">
//                                             <div>
//                                                 <p className="font-semibold text-black">{person.nama}</p>
//                                                 <p className="text-xs text-gray-600">{person.perusahaan}</p>
//                                             </div>
//                                         </div>
//                                     </td>
//                                     <td className="px-4 py-3 text-md font-semibold border">{person.sektor?.title}</td>
//                                     <td className="px-4 py-3 text-xs border">
//                                         <span
//                                             className={`px-2 py-1 font-semibold leading-tight rounded-sm`}
//                                             style={getStatusStyle(person.status)}  // Apply dynamic styles
//                                         >
//                                             {person.status || 'Unknown'}
//                                         </span>
//                                     </td>
//                                     <td className="px-4 py-3 text-sm border">
//                                         {/* Action: Eye icon for "Manage Leads" */}
//                                         <Link
//                                             to={`/manage-leads/${person.id_contact}`}
//                                             className="text-blue-500 hover:text-blue-700"
//                                         >
//                                             <i className="fas fa-eye"></i>
//                                         </Link>
//                                     </td>
//                                 </tr>
//                             ))}
//                         </tbody>
//                     </table>
//                 </div>
//             </div>
//         </section>
//     );
// };

// export default DataTable;


// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { Link } from 'react-router-dom';

// const DataTable = () => {
//     const [data, setData] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);
//     const [statusFilter, setStatusFilter] = useState('');
//     const [currentPage, setCurrentPage] = useState(1); // Current page state
//     const [itemsPerPage, setItemsPerPage] = useState(5); // Items per page state

//     useEffect(() => {
//         axios.get('http://localhost:3000/user/contact')
//             .then((response) => {
//                 setData(response.data.tasks);
//                 setLoading(false);
//             })
//             .catch((err) => {
//                 console.error("Error fetching data:", err);
//                 setError("Failed to load data");
//                 setLoading(false);
//             });
//     }, []);

//     const getStatusStyle = (status) => {
//         switch (status) {
//             case 'PROSPECTING':
//                 return { backgroundColor: '#003366', color: '#fff' };
//             case 'CONTACTING':
//                 return { backgroundColor: '#E91E63', color: '#fff' };
//             case 'NEGOTIATION':
//                 return { backgroundColor: '#FF9800', color: '#fff' };
//             case 'DEALING':
//                 return { backgroundColor: '#4CAF50', color: '#fff' };
//             case 'JUNK':
//                 return { backgroundColor: '#F44336', color: '#fff' };
//             default:
//                 return { backgroundColor: '#B0BEC5', color: '#fff' };
//         }
//     };

//     // Filter data based on selected status
//     const filteredData = statusFilter
//         ? data.filter((person) => person.status === statusFilter)
//         : data;

//     // Paginate filtered data
//     const indexOfLastItem = currentPage * itemsPerPage;
//     const indexOfFirstItem = indexOfLastItem - itemsPerPage;
//     const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

//     // Handle page change
//     const paginate = (pageNumber) => setCurrentPage(pageNumber);

//     // Handle items per page change
//     const handleItemsPerPageChange = (e) => {
//         setItemsPerPage(parseInt(e.target.value));
//         setCurrentPage(1); // Reset to first page when items per page change
//     };

//     const totalPages = Math.ceil(filteredData.length / itemsPerPage);

//     if (loading) {
//         return <p>Loading...</p>;
//     }

//     if (error) {
//         return <p>{error}</p>;
//     }

//     return (
//         <section className="container mx-auto p-6 font-mono">
//             <div className="mb-4">
//                 <select
//                     className="p-2 border rounded"
//                     value={statusFilter}
//                     onChange={(e) => setStatusFilter(e.target.value)}
//                 >
//                     <option value="">All Statuses</option>
//                     <option value="PROSPECTING">Prospecting</option>
//                     <option value="CONTACTING">Contacting</option>
//                     <option value="NEGOTIATION">Negotiation</option>
//                     <option value="DEALING">Dealing</option>
//                     <option value="JUNK">Junk</option>
//                 </select>
//                 {/* Items per page select */}
//                 <select
//                     className="p-2 border rounded ml-4"
//                     value={itemsPerPage}
//                     onChange={handleItemsPerPageChange}
//                 >
//                     <option value="3">3 items per page</option>
//                     <option value="5">5 items per page</option>
//                     <option value="10">10 items per page</option>
//                     <option value="20">20 items per page</option>
//                 </select>
//             </div>
//             <div className="w-full mb-8 overflow-hidden rounded-lg shadow-lg">
//                 <div className="w-full overflow-x-auto">
//                     <table className="w-full">
//                         <thead>
//                             <tr className="text-md font-semibold tracking-wide text-left text-gray-900 bg-gray-100 uppercase border-b border-gray-600">
//                                 <th className="px-4 py-3">No</th>
//                                 <th className="px-4 py-3">Nama</th>
//                                 <th className="px-4 py-3">Sektor</th>
//                                 <th className="px-4 py-3">Status</th>
//                                 <th className="px-4 py-3">Action</th>
//                             </tr>
//                         </thead>
//                         <tbody className="bg-white">
//                             {currentItems.map((person, index) => (
//                                 <tr key={index} className="text-gray-700">
//                                     <td className="px-4 py-3 text-md font-semibold border">{index + 1}</td>
//                                     <td className="px-4 py-3 border">
//                                         <div className="flex items-center text-sm">
//                                             <div>
//                                                 <p className="font-semibold text-black">{person.nama}</p>
//                                                 <p className="text-xs text-gray-600">{person.perusahaan}</p>
//                                             </div>
//                                         </div>
//                                     </td>
//                                     <td className="px-4 py-3 text-md font-semibold border">{person.sektor?.title}</td>
//                                     <td className="px-4 py-3 text-xs border">
//                                         <span
//                                             className={`px-2 py-1 font-semibold leading-tight rounded-sm`}
//                                             style={getStatusStyle(person.status)}
//                                         >
//                                             {person.status || 'Unknown'}
//                                         </span>
//                                     </td>
//                                     <td className="px-4 py-3 text-sm border">
//                                         <Link
//                                             to={`/manage-leads/${person.id_contact}`}
//                                             className="text-blue-500 hover:text-blue-700"
//                                         >
//                                             <i className="fas fa-eye"></i>
//                                         </Link>
//                                     </td>
//                                 </tr>
//                             ))}
//                         </tbody>
//                     </table>
//                 </div>
//             </div>

//             {/* Pagination */}
//             <div className="flex justify-center">
//                 <button
//                     onClick={() => paginate(currentPage - 1)}
//                     disabled={currentPage === 1}
//                     className="px-4 py-2 bg-gray-300 rounded-l"
//                 >
//                     Prev
//                 </button>
//                 {Array.from({ length: totalPages }, (_, index) => (
//                     <button
//                         key={index}
//                         onClick={() => paginate(index + 1)}
//                         className={`px-4 py-2 ${currentPage === index + 1 ? 'bg-blue-500 text-white' : 'bg-gray-200'} rounded`}
//                     >
//                         {index + 1}
//                     </button>
//                 ))}
//                 <button
//                     onClick={() => paginate(currentPage + 1)}
//                     disabled={currentPage === totalPages}
//                     className="px-4 py-2 bg-gray-300 rounded-r"
//                 >
//                     Next
//                 </button>
//             </div>
//         </section>
//     );
// };

// export default DataTable;



import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const DataTable = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [statusFilter, setStatusFilter] = useState('');
    const [currentPage, setCurrentPage] = useState(1); // Current page state
    const [itemsPerPage, setItemsPerPage] = useState(5); // Items per page state

    const fetchContact = async () => {
        try {
            const response = await axios.get(`http://localhost:3000/user/contact`)
            if (response.status == 200) {
                setData(response.data.data);
                setLoading(false);
            }
            if (response.status != 200) {
                throw "Error at Backend!";
            }
        } catch (error) {
            console.log(`Error : ${error}`)
        }
    }

    useEffect(() => {
        axios.get('http://localhost:3000/user/contact')
            .then((response) => {
                setData(response.data.tasks);
                setLoading(false);
            })
            .catch((err) => {
                console.error("Error fetching data:", err);
                setError("Failed to load data");
                setLoading(false);
            });
    }, []);

    const getStatusStyle = (status) => {
        switch (status) {
            case 'PROSPECTING':
                return { backgroundColor: '#003366', color: '#fff' };
            case 'CONTACTING':
                return { backgroundColor: '#E91E63', color: '#fff' };
            case 'NEGOTIATION':
                return { backgroundColor: '#FF9800', color: '#fff' };
            case 'DEALING':
                return { backgroundColor: '#4CAF50', color: '#fff' };
            case 'JUNK':
                return { backgroundColor: '#F44336', color: '#fff' };
            default:
                return { backgroundColor: '#B0BEC5', color: '#fff' };
        }
    };

    // Calculate progress percentage and return appropriate color
    const calculateProgress = (person) => {
        let completedFields = 0;
        let totalFields = 0;

        // Define the fields to check for completeness
        const fields = [
            'nama', 'perusahaan', 'email', 'no_telp', 'alamat', 'produk', 'jumlah', 'harga'
        ];

        fields.forEach((field) => {
            if (person[field] !== null && person[field] !== '') {
                completedFields++;
            }
            totalFields++;
        });

        // Calculate the progress percentage
        const progress = (completedFields / totalFields) * 100;

        // Return the progress and color based on the percentage
        let color = '#4CAF50'; // Default green
        if (progress <= 30) {
            color = '#F44336'; // Red for low progress
        } else if (progress <= 70) {
            color = '#FF9800'; // Yellow for medium progress
        }

        return { progress, color };
    };

    // Filter data based on selected status
    const filteredData = statusFilter
        ? data.filter((person) => person.status === statusFilter)
        : data;

    // Paginate filtered data
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

    // Handle page change
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    // Handle items per page change
    const handleItemsPerPageChange = (e) => {
        setItemsPerPage(parseInt(e.target.value));
        setCurrentPage(1); // Reset to first page when items per page change
    };

    const totalPages = Math.ceil(filteredData.length / itemsPerPage);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <section className="container mx-auto p-6 font-mono">
            <div className="mb-4">
                <select
                    className="p-2 border rounded"
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                >
                    <option value="">All Statuses</option>
                    <option value="PROSPECTING">Prospecting</option>
                    <option value="CONTACTING">Contacting</option>
                    <option value="NEGOTIATION">Negotiation</option>
                    <option value="DEALING">Dealing</option>
                    <option value="JUNK">Junk</option>
                </select>
                {/* Items per page select */}
                <select
                    className="p-2 border rounded ml-4"
                    value={itemsPerPage}
                    onChange={handleItemsPerPageChange}
                >
                    <option value="3">3 items per page</option>
                    <option value="5">5 items per page</option>
                    <option value="10">10 items per page</option>
                    <option value="20">20 items per page</option>
                </select>
            </div>
            <div className="w-full mb-8 overflow-hidden rounded-lg shadow-lg">
                <div className="w-full overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="text-md font-semibold tracking-wide text-left text-gray-900 bg-gray-100 uppercase border-b border-gray-600">
                                <th className="px-4 py-3">No</th>
                                <th className="px-4 py-3">Nama</th>
                                <th className="px-4 py-3">Sektor</th>
                                <th className="px-4 py-3">Status</th>
                                <th className="px-4 py-3">Kelengkapan</th> {/* New column for progress */}
                                <th className="px-4 py-3">Action</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white">
                            {currentItems.map((person, index) => {
                                const { progress, color } = calculateProgress(person);
                                return (
                                    <tr key={index} className="text-gray-700">
                                        <td className="px-4 py-3 text-md font-semibold border">{index + 1}</td>
                                        <td className="px-4 py-3 border">
                                            <div className="flex items-center text-sm">
                                                <div>
                                                    <p className="font-semibold text-black">{person.nama}</p>
                                                    <p className="text-xs text-gray-600">{person.perusahaan}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-4 py-3 text-md font-semibold border">{person.sektor?.title}</td>
                                        <td className="px-4 py-3 text-xs border">
                                            <span
                                                className={`px-2 py-1 font-semibold leading-tight rounded-sm`}
                                                style={getStatusStyle(person.status)}
                                            >
                                                {person.status || 'Unknown'}
                                            </span>
                                        </td>

                                        {/* Progress bar column */}
                                        <td className="px-4 py-3 border">
                                            <div className="w-full h-2 bg-gray-200 rounded">
                                                <div
                                                    className="h-full"
                                                    style={{
                                                        width: `${progress}%`,
                                                        backgroundColor: color, // Dynamic color based on progress
                                                    }}
                                                ></div>
                                            </div>
                                        </td>

                                        <td className="px-4 py-3 text-sm border">
                                            <Link
                                                to={`/manage-leads/${person.id_contact}`}
                                                className="text-blue-500 hover:text-blue-700"
                                            >
                                                <i className="fas fa-eye"></i>
                                            </Link>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Pagination */}
            <div className="flex justify-center">
                <button
                    onClick={() => paginate(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="px-4 py-2 bg-gray-300 rounded-l"
                >
                    Prev
                </button>
                {Array.from({ length: totalPages }, (_, index) => (
                    <button
                        key={index}
                        onClick={() => paginate(index + 1)}
                        className={`px-4 py-2 ${currentPage === index + 1 ? 'bg-blue-500 text-white' : 'bg-gray-200'} rounded`}
                    >
                        {index + 1}
                    </button>
                ))}
                <button
                    onClick={() => paginate(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="px-4 py-2 bg-gray-300 rounded-r"
                >
                    Next
                </button>
            </div>
        </section>
    );
};

export default DataTable;
