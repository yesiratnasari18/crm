// import { useEffect, useState } from "react";
// import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
// import AddModal from "../../components/Modals/AddModal";
// import Task from "../../components/Task";
// import { onDragEnd } from "../../helpers/onDragEnd"; // Helper for drag-and-drop

// const Home = () => {
//   const [columns, setColumns] = useState({}); // Stores column data
//   const [modalOpen, setModalOpen] = useState(false);

//   // Fetch columns and tasks from backend
//   useEffect(() => {
//     fetch("http://localhost:3000/user/columns")
//       .then((response) => response.json())
//       .then((columnsData) => {
//         const updatedColumns = {};

//         // Fetch tasks for each column
//         Promise.all(
//           columnsData.map((column) =>
//             fetch(`http://localhost:3000/user/columns/${column.id}`)
//               .then((response) => response.json())
//               .then((tasks) => {
//                 updatedColumns[column.id] = {
//                   name: column.name,
//                   items: tasks, // Add tasks to the respective column
//                 };
//               })
//           )
//         )
//           .then(() => {
//             setColumns(updatedColumns); // Update state with fetched columns and tasks
//           })
//           .catch((error) => console.error("Error fetching columns and tasks:", error));
//       })
//       .catch((error) => console.error("Error fetching columns:", error));
//   }, []);

//   const openModal = () => setModalOpen(true);
//   const closeModal = () => setModalOpen(false);

//   return (
//     <DragDropContext onDragEnd={(result) => onDragEnd(result, columns, setColumns)}>
//       <div className="task-container">
//         {Object.entries(columns).map(([columnId, column]) => (
//           <div key={columnId} className="column">
//             <Droppable droppableId={columnId}>
//               {(provided) => (
//                 <div
//                   ref={provided.innerRef}
//                   {...provided.droppableProps}
//                   className="column-content"
//                 >
//                   <h3>{column.name}</h3>
//                   {column.items.map((task, index) => (
//                     <Draggable key={task.id.toString()} draggableId={task.id.toString()} index={index}>
//                       {(provided) => (
//                         <Task
//                           provided={provided}
//                           task={task}
//                           onUpdateTask={(updatedTask) => {
//                             // Handle task update
//                           }}
//                           onDeleteTask={(taskId) => {
//                             // Handle task deletion
//                           }}
//                         />
//                       )}
//                     </Draggable>
//                   ))}
//                   {provided.placeholder}
//                 </div>
//               )}
//             </Droppable>
//           </div>
//         ))}
//       </div>

//       <button onClick={openModal} className="add-task-button">Add Task</button>

//       <AddModal
//         isOpen={modalOpen}
//         onClose={closeModal}
//         handleAddTask={(newTask) => {
//           // Handle adding new task to backend
//           fetch("http://localhost:3000/user/tasks", {
//             method: "POST",
//             headers: { "Content-Type": "application/json" },
//             body: JSON.stringify(newTask),
//           })
//             .then((response) => response.json())
//             .then((data) => {
//               // Update columns with the new task
//               const updatedColumns = { ...columns };
//               updatedColumns[newTask.columnId].items.push(data);
//               setColumns(updatedColumns);
//             })
//             .catch((error) => console.error("Error adding task:", error));
//         }}
//       />
//     </DragDropContext>
//   );
// };

// export default Home;


// 2

// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// const Board = () => {
//     const [columns, setColumns] = useState([]);

//     useEffect(() => {
//         const fetchBoardData = async () => {
//             try {
//                 const response = await axios.get('http://localhost:3000/user/columns'); // Sesuaikan URL
//                 if (response.data && response.data.columns) {
//                     setColumns(response.data.columns);
//                 }
//             } catch (error) {
//                 console.error("Error fetching board data:", error);
//             }
//         };

//         fetchBoardData();
//     }, []);

//     return (
//         <div className="board">
//             {columns.map((column) => (
//                 <div key={column.id} className="column">
//                     <h3>{column.name}</h3>
//                     <ul>
//                         {column.tasks.map((task) => (
//                             <li key={task.id_contact}>
//                                 <strong>{task.nama}</strong> ({task.perusahaan})<br />
//                                 Email: {task.email}<br />
//                                 Phone: {task.no_telp}<br />
//                                 Sector: {task.sektor}<br />
//                                 Address: {task.alamat}<br />
//                                 Product: {task.produk}<br />
//                                 Quantity: {task.jumlah}<br />
//                                 Price: {task.harga}
//                             </li>
//                         ))}
//                     </ul>
//                 </div>
//             ))}
//         </div>
//     );
// };

// export default Board;





// import { useState, useEffect } from "react";
// import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
// import axios from "axios";
// import AddModal from "../../components/Modals/AddModal";
// import Task from "../../components/Task";
// import { onDragEnd } from "../../helpers/onDragEnd";

// const Home = () => {
//   const [columns, setColumns] = useState({});
//   const [isModalOpen, setIsModalOpen] = useState(false);

//   // Fetch columns data from backend
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axios.get("http://localhost:3000/user/columns");
//         if (response.data && response.data.columns) {
//           const formattedColumns = response.data.columns.reduce((acc, column) => {
//             acc[column.id] = {
//               name: column.name,
//               items: column.tasks,
//             };
//             return acc;
//           }, {});
//           setColumns(formattedColumns);
//         }
//       } catch (error) {
//         console.error("Error fetching columns:", error);
//       }
//     };
//     fetchData();
//   }, []);

//   const handleAddTask = (newTask) => {
//     const updatedColumns = { ...columns };
//     updatedColumns[1].items.push(newTask); // Add new task to "PROSPECTING" (id: 1)
//     setColumns(updatedColumns);
//     setIsModalOpen(false);
//   };

//   const handleUpdateTask = (updatedTask) => {
//     const updatedColumns = { ...columns };
//     for (const columnId in updatedColumns) {
//       const column = updatedColumns[columnId];
//       const taskIndex = column.items.findIndex(
//         (task) => task.id_contact === updatedTask.id_contact
//       );
//       if (taskIndex !== -1) {
//         column.items[taskIndex] = updatedTask;
//         break;
//       }
//     }
//     setColumns(updatedColumns);
//   };

//   return (
//     <div className="home-container">
//       <DragDropContext
//         onDragEnd={(result) => onDragEnd(result, columns, setColumns)}
//       >
//         <div className="board">
//           {Object.entries(columns).map(([columnId, column]) => (
//             <div className="column" key={columnId}>
//               <Droppable droppableId={columnId}>
//                 {(provided) => (
//                   <div
//                     ref={provided.innerRef}
//                     {...provided.droppableProps}
//                     className="column-content"
//                   >
//                     <h3 className="column-title">{column.name}</h3>
//                     {column.items.map((task, index) => (
//                       <Draggable
//                         key={task.id_contact}
//                         draggableId={task.id_contact.toString()}
//                         index={index}
//                       >
//                         {(provided) => (
//                           <Task
//                             provided={provided}
//                             task={task}
//                             onUpdateTask={handleUpdateTask}
//                           />
//                         )}
//                       </Draggable>
//                     ))}
//                     {provided.placeholder}
//                   </div>
//                 )}
//               </Droppable>
//             </div>
//           ))}
//         </div>
//       </DragDropContext>

//       <button
//         className="add-task-button"
//         onClick={() => setIsModalOpen(true)}
//       >
//         + Add Task
//       </button>

//       <AddModal
//         isOpen={isModalOpen}
//         onClose={() => setIsModalOpen(false)}
//         handleAddTask={handleAddTask}
//       />
//     </div>
//   );
// };

// export default Home;

// 3

// import { useState, useEffect } from "react";
// import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
// import axios from "axios";
// import AddModal from "../../components/Modals/AddModal";
// import Task from "../../components/Task";
// import { onDragEnd } from "../../helpers/onDragEnd";
// import { FiPlus } from "react-icons/fi"; // Importing icon from react-icons

// const Home = () => {
//   const [columns, setColumns] = useState<any>({});
//   const [isModalOpen, setIsModalOpen] = useState(false);

//   // Fetch columns data from backend
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axios.get("http://localhost:3000/user/columns");
//         if (response.data && response.data.columns) {
//           const formattedColumns = response.data.columns.reduce((acc: any, column: any) => {
//             acc[column.id] = {
//               name: column.name,
//               items: column.tasks,
//             };
//             return acc;
//           }, {});
//           setColumns(formattedColumns);
//         }
//       } catch (error) {
//         console.error("Error fetching columns:", error);
//       }
//     };
//     fetchData();
//   }, []);

//   const handleAddTask = (newTask: any) => {
//     const updatedColumns = { ...columns };
//     updatedColumns[1].items.push(newTask); // Add new task to "PROSPECTING" (id: 1)
//     setColumns(updatedColumns);
//     setIsModalOpen(false);
//   };

//   const handleUpdateTask = (updatedTask: any) => {
//     const updatedColumns = { ...columns };
//     for (const columnId in updatedColumns) {
//       const column = updatedColumns[columnId];
//       const taskIndex = column.items.findIndex(
//         (task: any) => task.id_contact === updatedTask.id_contact
//       );
//       if (taskIndex !== -1) {
//         column.items[taskIndex] = updatedTask;
//         break;
//       }
//     }
//     setColumns(updatedColumns);
//   };

//   // Modal open/close handlers
//   const openModal = () => setIsModalOpen(true);
//   const closeModal = () => setIsModalOpen(false);

//   return (
//     <>
//       <DragDropContext
//         onDragEnd={(result: any) => onDragEnd(result, columns, setColumns)}
//       >
//         <div className="w-full flex items-start justify-between px-5 pb-8 md:gap-3 gap-10">
//           {Object.entries(columns).map(([columnId, column]: [string, any]) => (
//             <div className="w-full flex flex-col gap-0" key={columnId}>
//               <Droppable droppableId={columnId} key={columnId}>
//                 {(provided: any) => (
//                   <div
//                     ref={provided.innerRef}
//                     {...provided.droppableProps}
//                     className="flex flex-col md:w-[290px] w-[250px] gap-3 items-center py-5"
//                   >
//                     <div className="flex items-center justify-center py-[10px] w-full bg-white rounded-lg shadow-sm text-[#555] font-medium text-[15px]">
//                       {column.name}
//                     </div>
//                     {column.items.map((task: any, index: number) => (
//                       <Draggable
//                         key={task.id_contact.toString()}
//                         draggableId={task.id_contact.toString()}
//                         index={index}
//                       >
//                         {(provided: any) => (
//                           <Task
//                             provided={provided}
//                             task={task}
//                             onUpdateTask={handleUpdateTask}
//                           />
//                         )}
//                       </Draggable>
//                     ))}
//                     {provided.placeholder}
//                   </div>
//                 )}
//               </Droppable>
//             </div>
//           ))}
//         </div>
//       </DragDropContext>

//       <div
//         onClick={openModal}
//         className="fixed bottom-5 right-5 flex items-center justify-center gap-1 py-[10px] px-[15px] bg-blue-500 text-white rounded-full shadow-lg cursor-pointer"
//       >
//         <FiPlus color={"#fff"} /> {/* Using the FiPlus icon from react-icons */}
//         Add Task
//       </div>

//       <AddModal
//         isOpen={isModalOpen}
//         onClose={closeModal}
//         setOpen={setIsModalOpen}  // Correct prop passed here
//         handleAddTask={handleAddTask}
//       />
//     </>
//   );
// };

// export default Home;


// import React, { useState, useEffect } from "react";
// import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
// import axios from "axios";
// import AddModal from "../../components/Modals/AddModal";
// import Task from "../../components/Task";
// import { onDragEnd } from "../../helpers/onDragEnd";
// import { FiPlus } from "react-icons/fi"; // Importing icon from react-icons

// const Home = () => {
//   const [columns, setColumns] = useState<any>({});
//   const [isModalOpen, setIsModalOpen] = useState(false);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axios.get("http://localhost:3000/user/columns");
//         if (response.data && response.data.columns) {
//           const formattedColumns = response.data.columns.reduce((acc: any, column: any) => {
//             acc[column.id] = {
//               name: column.name,
//               items: column.tasks,
//             };
//             return acc;
//           }, {});
//           setColumns(formattedColumns);
//         }
//       } catch (error) {
//         console.error("Error fetching columns:", error);
//       }
//     };
//     fetchData();
//   }, []);

//   const handleAddTask = async (newTask: any) => {
//     try {
//         const response = await axios.post('http://localhost:3000/user/task', newTask);
//         if (response.data.status === 'ok') {
//             const updatedColumns = { ...columns };
//             updatedColumns[newTask.columnId].items.push({
//                 id_contact: response.data.contactId,
//                 nama: response.data.nama,
//                 perusahaan: response.data.perusahaan,
//                 email: response.data.email,
//                 no_telp: response.data.no_telp,
//                 alamat: response.data.alamat,
//                 sektor: {
//                   title: sektorData.nama_sektor,
//                   bg: sektorData.bg_color,
//                   text: sektorData.text_color,
//                 },
//                 produk: response.data.produk,
//                 jumlah: response.data.jumlah,
//                 harga: response.data.harga,
//             });
//             setColumns(updatedColumns);
//             setIsModalOpen(false);
//         }
//     } catch (error) {
//         console.error('Error adding task:', error);
//     }
//   };

//   const openModal = () => setIsModalOpen(true);
//   const closeModal = () => setIsModalOpen(false);

//   return (
//     <>
//       <DragDropContext
//         onDragEnd={(result: any) => onDragEnd(result, columns, setColumns)}
//       >
//         <div className="w-full flex items-start justify-between px-5 pb-8 md:gap-3 gap-10">
//           {Object.entries(columns).map(([columnId, column]: [string, any]) => (
//             <div className="w-full flex flex-col gap-0" key={columnId}>
//               <Droppable droppableId={columnId} key={columnId}>
//                 {(provided: any) => (
//                   <div
//                     ref={provided.innerRef}
//                     {...provided.droppableProps}
//                     className="flex flex-col md:w-[290px] w-[250px] gap-3 items-center py-5"
//                   >
//                     <div className="flex items-center justify-center py-[10px] w-full bg-white rounded-lg shadow-sm text-[#555] font-medium text-[15px]">
//                       {column.name}
//                     </div>
//                     {column.items.map((task: any, index: number) => (
//                       <Draggable
//                         key={task.id_contact.toString()}
//                         draggableId={task.id_contact.toString()}
//                         index={index}
//                       >
//                         {(provided: any) => (
//                           <Task
//                             provided={provided}
//                             task={task}
//                           />
//                         )}
//                       </Draggable>
//                     ))}
//                     {provided.placeholder}
//                   </div>
//                 )}
//               </Droppable>
//             </div>
//           ))}
//         </div>
//       </DragDropContext>

//       <div
//         onClick={openModal}
//         className="fixed bottom-5 right-5 flex items-center justify-center gap-1 py-[10px] px-[15px] bg-blue-500 text-white rounded-full shadow-lg cursor-pointer"
//       >
//         <FiPlus color={"#fff"} /> {/* Using the FiPlus icon from react-icons */}
//         Add Task
//       </div>

//       <AddModal
//         isOpen={isModalOpen}
//         onClose={closeModal}
//         setOpen={setIsModalOpen} 
//         handleAddTask={handleAddTask}
//       />
//     </>
//   );
// };

// export default Home;


// import React, { useState, useEffect } from "react";
// import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
// import axios from "axios";
// import AddModal from "../../components/Modals/AddModal";
// import Task from "../../components/Task";
// import { onDragEnd } from "../../helpers/onDragEnd";
// import { FiPlus } from "react-icons/fi"; // Importing icon from react-icons

// const Home = () => {
//   const [columns, setColumns] = useState<any>({});
//   const [isModalOpen, setIsModalOpen] = useState(false);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axios.get("http://localhost:3000/user/columns");
//         if (response.data && response.data.columns) {
//           const formattedColumns = response.data.columns.reduce((acc: any, column: any) => {
//             acc[column.id] = {
//               name: column.name,
//               items: column.tasks,
//             };
//             return acc;
//           }, {});
//           setColumns(formattedColumns);
//         }
//       } catch (error) {
//         console.error("Error fetching columns:", error);
//       }
//     };
//     fetchData();
//   }, []);

//   const handleAddTask = async (newTask: any) => {
//     try {
//       const response = await axios.post('http://localhost:3000/user/task', newTask);
//       if (response.data.status === 'ok') {
//         const updatedColumns = { ...columns };
//         updatedColumns[newTask.columnId].items.push({
//           id_contact: response.data.contactId,
//           nama: response.data.nama,
//           perusahaan: response.data.perusahaan,
//           email: response.data.email,
//           no_telp: response.data.no_telp,
//           alamat: response.data.alamat,
//           sektor: {
//             title: response.data.sektor.nama_sektor,
//             bg: response.data.sektor.bg_color,
//             text: response.data.sektor.text_color,
//           },
//           produk: response.data.produk,
//           jumlah: response.data.jumlah,
//           harga: response.data.harga,
//           catatan: response.data.catatan,
//         });
//         setColumns(updatedColumns);
//         setIsModalOpen(false);
//       }
//     } catch (error) {
//       console.error('Error adding task:', error);
//     }
//   };

//   const openModal = () => setIsModalOpen(true);
//   const closeModal = () => setIsModalOpen(false);

//   const handleUpdateTask = (updatedTask: any, columnId: string) => {
//     const updatedColumns = { ...columns };
//     const column = updatedColumns[columnId];
//     const taskIndex = column.items.findIndex((task: any) => task.id_contact === updatedTask.id_contact);
//     if (taskIndex !== -1) {
//       column.items[taskIndex] = updatedTask; // Update the task in the column
//       setColumns(updatedColumns); // Update the columns state
//     }
//   };

//   const handleDeleteTask = (taskId: string) => {
//     const updatedColumns = { ...columns };
//     Object.entries(updatedColumns).forEach(([colId, col]) => {
//       updatedColumns[colId].items = col.items.filter((task: any) => task.id_contact !== taskId);
//     });
//     setColumns(updatedColumns); // Update the columns state after deleting the task
//   };

//   return (
//     <>
//       <DragDropContext
//         onDragEnd={(result: any) => onDragEnd(result, columns, setColumns)}
//       >
//         <div className="w-full flex items-start justify-between px-5 pb-8 md:gap-3 gap-10">
//           {Object.entries(columns).map(([columnId, column]: [string, any]) => (
//             <div className="w-full flex flex-col gap-0" key={columnId}>
//               <Droppable droppableId={columnId} key={columnId}>
//                 {(provided: any) => (
//                   <div
//                     ref={provided.innerRef}
//                     {...provided.droppableProps}
//                     className="flex flex-col md:w-[290px] w-[250px] gap-3 items-center py-5"
//                   >
//                     <div className="flex items-center justify-center py-[10px] w-full bg-white rounded-lg shadow-sm text-[#555] font-medium text-[15px]">
//                       {column.name}
//                     </div>
//                     {column.items.map((task: any, index: number) => (
//                       <Draggable
//                         key={task.id_contact.toString()}
//                         draggableId={task.id_contact.toString()}
//                         index={index}
//                       >
//                         {(provided: any) => (
//                           <Task
//                             provided={provided}
//                             task={task}
//                             onUpdateTask={(updatedTask: any) => handleUpdateTask(updatedTask, columnId)}
//                             onDeleteTask={handleDeleteTask}
//                           />
//                         )}
//                       </Draggable>
//                     ))}
//                     {provided.placeholder}
//                   </div>
//                 )}
//               </Droppable>
//             </div>
//           ))}
//         </div>
//       </DragDropContext>

//       <div
//         onClick={openModal}
//         className="fixed bottom-5 right-5 flex items-center justify-center gap-1 py-[10px] px-[15px] bg-blue-500 text-white rounded-full shadow-lg cursor-pointer"
//       >
//         <FiPlus color={"#fff"} /> {/* Using the FiPlus icon from react-icons */}
//         Add Task
//       </div>

//       <AddModal
//         isOpen={isModalOpen}
//         onClose={closeModal}
//         setOpen={setIsModalOpen}
//         handleAddTask={handleAddTask}
//       />
//     </>
//   );
// };

// export default Home;

// import React, { useState, useEffect } from "react";
// import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
// import axios from "axios";
// import AddModal from "../../components/Modals/AddModal";
// import Task from "../../components/Task";
// import { onDragEnd } from "../../helpers/onDragEnd";
// import { FiPlus } from "react-icons/fi"; // Importing icon from react-icons

// const Home = () => {
//   const [columns, setColumns] = useState<any>({});
//   const [isModalOpen, setIsModalOpen] = useState(false);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axios.get("http://localhost:3000/user/columns");
//         if (response.data && response.data.columns) {
//           const formattedColumns = response.data.columns.reduce((acc: any, column: any) => {
//             acc[column.id] = {
//               name: column.name,
//               items: column.tasks,
//             };
//             return acc;
//           }, {});
//           setColumns(formattedColumns);
//         }
//       } catch (error) {
//         console.error("Error fetching columns:", error);
//       }
//     };
//     fetchData();
//   }, []);

//   const handleAddTask = async (newTask: any) => {
//     try {
//       const response = await axios.post('http://localhost:3000/user/task', newTask);
//       if (response.data.status === 'ok') {
//         const updatedColumns = { ...columns };
//         updatedColumns[newTask.columnId].items.push({
//           id_contact: response.data.contactId,
//           nama: response.data.nama,
//           perusahaan: response.data.perusahaan,
//           email: response.data.email,
//           no_telp: response.data.no_telp,
//           alamat: response.data.alamat,
//           sektor: {
//             title: response.data.sektor.nama_sektor,
//             bg: response.data.sektor.bg_color,
//             text: response.data.sektor.text_color,
//           },
//           produk: response.data.produk,
//           jumlah: response.data.jumlah,
//           harga: response.data.harga,
//           catatan: response.data.catatan,
//         });
//         setColumns(updatedColumns);
//         setIsModalOpen(false);
//       }
//     } catch (error) {
//       console.error('Error adding task:', error);
//     }
//   };

//   const openModal = () => setIsModalOpen(true);
//   const closeModal = () => setIsModalOpen(false);

//   const handleUpdateTask = (updatedTask: any, columnId: string) => {
//     const updatedColumns = { ...columns };
//     const column = updatedColumns[columnId];
//     const taskIndex = column.items.findIndex((task: any) => task.id_contact === updatedTask.id_contact);
//     if (taskIndex !== -1) {
//       column.items[taskIndex] = updatedTask; // Update the task in the column
//       setColumns(updatedColumns); // Update the columns state
//     }
//   };

//   const handleDeleteTask = (taskId: string) => {
//     const updatedColumns = { ...columns };
//     Object.entries(updatedColumns).forEach(([colId, col]) => {
//       updatedColumns[colId].items = col.items.filter((task: any) => task.id_contact !== taskId);
//     });
//     setColumns(updatedColumns); // Update the columns state after deleting the task
//   };

//   return (
//     <>
//       <DragDropContext
//         onDragEnd={(result: any) => onDragEnd(result, columns, setColumns)}
//       >
//         <div className="w-full flex items-start justify-between px-5 pb-8 md:gap-3 gap-10">
//           {Object.entries(columns).map(([columnId, column]: [string, any]) => (
//             <div className="w-full flex flex-col gap-0" key={columnId}>
//               <Droppable droppableId={columnId} key={columnId}>
//                 {(provided: any) => (
//                   <div
//                     ref={provided.innerRef}
//                     {...provided.droppableProps}
//                     className="flex flex-col md:w-[290px] w-[250px] gap-3 items-center py-5"
//                   >
//                     <div className="flex items-center justify-center py-[10px] w-full bg-white rounded-lg shadow-sm text-[#555] font-medium text-[15px]">
//                       {column.name}
//                     </div>
//                     {column.items.map((task: any, index: number) => (
//                       <Draggable
//                         key={task.id_contact.toString()}
//                         draggableId={task.id_contact.toString()}
//                         index={index}
//                       >
//                         {(provided: any) => (
//                           <Task
//                             provided={provided}
//                             task={task}
//                             onUpdateTask={(updatedTask: any) => handleUpdateTask(updatedTask, columnId)}
//                             onDeleteTask={handleDeleteTask}
//                           />
//                         )}
//                       </Draggable>
//                     ))}
//                     {provided.placeholder}
//                   </div>
//                 )}
//               </Droppable>
//             </div>
//           ))}
//         </div>
//       </DragDropContext>

//       <div
//         onClick={openModal}
//         className="fixed bottom-5 right-5 flex items-center justify-center gap-1 py-[10px] px-[15px] bg-blue-500 text-white rounded-full shadow-lg cursor-pointer"
//       >
//         <FiPlus color={"#fff"} /> {/* Using the FiPlus icon from react-icons */}
//         Add Task
//       </div>

//       <AddModal
//         isOpen={isModalOpen}
//         onClose={closeModal}
//         setOpen={setIsModalOpen}
//         handleAddTask={handleAddTask}
//       />
//     </>
//   );
// };

// export default Home;

// import React, { useState, useEffect } from "react";
// import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
// import axios from "axios";
// import AddModal from "../../components/Modals/AddModal";
// import Task from "../../components/Task";
// import { onDragEnd } from "../../helpers/onDragEnd";
// import { FiPlus } from "react-icons/fi";

// const Home = () => {
//   const [columns, setColumns] = useState<any>({});
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [sektorOptions, setSektorOptions] = useState<any[]>([]);

//   // Fetch Columns
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axios.get("http://localhost:3000/user/columns");
//         if (response.data && response.data.columns) {
//           const formattedColumns = response.data.columns.reduce((acc: any, column: any) => {
//             acc[column.id] = {
//               name: column.name,
//               items: column.tasks,
//             };
//             return acc;
//           }, {});
//           setColumns(formattedColumns);
//         }
//       } catch (error) {
//         console.error("Error fetching columns:", error);
//       }
//     };
//     fetchData();
//   }, []);

//   // Fetch Sektor
//   useEffect(() => {
//     const fetchSektor = async () => {
//       try {
//         const response = await axios.get("http://localhost:3000/user/sektor");
//         setSektorOptions(response.data.sektor || []);
//       } catch (error) {
//         console.error("Error fetching sektor:", error);
//       }
//     };
//     fetchSektor();
//   }, []);

//   const handleAddTask = async (newTask: any) => {
//     try {
//       const response = await axios.post("http://localhost:3000/user/task", newTask);
//       if (response.data.status === "ok") {
//         const updatedColumns = { ...columns };
//         updatedColumns[newTask.columnId].items.push({
//           id_contact: response.data.contactId,
//           nama: response.data.nama,
//           perusahaan: response.data.perusahaan,
//           email: response.data.email,
//           no_telp: response.data.no_telp,
//           alamat: response.data.alamat,
//           sektor: {
//             title: response.data.sektor.nama_sektor,
//             bg: response.data.sektor.bg_color,
//             text: response.data.sektor.text_color,
//           },
//           produk: response.data.produk,
//           jumlah: response.data.jumlah,
//           harga: response.data.harga,
//           catatan: response.data.catatan,
//         });
//         setColumns(updatedColumns);
//         setIsModalOpen(false);
//       }
//     } catch (error) {
//       console.error("Error adding task:", error);
//     }
//   };

//   const openModal = () => setIsModalOpen(true);
//   const closeModal = () => setIsModalOpen(false);

//   const handleUpdateTask = (updatedTask: any, columnId: string) => {
//     const updatedColumns = { ...columns };
//     const column = updatedColumns[columnId];
//     const taskIndex = column.items.findIndex((task: any) => task.id_contact === updatedTask.id_contact);
//     if (taskIndex !== -1) {
//       column.items[taskIndex] = updatedTask; // Update the task in the column
//       setColumns(updatedColumns); // Update the columns state
//     }
//   };

//   const handleDeleteTask = (taskId: string) => {
//     const updatedColumns = { ...columns };
//     Object.entries(updatedColumns).forEach(([colId, col]) => {
//       updatedColumns[colId].items = col.items.filter((task: any) => task.id_contact !== taskId);
//     });
//     setColumns(updatedColumns); // Update the columns state after deleting the task
//   };

//   return (
//     <>
//       <DragDropContext
//         onDragEnd={(result: any) => onDragEnd(result, columns, setColumns)}
//       >
//         <div className="w-full flex items-start justify-between px-5 pb-8 md:gap-3 gap-10">
//           {Object.entries(columns).map(([columnId, column]: [string, any]) => (
//             <div className="w-full flex flex-col gap-0" key={columnId}>
//               <Droppable droppableId={columnId} key={columnId}>
//                 {(provided: any) => (
//                   <div
//                     ref={provided.innerRef}
//                     {...provided.droppableProps}
//                     className="flex flex-col md:w-[290px] w-[250px] gap-3 items-center py-5"
//                   >
//                     <div className="flex items-center justify-center py-[10px] w-full bg-white rounded-lg shadow-sm text-[#555] font-medium text-[15px]">
//                       {column.name}
//                     </div>
//                     {column.items.map((task: any, index: number) => (
//                       <Draggable
//                         key={task.id_contact.toString()}
//                         draggableId={task.id_contact.toString()}
//                         index={index}
//                       >
//                         {(provided: any) => (
//                           <Task
//                             provided={provided}
//                             task={task}
//                             onUpdateTask={(updatedTask: any) => handleUpdateTask(updatedTask, columnId)}
//                             onDeleteTask={handleDeleteTask}
//                           />
//                         )}
//                       </Draggable>
//                     ))}
//                     {provided.placeholder}
//                   </div>
//                 )}
//               </Droppable>
//             </div>
//           ))}
//         </div>
//       </DragDropContext>

//       <div
//         onClick={openModal}
//         className="fixed bottom-5 right-5 flex items-center justify-center gap-1 py-[10px] px-[15px] bg-blue-500 text-white rounded-full shadow-lg cursor-pointer"
//       >
//         <FiPlus color={"#fff"} /> Add Task
//       </div>

//       <AddModal
//         isOpen={isModalOpen}
//         onClose={closeModal}
//         setOpen={setIsModalOpen}
//         handleAddTask={handleAddTask}
//         sektorOptions={sektorOptions} // Pass sektor options to the modal
//       />
//     </>
//   );
// };

// export default Home;

// import React, { useState, useEffect } from "react";
// import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
// import axios from "axios";
// import AddModal from "../../components/Modals/AddModal";
// import Task from "../../components/Task";
// import { onDragEnd } from "../../helpers/onDragEnd";
// import { FiPlus } from "react-icons/fi";

// const Home = () => {
//   const [columns, setColumns] = useState<any>({});
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [sektorOptions, setSektorOptions] = useState<any[]>([]);

//   // Fetch Columns
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axios.get("http://localhost:3000/user/columns");
//         if (response.data && response.data.columns) {
//           const formattedColumns = response.data.columns.reduce((acc: any, column: any) => {
//             acc[column.id] = {
//               name: column.name,
//               items: column.tasks,
//             };
//             return acc;
//           }, {});
//           setColumns(formattedColumns);
//         }
//       } catch (error) {
//         console.error("Error fetching columns:", error);
//       }
//     };
//     fetchData();
//   }, []);

//   // Fetch Sektor
//   useEffect(() => {
//     const fetchSektor = async () => {
//       try {
//         const response = await axios.get("http://localhost:3000/user/sektor");
//         setSektorOptions(response.data.sektor || []);
//       } catch (error) {
//         console.error("Error fetching sektor:", error);
//       }
//     };
//     fetchSektor();
//   }, []);

//   const handleAddTask = async (newTask: any) => {
//     try {
//       const response = await axios.post("http://localhost:3000/user/task", newTask);
//       if (response.data.status === "ok") {
//         const updatedColumns = { ...columns };

//         const columnId = newTask.columnId;
//         // Check if the columnId exists, if not, initialize it
//         if (!updatedColumns[columnId]) {
//           updatedColumns[columnId] = {
//             name: `Column ${columnId}`, // Default name for the new column
//             items: [], // Initialize with an empty items array
//           };
//         }

//         // Add the new task to the column
//         updatedColumns[columnId].items.push({
//           id_contact: response.data.contactId,
//           nama: response.data.nama,
//           perusahaan: response.data.perusahaan,
//           email: response.data.email,
//           no_telp: response.data.no_telp,
//           alamat: response.data.alamat,
//           sektor: {
//             title: response.data.sektor.nama_sektor,
//             bg: response.data.sektor.bg_color,
//             text: response.data.sektor.text_color,
//           },
//           produk: response.data.produk,
//           jumlah: response.data.jumlah,
//           harga: response.data.harga,
//           catatan: response.data.catatan,
//         });

//         // Update the state
//         setColumns(updatedColumns);
//         setIsModalOpen(false); // Close the modal
//       }
//     } catch (error) {
//       console.error("Error adding task:", error);
//     }
//   };

//   const openModal = () => setIsModalOpen(true);
//   const closeModal = () => setIsModalOpen(false);

//   const handleUpdateTask = (updatedTask: any, columnId: string) => {
//     const updatedColumns = { ...columns };
//     const column = updatedColumns[columnId];
//     const taskIndex = column.items.findIndex((task: any) => task.id_contact === updatedTask.id_contact);
//     if (taskIndex !== -1) {
//       column.items[taskIndex] = updatedTask; // Update the task in the column
//       setColumns(updatedColumns); // Update the columns state
//     }
//   };

//   const handleDeleteTask = (taskId: string) => {
//     const updatedColumns = { ...columns };
//     Object.entries(updatedColumns).forEach(([colId, col]) => {
//       updatedColumns[colId].items = col.items.filter((task: any) => task.id_contact !== taskId);
//     });
//     setColumns(updatedColumns); // Update the columns state after deleting the task
//   };

//   return (
//     <>
//       <DragDropContext
//         onDragEnd={(result: any) => onDragEnd(result, columns, setColumns)}
//       >
//         <div className="w-full flex items-start justify-between px-5 pb-8 md:gap-3 gap-10">
//           {Object.entries(columns).map(([columnId, column]: [string, any]) => (
//             <div className="w-full flex flex-col gap-0" key={columnId}>
//               <Droppable droppableId={columnId} key={columnId}>
//                 {(provided: any) => (
//                   <div
//                     ref={provided.innerRef}
//                     {...provided.droppableProps}
//                     className="flex flex-col md:w-[290px] w-[250px] gap-3 items-center py-5"
//                   >
//                     <div className="flex items-center justify-center py-[10px] w-full bg-white rounded-lg shadow-sm text-[#555] font-medium text-[15px]">
//                       {column.name}
//                     </div>
//                     {column.items.map((task: any, index: number) => (
//                       <Draggable
//                         key={task.id_contact.toString()}
//                         draggableId={task.id_contact.toString()}
//                         index={index}
//                       >
//                         {(provided: any) => (
//                           <Task
//                             provided={provided}
//                             task={task}
//                             onUpdateTask={(updatedTask: any) => handleUpdateTask(updatedTask, columnId)}
//                             onDeleteTask={handleDeleteTask}
//                           />
//                         )}
//                       </Draggable>
//                     ))}
//                     {provided.placeholder}
//                   </div>
//                 )}
//               </Droppable>
//             </div>
//           ))}
//         </div>
//       </DragDropContext>

//       <div
//         onClick={openModal}
//         className="fixed bottom-5 right-5 flex items-center justify-center gap-1 py-[10px] px-[15px] bg-blue-500 text-white rounded-full shadow-lg cursor-pointer"
//       >
//         <FiPlus color={"#fff"} /> Add Leads
//       </div>

//       <AddModal
//         isOpen={isModalOpen}
//         onClose={closeModal}
//         setOpen={setIsModalOpen}
//         handleAddTask={handleAddTask}
//         sektorOptions={sektorOptions} // Pass sektor options to the modal
//       />
//     </>
//   );
// };

// export default Home;

// import React, { useState, useEffect } from "react";
// import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
// import axios from "axios";
// import AddModal from "../../components/Modals/AddModal";
// import Task from "../../components/Task";
// import { onDragEnd } from "../../helpers/onDragEnd";
// import { FiPlus } from "react-icons/fi";

// const Home = () => {
//   const [columns, setColumns] = useState<any>({});
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [sektorOptions, setSektorOptions] = useState<any[]>([]);

//   // Fetch Columns
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axios.get("http://localhost:3000/user/columns");
//         if (response.data && response.data.columns) {
//           const formattedColumns = response.data.columns.reduce((acc: any, column: any) => {
//             acc[column.id] = {
//               name: column.name,
//               items: column.tasks,
//             };
//             return acc;
//           }, {});
//           setColumns(formattedColumns);
//         }
//       } catch (error) {
//         console.error("Error fetching columns:", error);
//       }
//     };
//     fetchData();
//   }, []);

//   // Fetch Sektor
//   useEffect(() => {
//     const fetchSektor = async () => {
//       try {
//         const response = await axios.get("http://localhost:3000/user/sektor");
//         setSektorOptions(response.data.sektor || []);
//       } catch (error) {
//         console.error("Error fetching sektor:", error);
//       }
//     };
//     fetchSektor();
//   }, []);

//   const handleAddTask = async (newTask: any) => {
//     try {
//       const response = await axios.post("http://localhost:3000/user/task", newTask);
//       if (response.data.status === "ok") {
//         const updatedColumns = { ...columns };

//         const columnId = newTask.columnId;
//         // Check if the columnId exists, if not, initialize it
//         if (!updatedColumns[columnId]) {
//           updatedColumns[columnId] = {
//             name: `Column ${columnId}`, // Default name for the new column
//             items: [], // Initialize with an empty items array
//           };
//         }

//         // Add the new task to the column
//         updatedColumns[columnId].items.push({
//           id_contact: response.data.contactId,
//           nama: response.data.nama,
//           perusahaan: response.data.perusahaan,
//           email: response.data.email,
//           no_telp: response.data.no_telp,
//           alamat: response.data.alamat,
//           sektor: {
//             title: response.data.sektor.nama_sektor,
//             bg: response.data.sektor.bg_color,
//             text: response.data.sektor.text_color,
//           },
//           produk: response.data.produk,
//           jumlah: response.data.jumlah,
//           harga: response.data.harga,
//           catatan: response.data.catatan,
//         });

//         // Update the state
//         setColumns(updatedColumns);
//         setIsModalOpen(false); // Close the modal
//       }
//     } catch (error) {
//       console.error("Error adding task:", error);
//     }
//   };

//   const openModal = () => setIsModalOpen(true);
//   const closeModal = () => setIsModalOpen(false);

//   const handleUpdateTask = (updatedTask: any, columnId: string) => {
//     const updatedColumns = { ...columns };
//     const column = updatedColumns[columnId];
//     const taskIndex = column.items.findIndex((task: any) => task.id_contact === updatedTask.id_contact);
//     if (taskIndex !== -1) {
//       column.items[taskIndex] = updatedTask; // Update the task in the column
//       setColumns(updatedColumns); // Update the columns state
//     }
//   };

//   const handleDeleteTask = (taskId: string) => {
//     const updatedColumns = { ...columns };
//     Object.entries(updatedColumns).forEach(([colId, col]) => {
//       updatedColumns[colId].items = col.items.filter((task: any) => task.id_contact !== taskId);
//     });
//     setColumns(updatedColumns); // Update the columns state after deleting the task
//   };

//   return (
//     <>
//       <DragDropContext
//         onDragEnd={(result: any) => onDragEnd(result, columns, setColumns)}
//       >
//         <div className="w-full flex items-start justify-between gap-3 pr-10 " >
//           {Object.entries(columns).map(([columnId, column]: [string, any]) => (
//             <div className="w-full flex flex-col gap-0 pr-1" key={columnId}>
//               <Droppable droppableId={columnId} key={columnId}>
//                 {(provided: any) => (
//                   <div
//                     ref={provided.innerRef}
//                     {...provided.droppableProps}
//                     className="flex flex-col md:w-[290px] w-[200px] gap-3 items-center py-3  "
//                   >
//                     <div className="flex items-center justify-center py-[10px] w-full bg-white rounded-lg shadow-sm text-[#555] font-medium text-[15px]">
//                       {column.name}
//                     </div>
//                     {column.items.map((task: any, index: number) => (
//                       <Draggable
//                         key={task.id_contact.toString()}
//                         draggableId={task.id_contact.toString()}
//                         index={index}
//                       >
//                         {(provided: any) => (
//                           <Task
//                             provided={provided}
//                             task={task}
//                             onUpdateTask={(updatedTask: any) => handleUpdateTask(updatedTask, columnId)}
//                             onDeleteTask={handleDeleteTask}
//                           />
//                         )}
//                       </Draggable>
//                     ))}
//                     {provided.placeholder}
//                   </div>
//                 )}
//               </Droppable>
//             </div>
//           ))}
//         </div>
//       </DragDropContext>

//       <div
//         onClick={openModal}
//         className="fixed bottom-5 right-5 flex items-center justify-center gap-1 py-[10px] px-[15px] bg-blue-500 text-white rounded-full shadow-lg cursor-pointer"
//       >
//         <FiPlus color={"#fff"} /> Add Leads
//       </div>

//       <AddModal
//         isOpen={isModalOpen}
//         onClose={closeModal}
//         setOpen={setIsModalOpen}
//         handleAddTask={handleAddTask}
//         sektorOptions={sektorOptions} // Pass sektor options to the modal
//       />
//     </>
//   );
// };

// export default Home;

// import React, { useState, useEffect } from "react";
// import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
// import axios from "axios";
// import AddModal from "../../components/Modals/AddModal";
// import Task from "../../components/Task";
// import { onDragEnd } from "../../helpers/onDragEnd";
// import { FiPlus } from "react-icons/fi";

// const Home = () => {
//   const [columns, setColumns] = useState<any>({});
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [sektorOptions, setSektorOptions] = useState<any[]>([]);

//   // Fetch Columns
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axios.get("http://localhost:3000/user/columns");
//         if (response.data && response.data.columns) {
//           const formattedColumns = response.data.columns.reduce((acc: any, column: any) => {
//             acc[column.id] = {
//               name: column.name,
//               items: column.tasks,
//             };
//             return acc;
//           }, {});
//           setColumns(formattedColumns);
//         }
//       } catch (error) {
//         console.error("Error fetching columns:", error);
//       }
//     };
//     fetchData();
//   }, []);

//   // Fetch Sektor
//   useEffect(() => {
//     const fetchSektor = async () => {
//       try {
//         const response = await axios.get("http://localhost:3000/user/sektor");
//         setSektorOptions(response.data.sektor || []);
//       } catch (error) {
//         console.error("Error fetching sektor:", error);
//       }
//     };
//     fetchSektor();
//   }, []);

//   const handleAddTask = async (newTask: any) => {
//     try {
//       const response = await axios.post("http://localhost:3000/user/task", newTask);
//       if (response.data.status === "ok") {
//         const updatedColumns = { ...columns };

//         const columnId = newTask.columnId;
//         // Check if the columnId exists, if not, initialize it
//         if (!updatedColumns[columnId]) {
//           updatedColumns[columnId] = {
//             name: `Column ${columnId}`, // Default name for the new column
//             items: [], // Initialize with an empty items array
//           };
//         }

//         // Add the new task to the column
//         updatedColumns[columnId].items.push({
//           id_contact: response.data.contactId,
//           nama: response.data.nama,
//           perusahaan: response.data.perusahaan,
//           email: response.data.email,
//           no_telp: response.data.no_telp,
//           alamat: response.data.alamat,
//           sektor: {
//             title: response.data.sektor.nama_sektor,
//             bg: response.data.sektor.bg_color,
//             text: response.data.sektor.text_color,
//           },
//           produk: response.data.produk,
//           jumlah: response.data.jumlah,
//           harga: response.data.harga,
//           catatan: response.data.catatan,
//         });

//         // Update the state
//         setColumns(updatedColumns);
//         setIsModalOpen(false); // Close the modal
//       }
//     } catch (error) {
//       console.error("Error adding task:", error);
//     }
//   };

//   const openModal = () => setIsModalOpen(true);
//   const closeModal = () => setIsModalOpen(false);

//   const handleUpdateTask = (updatedTask: any, columnId: string) => {
//     const updatedColumns = { ...columns };
//     const column = updatedColumns[columnId];
//     const taskIndex = column.items.findIndex((task: any) => task.id_contact === updatedTask.id_contact);
//     if (taskIndex !== -1) {
//       column.items[taskIndex] = updatedTask; // Update the task in the column
//       setColumns(updatedColumns); // Update the columns state
//     }
//   };

//   const handleDeleteTask = (taskId: string) => {
//     const updatedColumns = { ...columns };
//     Object.entries(updatedColumns).forEach(([colId, col]) => {
//       updatedColumns[colId].items = col.items.filter((task: any) => task.id_contact !== taskId);
//     });
//     setColumns(updatedColumns); // Update the columns state after deleting the task
//   };

//   return (
//     <>
//       <DragDropContext
//         onDragEnd={(result: any) => onDragEnd(result, columns, setColumns)}
//       >
//         <div className="w-full flex items-start justify-between gap-6 pr-10">
//           {Object.entries(columns).map(([columnId, column]: [string, any]) => (
//             <div className="w-full flex flex-col gap-4 pr-0" key={columnId}>
//               <Droppable droppableId={columnId} key={columnId}>
//                 {(provided: any) => (
//                   <div
//                     ref={provided.innerRef}
//                     {...provided.droppableProps}
//                     className="flex flex-col md:w-[250px] w-[200px] gap-2 items-center py-3 ]"
//                   >
//                     <div className="flex items-center justify-center py-[10px] w-full bg-white rounded-lg shadow-sm text-[#555] font-medium text-[15px]">
//                       {column.name}
//                     </div>
//                     {column.items.map((task: any, index: number) => (
//                       <Draggable
//                         key={task.id_contact.toString()}
//                         draggableId={task.id_contact.toString()}
//                         index={index}
//                       >
//                         {(provided: any) => (
//                           <Task
//                             provided={provided}
//                             task={task}
//                             onUpdateTask={(updatedTask: any) => handleUpdateTask(updatedTask, columnId)}
//                             onDeleteTask={handleDeleteTask}
//                           />
//                         )}
//                       </Draggable>
//                     ))}
//                     {provided.placeholder}
//                   </div>
//                 )}
//               </Droppable>
//             </div>
//           ))}
//         </div>
//       </DragDropContext>

//       <div
//         onClick={openModal}
//         className="fixed bottom-5 right-5 flex items-center justify-center gap-1 py-[10px] px-[15px] bg-blue-500 text-white rounded-full shadow-lg cursor-pointer"
//       >
//         <FiPlus color={"#fff"} /> Add Leads
//       </div>

//       <AddModal
//         isOpen={isModalOpen}
//         onClose={closeModal}
//         setOpen={setIsModalOpen}
//         handleAddTask={handleAddTask}
//         sektorOptions={sektorOptions} // Pass sektor options to the modal
//       />
//     </>
//   );
// };

// export default Home;


// import React, { useState, useEffect } from "react";
// import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
// import axios from "axios";
// import AddModal from "../../components/Modals/AddModal";
// import Task from "../../components/Task";
// import { onDragEnd } from "../../helpers/onDragEnd";
// import { FiPlus } from "react-icons/fi";
// import "react-toastify/dist/ReactToastify.css"; // Import Toastify styles

// interface TaskType {
//   id_contact: string;
//   nama: string;
//   perusahaan: string;
//   email: string;
//   no_telp: string;
//   alamat: string;
//   sektor: {
//     title: string;
//     bg: string;
//     text: string;
//   };
//   produk: string;
//   jumlah: number;
//   harga: number;
//   catatan: string;
// }

// interface ColumnType {
//   name: string;
//   items: TaskType[];
// }

// const Home: React.FC = () => {
//   const [columns, setColumns] = useState<{ [key: string]: ColumnType }>({});
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [sektorOptions, setSektorOptions] = useState<any[]>([]);

//   // Fetch Columns
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axios.get("http://localhost:3000/user/columns");
//         if (response.data && response.data.columns) {
//           const formattedColumns = response.data.columns.reduce(
//             (acc: { [key: string]: ColumnType }, column: any) => {
//               acc[column.id] = {
//                 name: column.name,
//                 items: column.tasks,
//               };
//               return acc;
//             },
//             {}
//           );
//           setColumns(formattedColumns);
//         }
//       } catch (error) {
//         console.error("Error fetching columns:", error);
//       }
//     };
//     fetchData();
//   }, []);

//   // Fetch Sektor
//   useEffect(() => {
//     const fetchSektor = async () => {
//       try {
//         const response = await axios.get("http://localhost:3000/user/sektor");
//         setSektorOptions(response.data.sektor || []);
//       } catch (error) {
//         console.error("Error fetching sektor:", error);
//       }
//     };
//     fetchSektor();
//   }, []);

//   // Handle add task
//   const handleAddTask = async (newTask: any) => {
//     try {
//       const response = await axios.post("http://localhost:3000/user/task", newTask);
//       if (response.data.status === "ok") {
//         const updatedColumns = { ...columns };

//         const columnId = newTask.columnId;

//         // Cek apakah columnId sudah ada, jika tidak buat kolom baru
//         if (!updatedColumns[columnId]) {
//           updatedColumns[columnId] = {
//             name: `Column ${columnId}`, // Nama default untuk kolom baru
//             items: [], // Inisialisasi array kosong untuk item
//           };
//         }

//         // Tambahkan task baru ke dalam kolom
//         updatedColumns[columnId].items.push({
//           id_contact: response.data.contactId,
//           nama: response.data.nama,
//           perusahaan: response.data.perusahaan,
//           email: response.data.email,
//           no_telp: response.data.no_telp,
//           alamat: response.data.alamat,
//           sektor: {
//             title: response.data.sektor.nama_sektor,
//             bg: response.data.sektor.bg_color,
//             text: response.data.sektor.text_color,
//           },
//           produk: response.data.produk,
//           jumlah: response.data.jumlah,
//           harga: response.data.harga,
//           catatan: response.data.catatan,
//         });

//         // Update state columns langsung tanpa perlu refresh
//         setColumns((prevColumns) => ({ ...prevColumns, ...updatedColumns }));
//         setIsModalOpen(false); // Tutup modal setelah data ditambahkan
//       }
//     } catch (error) {
//       alert("Error adding task:", error);
//     }
//   };

//   // Handle update task
//   const handleUpdateTask = (updatedTask: any, columnId: string) => {
//     const updatedColumns = { ...columns };
//     const column = updatedColumns[columnId];
//     const taskIndex = column.items.findIndex((task: any) => task.id_contact === updatedTask.id_contact);
//     if (taskIndex !== -1) {
//       column.items[taskIndex] = updatedTask; // Update the task in the column
//       setColumns(updatedColumns); // Update the columns state
//     }
//   };

//   // Handle delete task
//   const handleDeleteTask = (taskId: string) => {
//     const updatedColumns = { ...columns };
//     Object.entries(updatedColumns).forEach(([colId, col]) => {
//       updatedColumns[colId].items = col.items.filter((task: any) => task.id_contact !== taskId);
//     });
//     setColumns(updatedColumns); // Update the columns state after deleting the task
//   };

//   // Open and close modal
//   const openModal = () => setIsModalOpen(true);
//   const closeModal = () => setIsModalOpen(false);

//   return (
//     <>
//       <DragDropContext
//         onDragEnd={(result: any) => onDragEnd(result, columns, setColumns)}
//       >
//         <div className="w-full flex items-start justify-between gap-6 pr-10">
//           {Object.entries(columns).map(([columnId, column]: [string, ColumnType]) => (
//             <div className="w-full flex flex-col gap-4 pr-0" key={columnId}>
//               <Droppable droppableId={columnId} key={columnId}>
//                 {(provided: any) => (
//                   <div
//                     ref={provided.innerRef}
//                     {...provided.droppableProps}
//                     className="flex flex-col md:w-[250px] w-[200px] gap-2 items-center py-3"
//                   >
//                     <div className="flex items-center justify-center py-[10px] w-full bg-white rounded-lg shadow-sm text-[#555] font-medium text-[15px]">
//                       {column.name}
//                     </div>
//                     {column.items.map((task: any, index: number) => (
//                       <Draggable
//                         key={task.id_contact.toString()}
//                         draggableId={task.id_contact.toString()}
//                         index={index}
//                       >
//                         {(provided: any) => (
//                           <Task
//                             provided={provided}
//                             task={task}
//                             onUpdateTask={(updatedTask: any) => handleUpdateTask(updatedTask, columnId)}
//                             onDeleteTask={handleDeleteTask}
//                           />
//                         )}
//                       </Draggable>
//                     ))}
//                     {provided.placeholder}
//                   </div>
//                 )}
//               </Droppable>
//             </div>
//           ))}
//         </div>
//       </DragDropContext>

//       <div
//         onClick={openModal}
//         className="fixed bottom-5 right-5 flex items-center justify-center gap-1 py-[10px] px-[15px] bg-blue-500 text-white rounded-full shadow-lg cursor-pointer"
//       >
//         <FiPlus color={"#fff"} /> Add Leads
//       </div>

//       <AddModal
//         isOpen={isModalOpen}
//         onClose={closeModal}
//         setOpen={setIsModalOpen}
//         handleAddTask={handleAddTask}
//         sektorOptions={sektorOptions} // Pass sektor options to the modal
//       />
//     </>
//   );
// };

// export default Home;


// import React, { useState, useEffect } from "react";
// import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
// import axios from "axios";
// import AddModal from "../../components/Modals/AddModal";
// import Task from "../../components/Task";
// import { onDragEnd } from "../../helpers/onDragEnd";
// import { FiPlus } from "react-icons/fi";
// import "react-toastify/dist/ReactToastify.css"; // Import Toastify styles

// interface TaskType {
//   id_contact: string;
//   nama: string;
//   perusahaan: string;
//   email: string;
//   no_telp: string;
//   alamat: string;
//   sektor: {
//     title: string;
//     bg: string;
//     text: string;
//   };
//   produk: string;
//   jumlah: number;
//   harga: number;
//   catatan: string;
// }

// interface ColumnType {
//   name: string;
//   items: TaskType[];
// }

// const Home: React.FC = () => {
//   const [columns, setColumns] = useState<{ [key: string]: ColumnType }>({});
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [sektorOptions, setSektorOptions] = useState<any[]>([]);

//   // Fetch Columns
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axios.get("http://localhost:3000/user/columns");
//         if (response.data && response.data.columns) {
//           const formattedColumns = response.data.columns.reduce(
//             (acc: { [key: string]: ColumnType }, column: any) => {
//               acc[column.id] = {
//                 name: column.name,
//                 items: column.tasks,
//               };
//               return acc;
//             },
//             {}
//           );
//           setColumns(formattedColumns);
//         }
//       } catch (error) {
//         console.error("Error fetching columns:", error);
//       }
//     };
//     fetchData();
//   }, []);

//   // Fetch Sektor
//   useEffect(() => {
//     const fetchSektor = async () => {
//       try {
//         const response = await axios.get("http://localhost:3000/user/sektor");
//         setSektorOptions(response.data.sektor || []);
//       } catch (error) {
//         console.error("Error fetching sektor:", error);
//       }
//     };
//     fetchSektor();
//   }, []);

//   // Handle add task
//   const handleAddTask = async (newTask: any) => {
//     try {
//       const response = await axios.post("http://localhost:3000/user/task", newTask);
//       if (response.data.status === "ok") {
//         const updatedColumns = { ...columns };

//         const columnId = newTask.columnId;

//         // Cek apakah columnId sudah ada, jika tidak buat kolom baru
//         if (!updatedColumns[columnId]) {
//           updatedColumns[columnId] = {
//             name: `Column ${columnId}`, // Nama default untuk kolom baru
//             items: [], // Inisialisasi array kosong untuk item
//           };
//         }

//         // Tambahkan task baru ke dalam kolom
//         updatedColumns[columnId].items.push({
//           id_contact: response.data.contactId,
//           nama: response.data.nama,
//           perusahaan: response.data.perusahaan,
//           email: response.data.email,
//           no_telp: response.data.no_telp,
//           alamat: response.data.alamat,
//           sektor: {
//             title: response.data.sektor.nama_sektor,
//             bg: response.data.sektor.bg_color,
//             text: response.data.sektor.text_color,
//           },
//           produk: response.data.produk,
//           jumlah: response.data.jumlah,
//           harga: response.data.harga,
//           catatan: response.data.catatan,
//         });

//         // Update state columns langsung tanpa perlu refresh
//         setColumns((prevColumns) => ({ ...prevColumns, ...updatedColumns }));
//         setIsModalOpen(false); // Tutup modal setelah data ditambahkan

//         // Show browser alert on success
//         alert("Lead berhasil ditambahkan!"); // Simple alert message
//       }
//     } catch (error) {
//       alert("Error adding task:", error); // Show error alert if something goes wrong
//     }
//   };

//   // Handle update task
//   const handleUpdateTask = (updatedTask: any, columnId: string) => {
//     const updatedColumns = { ...columns };
//     const column = updatedColumns[columnId];
//     const taskIndex = column.items.findIndex((task: any) => task.id_contact === updatedTask.id_contact);
//     if (taskIndex !== -1) {
//       column.items[taskIndex] = updatedTask; // Update the task in the column
//       setColumns(updatedColumns); // Update the columns state
//     }
//   };

//   // Handle delete task
//   const handleDeleteTask = (taskId: string) => {
//     const updatedColumns = { ...columns };
//     Object.entries(updatedColumns).forEach(([colId, col]) => {
//       updatedColumns[colId].items = col.items.filter((task: any) => task.id_contact !== taskId);
//     });
//     setColumns(updatedColumns); // Update the columns state after deleting the task
//   };

//   // Open and close modal
//   const openModal = () => setIsModalOpen(true);
//   const closeModal = () => setIsModalOpen(false);

//   return (
//     <>
//       <DragDropContext
//         onDragEnd={(result: any) => onDragEnd(result, columns, setColumns)}
//       >
//         <div className="w-full flex items-start justify-between gap-6 pr-10">
//           {Object.entries(columns).map(([columnId, column]: [string, ColumnType]) => (
//             <div className="w-full flex flex-col gap-4 pr-0" key={columnId}>
//               <Droppable droppableId={columnId} key={columnId}>
//                 {(provided: any) => (
//                   <div
//                     ref={provided.innerRef}
//                     {...provided.droppableProps}
//                     className="flex flex-col md:w-[250px] w-[200px] gap-2 items-center py-3"
//                   >
//                     <div className="flex items-center justify-center py-[10px] w-full bg-white rounded-lg shadow-sm text-[#555] font-medium text-[15px]">
//                       {column.name}
//                     </div>
//                     {column.items.map((task: any, index: number) => (
//                       <Draggable
//                         key={task.id_contact.toString()}
//                         draggableId={task.id_contact.toString()}
//                         index={index}
//                       >
//                         {(provided: any) => (
//                           <Task
//                             provided={provided}
//                             task={task}
//                             onUpdateTask={(updatedTask: any) => handleUpdateTask(updatedTask, columnId)}
//                             onDeleteTask={handleDeleteTask}
//                           />
//                         )}
//                       </Draggable>
//                     ))}
//                     {provided.placeholder}
//                   </div>
//                 )}
//               </Droppable>
//             </div>
//           ))}
//         </div>
//       </DragDropContext>

//       <div
//         onClick={openModal}
//         className="fixed bottom-5 right-5 flex items-center justify-center gap-1 py-[10px] px-[15px] bg-blue-500 text-white rounded-full shadow-lg cursor-pointer"
//       >
//         <FiPlus color={"#fff"} /> Add Leads
//       </div>

//       <AddModal
//         isOpen={isModalOpen}
//         onClose={closeModal}
//         setOpen={setIsModalOpen}
//         handleAddTask={handleAddTask}
//         sektorOptions={sektorOptions} // Pass sektor options to the modal
//       />
//     </>
//   );
// };

// export default Home;


// Home.tsx
import React, { useState, useEffect } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import axios from "axios";
import AddModal from "../../components/Modals/AddModal";
import Task from "../../components/Task";
import { onDragEnd } from "../../helpers/onDragEnd";
import { FiPlus } from "react-icons/fi";
import { format } from 'date-fns'; // Import date-fns for formatting

import "react-toastify/dist/ReactToastify.css";

interface TaskType {
  id_contact: string;
  nama: string;
  perusahaan: string;
  email: string;
  no_telp: string;
  alamat: string;
  sektor: {
    title: string;
    bg: string;
    text: string;
  };
  produk: string;
  jumlah: number;
  harga: number;
  catatan: string;
  add_date: string;
}

interface ColumnType {
  name: string;
  items: TaskType[];
}

const Home: React.FC = () => {
  const [columns, setColumns] = useState<{ [key: string]: ColumnType }>({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [sektorOptions, setSektorOptions] = useState<any[]>([]);

  // Fetch Columns
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/user/columns");
        if (response.data && response.data.columns) {
          const formattedColumns = response.data.columns.reduce(
            (acc: { [key: string]: ColumnType }, column: any) => {
              acc[column.id] = {
                name: column.name,
                items: column.tasks,
              };
              return acc;
            },
            {}
          );
          setColumns(formattedColumns);
        }
      } catch (error) {
        console.error("Error fetching columns:", error);
      }
    };
    fetchData();
  }, []);

  // Fetch Sektor
  useEffect(() => {
    const fetchSektor = async () => {
      try {
        const response = await axios.get("http://localhost:3000/user/sektor");
        setSektorOptions(response.data.sektor || []);
      } catch (error) {
        console.error("Error fetching sektor:", error);
      }
    };
    fetchSektor();
  }, []);

  // Handle add task
  const handleAddTask = async (newTask: any) => {
    const formattedDate = format(new Date(), 'yyyy-MM-dd HH:mm:ss'); // Format the date as 'YYYY-MM-DD HH:mm:ss'
    const taskWithFormattedDate = { ...newTask, add_date: formattedDate };

    try {
      const response = await axios.post("http://localhost:3000/user/task", taskWithFormattedDate);
      if (response.data.status === "ok") {
        const updatedColumns = { ...columns };
        const columnId = newTask.columnId;

        if (!updatedColumns[columnId]) {
          updatedColumns[columnId] = {
            name: `Column ${columnId}`,
            items: [],
          };
        }

        updatedColumns[columnId].items.push({
          ...response.data,
          add_date: formattedDate, // Ensure the add_date is included
        });

        setColumns((prevColumns) => ({ ...prevColumns, ...updatedColumns }));
        setIsModalOpen(false);

        alert("Lead berhasil ditambahkan!");
      }
    } catch (error) {
      alert("Error adding task:", error);
    }
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <>
      <DragDropContext onDragEnd={(result: any) => onDragEnd(result, columns, setColumns)}>
        <div className="w-full flex items-start justify-between gap-6 pr-10">
          {Object.entries(columns).map(([columnId, column]: [string, ColumnType]) => (
            <div className="w-full flex flex-col gap-4 pr-0" key={columnId}>
              <Droppable droppableId={columnId} key={columnId}>
                {(provided: any) => (
                  <div ref={provided.innerRef} {...provided.droppableProps} className="flex flex-col md:w-[250px] w-[200px] gap-2 items-center py-3">
                    <div className="flex items-center justify-center py-[10px] w-full bg-white rounded-lg shadow-sm text-[#555] font-medium text-[15px]">
                      {column.name}
                    </div>
                    {column.items.map((task: any, index: number) => (
                      <Draggable key={task.id_contact.toString()} draggableId={task.id_contact.toString()} index={index}>
                        {(provided: any) => (
                          <Task provided={provided} task={task} />
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </div>
          ))}
        </div>
      </DragDropContext>

      <div onClick={openModal} className="fixed bottom-5 right-5 flex items-center justify-center gap-1 py-[10px] px-[15px] bg-blue-500 text-white rounded-full shadow-lg cursor-pointer">
        <FiPlus color={"#fff"} /> Add Leads
      </div>

      <AddModal isOpen={isModalOpen} onClose={closeModal} handleAddTask={handleAddTask} sektorOptions={sektorOptions} />
    </>
  );
};

export default Home;

