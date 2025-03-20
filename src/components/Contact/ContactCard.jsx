// import React, { useState } from 'react';

// function ContactCard({ name, company, onClick }) {
//   return (
//     <div className="border rounded-lg shadow-lg overflow-hidden mb-4 flex justify-between items-center p-4 w-1/5 mx-2">
//       <div>
//         <h2 className="text-lg font-semibold">{name}</h2>
//         <p className="text-gray-600 mt-1">{company}</p>
//       </div>
//       <button
//         className="bg-transparent text-gray-500 hover:text-gray-700 p-2 rounded-full focus:outline-none"
//         onClick={onClick}
//       >
//         <i className="fas fa-chevron-right"></i>
//       </button>
//     </div>
//   );
// }

// function Drawer({ contact, onClose }) {
//   return (
//     <div className={`fixed top-0 right-0 h-full bg-white shadow-lg transition-transform duration-300 ease-in-out ${contact ? 'translate-x-0' : 'translate-x-full'}`}>
//       <div className="p-4">
//         <h2 className="text-xl font-semibold">{contact?.name}</h2>
//         <p className="text-gray-600">{contact?.company}</p>
//         <button
//           className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
//           onClick={onClose}
//         >
//           Close
//         </button>
//       </div>
//     </div>
//   );
// }

// function ContactList() {
//   const [selectedContact, setSelectedContact] = useState(null);
//   const contacts = [
//     { name: "John Doe", company: "Company A" },
//     { name: "Jane Smith", company: "Company B" },
//     { name: "Alice Johnson", company: "Company C" },
//     { name: "Bob Brown", company: "Company D" },
//     { name: "Alice Johnson", company: "Company C" },
//     { name: "Bob Brown", company: "Company D" }
//   ];

//   const openDrawer = (contact) => {
//     setSelectedContact(contact);
//   };

//   const closeDrawer = () => {
//     setSelectedContact(null);
//   };

//   return (
//     <div className="flex flex-wrap justify-start p-4 -mx-2">
//       {contacts.map((contact, index) => (
//         <ContactCard
//           key={index}
//           name={contact.name}
//           company={contact.company}
//           onClick={() => openDrawer(contact)}
//         />
//       ))}
//       <Drawer contact={selectedContact} onClose={closeDrawer} />
//     </div>
//   );
// }

// function App() {
//   return (
//     <div className="App">
//       <ContactList />
//     </div>
//   );
// }

// export default App;



// import React, { useState, useEffect } from 'react';

// function ContactCard({ name, company, onClick }) {
//   return (
//     <div className="border rounded-lg shadow-lg overflow-hidden mb-4 flex justify-between items-center p-3 w-1/5 mx-2 h-24"> {/* Reduced the height (h-24) and padding (p-3) */}
//       <div className="overflow-hidden">
//         <h2 className="text-lg font-semibold truncate">{name}</h2>
//         <p className="text-gray-600 mt-1 truncate">{company}</p>
//       </div>
//       <button
//         className="bg-transparent text-gray-500 hover:text-gray-700 p-2 rounded-full focus:outline-none"
//         onClick={onClick}
//       >
//         <i className="fas fa-chevron-right"></i>
//       </button>
//     </div>
//   );
// }

// function Drawer({ contact, onClose }) {
//   return (
//     <div className={`fixed top-0 right-0 h-full bg-white shadow-lg transition-transform duration-300 ease-in-out ${contact ? 'translate-x-0' : 'translate-x-full'}`}>
//       <div className="p-4">
//         <h2 className="text-xl font-semibold">{contact?.name}</h2>
//         <p className="text-gray-600">{contact?.company}</p>
//         <button
//           className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
//           onClick={onClose}
//         >
//           Close
//         </button>
//       </div>
//     </div>
//   );
// }

// function ContactList() {
//   const [selectedContact, setSelectedContact] = useState(null);
//   const [contacts, setContacts] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     fetch('http://localhost:3000/user/contact') // URL backend sesuai
//       .then((response) => response.json())
//       .then((data) => {
//         setContacts(data.tasks); // Menggunakan "tasks" dari response backend
//         setLoading(false);
//       })
//       .catch((error) => {
//         console.error('Error fetching contacts:', error);
//         setLoading(false);
//       });
//   }, []);

//   const openDrawer = (contact) => {
//     setSelectedContact(contact);
//   };

//   const closeDrawer = () => {
//     setSelectedContact(null);
//   };

//   if (loading) {
//     return <p>Loading contacts...</p>;
//   }

//   return (
//     <div className="flex flex-wrap justify-start p-4 -mx-2">
//       {contacts.map((contact) => (
//         <ContactCard
//           key={contact.id}
//           name={contact.nama}
//           company={contact.perusahaan}
//           onClick={() => openDrawer(contact)}
//         />
//       ))}
//       <Drawer contact={selectedContact} onClose={closeDrawer} />
//     </div>
//   );
// }

// function App() {
//   return (
//     <div className="App">
//       <ContactList />
//     </div>
//   );
// }

// export default App;


// import React, { useState, useEffect } from 'react';

// function ContactCard({ name, company, onClick }) {
//   return (
//     <div className="border rounded-lg shadow-lg overflow-hidden mb-4 flex justify-between items-center p-3 w-1/5 mx-2 h-24">
//       <div className="overflow-hidden">
//         <h2 className="text-lg font-semibold truncate">{name}</h2>
//         <p className="text-gray-600 mt-1 truncate">{company}</p>
//       </div>
//       <button
//         className="bg-transparent text-gray-500 hover:text-gray-700 p-2 rounded-full focus:outline-none"
//         onClick={onClick}
//       >
//         <i className="fas fa-chevron-right"></i>
//       </button>
//     </div>
//   );
// }

// function Drawer({ contact, onClose }) {
//   if (!contact) return null;

//   return (
//     <div className={`fixed top-0 right-0 h-full bg-white shadow-lg transition-transform duration-300 ease-in-out ${contact ? 'translate-x-0' : 'translate-x-full'}`}>
//       <div className="p-4">
//         <h2 className="text-xl font-semibold">{contact.nama}</h2>
//         <p className="text-gray-600">{contact.perusahaan}</p>
//         <p className="text-gray-600 mt-2"><strong>Phone:</strong> {contact.no_telp}</p>
//         <p className="text-gray-600"><strong>Email:</strong> {contact.email}</p>
//         <p className="text-gray-600"><strong>Alamat:</strong> {contact.alamat}</p>
//         <div className="mt-4">
//           <button
//             className="bg-blue-500 text-white px-4 py-2 rounded"
//             onClick={onClose}
//           >
//             Close
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// function ContactList() {
//   const [selectedContact, setSelectedContact] = useState(null);
//   const [contacts, setContacts] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     fetch('http://localhost:3000/user/contact') // URL backend sesuai
//       .then((response) => response.json())
//       .then((data) => {
//         setContacts(data.tasks); // Menggunakan "tasks" dari response backend
//         setLoading(false);
//       })
//       .catch((error) => {
//         console.error('Error fetching contacts:', error);
//         setLoading(false);
//       });
//   }, []);

//   const openDrawer = (contact) => {
//     setSelectedContact(contact);
//   };

//   const closeDrawer = () => {
//     setSelectedContact(null);
//   };

//   if (loading) {
//     return <p>Loading contacts...</p>;
//   }

//   return (
//     <div className="flex flex-wrap justify-start p-4 -mx-2">
//       {contacts.map((contact) => (
//         <ContactCard
//           key={contact.id}
//           name={contact.nama}
//           company={contact.perusahaan}
//           onClick={() => openDrawer(contact)}
//         />
//       ))}
//       <Drawer contact={selectedContact} onClose={closeDrawer} />
//     </div>
//   );
// }

// function App() {
//   return (
//     <div className="App">
//       <ContactList />
//     </div>
//   );
// }

// export default App;


// import React, { useState, useEffect } from 'react';

// function ContactCard({ name, company, onClick }) {
//   return (
//     <div className="border rounded-lg shadow-lg overflow-hidden mb-4 flex justify-between items-center p-3 w-1/5 mx-2 h-24">
//       <div className="overflow-hidden">
//         <h2 className="text-lg font-semibold truncate">{name}</h2>
//         <p className="text-gray-600 mt-1 truncate">{company}</p>
//       </div>
//       <button
//         className="bg-transparent text-gray-500 hover:text-gray-700 p-2 rounded-full focus:outline-none"
//         onClick={onClick}
//       >
//         <i className="fas fa-chevron-right"></i>
//       </button>
//     </div>
//   );
// }

// function Drawer({ contact, onClose }) {
//   if (!contact) return null;

//   return (
//     <div
//       className={`fixed top-0 right-0 h-full bg-white shadow-lg transition-all duration-1000 ease-in-out transform ${contact ? 'translate-x-0' : 'translate-x-full'}`}
//       style={{ width: '50%' }} // Fixed width of 50%
//     >
//       <div className="p-4">
//         <h2 className="text-xl font-semibold">{contact.nama}</h2>
//         <p className="text-gray-600">{contact.perusahaan}</p>
//         <p className="text-gray-600 mt-2"><strong>Phone:</strong> {contact.no_telp}</p>
//         <p className="text-gray-600"><strong>Email:</strong> {contact.email}</p>
//         <p className="text-gray-600"><strong>Alamat:</strong> {contact.alamat}</p>
//         <div className="mt-4">
//           <button
//             className="bg-blue-500 text-white px-4 py-2 rounded"
//             onClick={onClose}
//           >
//             Close
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// function ContactList() {
//   const [selectedContact, setSelectedContact] = useState(null);
//   const [contacts, setContacts] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     fetch('http://localhost:3000/user/contact') // URL backend sesuai
//       .then((response) => response.json())
//       .then((data) => {
//         setContacts(data.tasks); // Menggunakan "tasks" dari response backend
//         setLoading(false);
//       })
//       .catch((error) => {
//         console.error('Error fetching contacts:', error);
//         setLoading(false);
//       });
//   }, []);

//   const openDrawer = (contact) => {
//     setSelectedContact(contact);
//   };

//   const closeDrawer = () => {
//     setSelectedContact(null);
//   };

//   if (loading) {
//     return <p>Loading contacts...</p>;
//   }

//   return (
//     <div className="flex flex-wrap justify-start p-4 -mx-2">
//       {contacts.map((contact) => (
//         <ContactCard
//           key={contact.id}
//           name={contact.nama}
//           company={contact.perusahaan}
//           onClick={() => openDrawer(contact)}
//         />
//       ))}
//       <Drawer contact={selectedContact} onClose={closeDrawer} />
//     </div>
//   );
// }

// function App() {
//   return (
//     <div className="App">
//       <ContactList />
//     </div>
//   );
// }

// export default App;

// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const ContactCard = ({ name, phone, email, onClick }) => {
//   return (
//     <div
//       onClick={onClick}
//       className="bg-white shadow-md rounded-lg p-4 m-2 w-64 cursor-pointer hover:bg-gray-200"
//     >
//       <h2 className="text-xl font-semibold text-gray-800 mb-2 text-left">{name}</h2>
//       <p className="text-gray-600 mb-1 text-left">
//         <i className="fas fa-phone-alt mr-2"></i>
//         {phone}
//       </p>
//       <p className="text-gray-600 text-left">
//         <i className="fas fa-envelope mr-2"></i>
//         {email}
//       </p>
//     </div>
//   );
// };

// const ContactDrawer = ({ contact, isOpen, onClose }) => {
//   return (
//     <div
//       className={`fixed top-0 right-0 w-64 h-full bg-white shadow-lg transform transition-transform duration-300 ${
//         isOpen ? 'translate-x-0' : 'translate-x-full'
//       }`}
//     >
//       <div className="p-4">
//         <button
//           onClick={onClose}
//           className="text-gray-500 hover:text-gray-800 mb-4 focus:outline-none"
//         >
//           Close
//         </button>
//         {contact && (
//           <div className="text-left">
//             <h2 className="text-xl font-semibold text-gray-800 mb-2">{contact.nama}</h2>
//             <p className="text-gray-600 mb-1">
//               <i className="fas fa-phone-alt mr-2"></i>
//               {contact.no_telp}
//             </p>
//             <p className="text-gray-600">
//               <i className="fas fa-envelope mr-2"></i>
//               {contact.email}
//             </p>
//             <p className="text-gray-600">
//               <i className="fas fa-building mr-2"></i>
//               {contact.perusahaan}
//             </p>
//             <p className="text-gray-600">
//               <i className="fas fa-map-marker-alt mr-2"></i>
//               {contact.alamat}
//             </p>
//             <p className="text-gray-600">
//               <i className="fas fa-sticky-note mr-2"></i>
//               {contact.catatan}
//             </p>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// 

// dd

// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const ContactCard = ({ name, phone, email, onClick }) => {
//   return (
//     <div
//       onClick={onClick}
//       className="bg-white shadow-md rounded-lg p-4 m-2 w-64 cursor-pointer hover:bg-gray-200"
//     >
//       <h2 className="text-xl font-semibold text-gray-800 mb-2 text-left">{name}</h2>
//       <p className="text-gray-600 mb-1 text-left">
//         <i className="fas fa-phone-alt mr-2"></i>
//         {phone}
//       </p>
//       <p className="text-gray-600 text-left">
//         <i className="fas fa-envelope mr-2"></i>
//         {email}
//       </p>
//     </div>
//   );
// };

// const ContactDrawer = ({ contact, isOpen, onClose }) => {
//   return (
//     <div
//       className={`fixed top-0 right-0 w-96 h-full bg-white shadow-lg transform transition-transform duration-300 ${
//         isOpen ? 'translate-x-0' : 'translate-x-full'
//       }`}
//     >
//       <div className="p-4">
//         <button
//           onClick={onClose}
//           className="text-gray-500 hover:text-gray-800 mb-4 focus:outline-none"
//         >
//           Close
//         </button>
//         {contact && (
//           <form className="text-left">
//             <div className="mb-4">
//               <label className="block text-gray-700 font-semibold">Name</label>
//               <input
//                 type="text"
//                 value={contact.nama}
//                 readOnly
//                 className="w-full px-3 py-2 border border-gray-300 rounded bg-gray-100 text-gray-700"
//               />
//             </div>
//             <div className="mb-4">
//               <label className="block text-gray-700 font-semibold">Phone</label>
//               <input
//                 type="text"
//                 value={contact.no_telp}
//                 readOnly
//                 className="w-full px-3 py-2 border border-gray-300 rounded bg-gray-100 text-gray-700"
//               />
//             </div>
//             <div className="mb-4">
//               <label className="block text-gray-700 font-semibold">Email</label>
//               <input
//                 type="text"
//                 value={contact.email}
//                 readOnly
//                 className="w-full px-3 py-2 border border-gray-300 rounded bg-gray-100 text-gray-700"
//               />
//             </div>
//             <div className="mb-4">
//               <label className="block text-gray-700 font-semibold">Company</label>
//               <input
//                 type="text"
//                 value={contact.perusahaan}
//                 readOnly
//                 className="w-full px-3 py-2 border border-gray-300 rounded bg-gray-100 text-gray-700"
//               />
//             </div>
//             <div className="mb-4">
//               <label className="block text-gray-700 font-semibold">Address</label>
//               <textarea
//                 value={contact.alamat}
//                 readOnly
//                 className="w-full px-3 py-2 border border-gray-300 rounded bg-gray-100 text-gray-700"
//               ></textarea>
//             </div>
//             <div className="mb-4">
//               <label className="block text-gray-700 font-semibold">Notes</label>
//               <textarea
//                 value={contact.catatan}
//                 readOnly
//                 className="w-full px-3 py-2 border border-gray-300 rounded bg-gray-100 text-gray-700"
//               ></textarea>
//             </div>
//           </form>
//         )}
//       </div>
//     </div>
//   );
// };

// const ContactList = () => {
//   const [contacts, setContacts] = useState([]);
//   const [selectedContact, setSelectedContact] = useState(null);
//   const [isDrawerOpen, setIsDrawerOpen] = useState(false);

//   useEffect(() => {
//     const fetchContacts = async () => {
//       try {
//         const response = await axios.get('http://localhost:3000/user/contact');
//         setContacts(response.data.tasks);
//       } catch (error) {
//         console.error('Error fetching contacts:', error);
//       }
//     };

//     fetchContacts();
//   }, []);

//   const openDrawer = (contact) => {
//     setSelectedContact(contact);
//     setIsDrawerOpen(true);
//   };

//   const closeDrawer = () => {
//     setIsDrawerOpen(false);
//   };

//   return (
//     <div className="flex flex-wrap justify-start items-center min-h-screen bg-gray-100">
//       {contacts.map((contact, index) => (
//         <ContactCard
//           key={index}
//           name={contact.nama}
//           phone={contact.no_telp}
//           email={contact.email}
//           onClick={() => openDrawer(contact)}
//         />
//       ))}
//       <ContactDrawer
//         contact={selectedContact}
//         isOpen={isDrawerOpen}
//         onClose={closeDrawer}
//       />
//     </div>
//   );
// };

// export default ContactList;

// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const ContactCard = ({ name, company, onClick }) => {
//   return (
//     <div
//       onClick={onClick}
//       className="bg-white shadow-md rounded-lg p-4 m-2 w-64 cursor-pointer hover:bg-gray-200"
//     >
      
//       <h2 className="text-xl font-semibold text-gray-800 mb-2 text-left overflow-hidden text-ellipsis whitespace-nowrap">
//         {name}
//       </h2>
//       <p className="text-gray-600 text-left overflow-hidden text-ellipsis whitespace-nowrap">
//         <i className="fas fa-building mr-2"></i>
//         {company}
//       </p>
//     </div>
//   );
// };


// const ContactDrawer = ({ contact, isOpen, onClose }) => {
//   return (
//     <div
//       className={`fixed top-0 right-0 w-96 h-full bg-white shadow-lg transform transition-transform duration-300 ${
//         isOpen ? 'translate-x-0' : 'translate-x-full'
//       }`}
//     >
//       <div className="p-4">
//         <button
//           onClick={onClose}
//           className="text-gray-500 hover:text-gray-800 mb-4 focus:outline-none"
//         >
//           Close
//         </button>
//         {contact && (
//           <form className="text-left">
//             <div className="mb-4">
//               <label className="block text-gray-700 font-semibold">Name</label>
//               <input
//                 type="text"
//                 value={contact.nama}
//                 readOnly
//                 className="w-full px-3 py-2 border border-gray-300 rounded bg-gray-100 text-gray-700"
//               />
//             </div>
//             <div className="mb-4">
//               <label className="block text-gray-700 font-semibold">Phone</label>
//               <input
//                 type="text"
//                 value={contact.no_telp}
//                 readOnly
//                 className="w-full px-3 py-2 border border-gray-300 rounded bg-gray-100 text-gray-700"
//               />
//             </div>
//             <div className="mb-4">
//               <label className="block text-gray-700 font-semibold">Email</label>
//               <input
//                 type="text"
//                 value={contact.email}
//                 readOnly
//                 className="w-full px-3 py-2 border border-gray-300 rounded bg-gray-100 text-gray-700"
//               />
//             </div>
//             <div className="mb-4">
//               <label className="block text-gray-700 font-semibold">Company</label>
//               <input
//                 type="text"
//                 value={contact.perusahaan}
//                 readOnly
//                 className="w-full px-3 py-2 border border-gray-300 rounded bg-gray-100 text-gray-700"
//               />
//             </div>
//             <div className="mb-4">
//               <label className="block text-gray-700 font-semibold">Address</label>
//               <textarea
//                 value={contact.alamat}
//                 readOnly
//                 className="w-full px-3 py-2 border border-gray-300 rounded bg-gray-100 text-gray-700"
//               ></textarea>
//             </div>
//           </form>
//         )}
//       </div>
//     </div>
//   );
// };

// const ContactList = () => {
//   const [contacts, setContacts] = useState([]);
//   const [selectedContact, setSelectedContact] = useState(null);
//   const [isDrawerOpen, setIsDrawerOpen] = useState(false);

//   useEffect(() => {
//     const fetchContacts = async () => {
//       try {
//         const response = await axios.get('http://localhost:3000/user/contact');
//         setContacts(response.data.tasks);
//       } catch (error) {
//         console.error('Error fetching contacts:', error);
//       }
//     };

//     fetchContacts();
//   }, []);

//   const openDrawer = (contact) => {
//     setSelectedContact(contact);
//     setIsDrawerOpen(true);
//   };

//   const closeDrawer = () => {
//     setIsDrawerOpen(false);
//   };

//   return (
//     <div className="flex flex-wrap justify-start p-4 -mx-2">
//       {contacts.map((contact, index) => (
//         <ContactCard
//           key={index}
//           name={contact.nama}
//           company={contact.perusahaan}
//           onClick={() => openDrawer(contact)}
//         />
//       ))}
//       <ContactDrawer
//         contact={selectedContact}
//         isOpen={isDrawerOpen}
//         onClose={closeDrawer}
//       />
//     </div>
//   );
// };

// export default ContactList;


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

// const ContactList = () => {
//   const [contacts, setContacts] = useState([]);
//   const [selectedContact, setSelectedContact] = useState(null);
//   const [isDrawerOpen, setIsDrawerOpen] = useState(false);

//   useEffect(() => {
//     const fetchContacts = async () => {
//       try {
//         const response = await axios.get('http://localhost:3000/user/contact');
//         setContacts(response.data.tasks);
//       } catch (error) {
//         console.error('Error fetching contacts:', error);
//       }
//     };

//     fetchContacts();
//   }, []);

//   const openDrawer = (contact) => {
//     setSelectedContact(contact);
//     setIsDrawerOpen(true);
//   };

//   const closeDrawer = () => {
//     setIsDrawerOpen(false);
//   };

//   // Helper function to get dynamic styles for status
//   const getStatusStyle = (status) => {
//     switch (status) {
//       case 'Active':
//         return 'bg-green-500 text-white';
//       case 'Inactive':
//         return 'bg-red-500 text-white';
//       case 'Pending':
//         return 'bg-yellow-500 text-black';
//       default:
//         return 'bg-gray-500 text-white';
//     }
//   };

//   return (
//     <section className="container mx-auto p-6 font-mono">
//       <div className="w-full mb-8 overflow-hidden rounded-lg shadow-lg">
//         <div className="w-full overflow-x-auto">
//           <table className="w-full">
//             <thead>
//               <tr className="text-md font-semibold tracking-wide text-left text-gray-900 bg-gray-100 uppercase border-b border-gray-600">
//                 <th className="px-4 py-3">No</th>
//                 <th className="px-4 py-3">Nama</th>
//                 <th className="px-4 py-3">Perusahaan</th>
//                 <th className="px-4 py-3">Actions</th>
//               </tr>
//             </thead>
//             <tbody className="bg-white">
//               {contacts.map((person, index) => (
//                 <tr key={index} className="text-gray-700 hover:bg-gray-100">
//                   <td className="px-4 py-3 text-md font-semibold border">{index + 1}</td>
//                   <td className="px-4 py-3 text-md font-semibold border">{person.nama}</td>
//                   <td className="px-4 py-3 text-md font-semibold border">{person.perusahaan}</td>
//                   <td className="px-4 py-3 text-center border">
//                     <button
//                       onClick={() => openDrawer(person)}
//                       className="text-blue-500 hover:text-blue-700"
//                     >
//                       <i className="fas fa-eye"></i>
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>
//       <ContactDrawer
//         contact={selectedContact}
//         isOpen={isDrawerOpen}
//         onClose={closeDrawer}
//       />
//     </section>
//   );
// };

// export default ContactList;
const ContactList = () => {
  const [contacts, setContacts] = useState([]);
  const [selectedContact, setSelectedContact] = useState(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1); // Track current page
  const [itemsPerPage, setItemsPerPage] = useState(10); // Track items per page

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const response = await axios.get('http://localhost:3000/user/contact');
        setContacts(response.data.tasks);
      } catch (error) {
        console.error('Error fetching contacts:', error);
      }
    };

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

