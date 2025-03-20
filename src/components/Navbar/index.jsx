// import {
// 	ChevronDown,
// 	NotificationsOutline,
// 	PersonCircle,
// 	SearchOutline,
// 	SettingsOutline,
// 	ShareSocialOutline,
// } from "react-ionicons";

// const Navbar = () => {
// 	return (
// 		<div className="md:w-[calc(100%-230px)] w-[calc(100%-60px)] fixed flex items-center justify-between pl-2 pr-6 h-[70px] top-0 md:left-[230px] left-[60px] border-b border-slate-300 bg-[#fff]">
// 			<div className="flex items-center gap-3 cursor-pointer">
// 				<PersonCircle
// 					color="blue"
// 					width={"28px"}
// 					height={"28px"}
// 				/>
// 				<span className="text-blue-400 font-semibold md:text-lg text-sm whitespace-nowrap">
// 					Tappp
// 				</span>
// 				<ChevronDown
// 					color="blue"
// 					width={"16px"}
// 					height={"16px"}
// 				/>
// 			</div>
// 			<div className="md:w-[800px] w-[130px] bg-gray-100 rounded-lg px-3 py-[10px] flex items-center gap-2">
// 				<SearchOutline color={"#999"} />
// 				<input
// 					type="text"
// 					placeholder="Search"
// 					className="w-full bg-gray-100 outline-none text-[15px]"
// 				/>
// 			</div>
// 			<div className="md:flex hidden items-center gap-4">
// 				<div className="grid place-items-center bg-gray-100 rounded-full p-2 cursor-pointer">
// 					<ShareSocialOutline color={"#444"} />
// 				</div>
// 				<div className="grid place-items-center bg-gray-100 rounded-full p-2 cursor-pointer">
// 					<SettingsOutline color={"#444"} />
// 				</div>
// 				<div className="grid place-items-center bg-gray-100 rounded-full p-2 cursor-pointer">
// 					<NotificationsOutline color={"#444"} />
// 				</div>
// 			</div>
// 		</div>
// 	);
// };

// export default Navbar;


// import React, { useState, useEffect } from 'react';
// import {
//   ChevronDown,
//   NotificationsOutline,
//   PersonCircle,
//   SearchOutline,
//   SettingsOutline,
//   ShareSocialOutline,
// } from 'react-ionicons';

// const Navbar = ({ activePage }) => {
//   const [searchQuery, setSearchQuery] = useState('');

//   // Handle search input change
//   const handleSearchChange = (event) => {
//     setSearchQuery(event.target.value);
//   };

//   // Simulate search based on the active page
//   useEffect(() => {
//     if (searchQuery) {
//       // Here you can integrate your global search functionality
//       console.log(`Searching for "${searchQuery}" on ${activePage}`);
//     }
//   }, [searchQuery, activePage]); // Triggers whenever searchQuery or activePage changes

//   return (
//     <div className="md:w-[calc(100%-230px)] w-[calc(100%-60px)] fixed flex items-center justify-between pl-2 pr-6 h-[70px] top-0 md:left-[230px] left-[60px] border-b border-slate-300 bg-[#fff]">
//       <div className="flex items-center gap-3 cursor-pointer">
//         <PersonCircle color="blue" width={"28px"} height={"28px"} />
//         <span className="text-blue-400 font-semibold md:text-lg text-sm whitespace-nowrap">
//           Tappp
//         </span>
//         <ChevronDown color="blue" width={"16px"} height={"16px"} />
//       </div>
//       <div className="md:w-[800px] w-[130px] bg-gray-100 rounded-lg px-3 py-[10px] flex items-center gap-2">
//         <SearchOutline color={"#999"} />
//         <input
//           type="text"
//           placeholder="Search"
//           value={searchQuery}
//           onChange={handleSearchChange}
//           className="w-full bg-gray-100 outline-none text-[15px]"
//         />
//       </div>
//       <div className="md:flex hidden items-center gap-4">
//         <div className="grid place-items-center bg-gray-100 rounded-full p-2 cursor-pointer">
//           <ShareSocialOutline color={"#444"} />
//         </div>
//         <div className="grid place-items-center bg-gray-100 rounded-full p-2 cursor-pointer">
//           <SettingsOutline color={"#444"} />
//         </div>
//         <div className="grid place-items-center bg-gray-100 rounded-full p-2 cursor-pointer">
//           <NotificationsOutline color={"#444"} />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Navbar;



import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  ChevronDown,
  NotificationsOutline,
  PersonCircle,
  SearchOutline,
  SettingsOutline,
  ShareSocialOutline,
} from 'react-ionicons';

const Navbar = ({ activePage }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]); // Menyimpan hasil pencarian
  const [loading, setLoading] = useState(false); // Menangani status loading

  // Handle search input change
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  // Pencarian otomatis saat searchQuery berubah
  useEffect(() => {
    if (searchQuery) {
      setLoading(true);
      // Memanggil API untuk melakukan pencarian
      axios
        .get(`http://localhost:3000/user/search?q=${searchQuery}`)  // URL API backend
        .then((response) => {
          setSearchResults(response.data.results);  // Menyimpan hasil pencarian
          setLoading(false);
        })
        .catch((error) => {
          console.error('Error fetching search results:', error);
          setLoading(false);
        });
    } else {
      setSearchResults([]);  // Clear hasil jika tidak ada pencarian
    }
  }, [searchQuery]); // Trigger saat searchQuery berubah

  return (
    <div className="md:w-[calc(100%-230px)] w-[calc(100%-60px)] fixed flex items-center justify-between pl-2 pr-6 h-[70px] top-0 md:left-[230px] left-[60px] border-b border-slate-300 bg-[#fff]">
      <div className="flex items-center gap-3 cursor-pointer">
        <PersonCircle color="blue" width={"28px"} height={"28px"} />
        <span className="text-blue-400 font-semibold md:text-lg text-sm whitespace-nowrap">
          Tappp
        </span>
        <ChevronDown color="blue" width={"16px"} height={"16px"} />
      </div>
      <div className="md:w-[800px] w-[130px] bg-gray-100 rounded-lg px-3 py-[10px] flex items-center gap-2">
        <SearchOutline color={"#999"} />
        <input
          type="text"
          placeholder="Search"
          value={searchQuery}
          onChange={handleSearchChange}
          className="w-full bg-gray-100 outline-none text-[15px]"
        />
      </div>

      {/* Tampilkan hasil pencarian */}
      {loading ? (
        <div className="absolute top-[80px] left-[60px] bg-white border border-gray-300 p-3 rounded-lg shadow-lg">
          <p>Loading...</p>
        </div>
      ) : (
        searchResults.length > 0 && (
          <div className="absolute top-[80px] left-[60px] bg-white border border-gray-300 p-3 rounded-lg shadow-lg w-[80%] max-h-[300px] overflow-auto">
            <h3 className="font-semibold text-lg mb-3">Search Results:</h3>
            <ul>
              {searchResults.map((result, index) => (
                <li key={index} className="p-2 hover:bg-gray-100 rounded">
                  <div>
                    <strong>{result.name}</strong>
                    {result.email && <p>Email: {result.email}</p>}
                    {result.company && <p>Company: {result.company}</p>}
                    {result.product && <p>Product: {result.product}</p>}
                    {result.phone && <p>Phone: {result.phone}</p>}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )
      )}

      <div className="md:flex hidden items-center gap-4">
        <div className="grid place-items-center bg-gray-100 rounded-full p-2 cursor-pointer">
          <ShareSocialOutline color={"#444"} />
        </div>
        <div className="grid place-items-center bg-gray-100 rounded-full p-2 cursor-pointer">
          <SettingsOutline color={"#444"} />
        </div>
        <div className="grid place-items-center bg-gray-100 rounded-full p-2 cursor-pointer">
          <NotificationsOutline color={"#444"} />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
