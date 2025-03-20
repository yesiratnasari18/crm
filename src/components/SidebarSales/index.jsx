// Import necessary modules
// import { FaUserCircle } from "react-icons/fa";
// import {
//     AppsOutline,
//     GridOutline,
//     HomeOutline,
//     LogOutOutline,
//     PieChartOutline,
//     CalculatorOutline,
// } from "react-ionicons";
// import { Link, useLocation } from "react-router-dom"; // Import useLocation
// import { LineChart } from "recharts";

// const Sidebar = () => {
//     const location = useLocation(); // Get current location

//     const navLinks = [
//         {
//             title: "Dashboard",
//             icon: <HomeOutline color="#555" width="22px" height="22px" />,
//             path: "/dashboard",
//         },
//         {
//             title: "Manage Leads",
//             icon: <AppsOutline color="#555" width="22px" height="22px" />,
//             path: "/manageleads",
//         },
//         {
//             title: "Contact",
//             icon: <GridOutline color="#555" width="22px" height="22px" />,
//             path: "/contact",
//         },
//         {
//             title: "Bobot",
//             icon: <CalculatorOutline color="#555" width="22px" height="22px" />,
//             path: "/bobot",
//         },
//         {
//             title: "Laporan",
//             icon: <PieChartOutline color="#555" width="22px" height="22px" />,
//             path: "/laporan",
//         },
//         {
//             title: "Segmentasi Pasar",
//             icon: <PieChartOutline color="#555" width="22px" height="22px" />,
//             path: "/segmentasi",
//         },
//     ];

//     const logOut = () => {
//         window.localStorage.clear();
//         window.location.href = "/login";
//     };

//     return (
//         <div className="fixed left-0 top-0 md:w-[230px] w-[60px] overflow-hidden h-full flex flex-col">
//             <div className="w-full flex items-center md:justify-start justify-center md:pl-5 h-[70px] bg-[#fff]">
//                 <span className="text-blue-400 font-semibold text-2xl md:block hidden">TEKMT.</span>
//                 <span className="text-blue-400 font-semibold text-2xl md:hidden block">T</span>
//             </div>
//             <div className="w-full h-[calc(100vh-70px)] border-r flex flex-col md:items-start items-center gap-2 border-slate-300 bg-[#fff] py-5 md:px-3 px-3 relative pt-0 md:px-3 px-3">
//                 {navLinks.map((link) => (
//                     <Link to={link.path} key={link.title} className="w-full">
//                         <div
//                             className={`flex items-center gap-2 w-full rounded-lg hover:bg-blue-300 px-2 py-3 cursor-pointer ${location.pathname === link.path ? "bg-blue-400 text-white" : "bg-transparent text-gray-700"
//                                 }`}
//                         >
//                             {link.icon}
//                             <span className="font-medium text-[15px] md:block hidden">{link.title}</span>
//                         </div>
//                     </Link>
//                 ))}
//                 <div
//                     className="flex absolute bottom-4 items-center md:justify-start justify-center gap-2 md:w-[90%] w-[70%] rounded-lg hover:bg-orange-300 px-2 py-3 cursor-pointer bg-gray-200"
//                     onClick={logOut}
//                 >
//                     <LogOutOutline />
//                     <span className="font-medium text-[15px] md:block hidden">Log Out</span>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default Sidebar;

// import { FaUserCircle } from "react-icons/fa";
// import {
//     AppsOutline,
//     GridOutline,
//     HomeOutline,
//     LogOutOutline,
//     PieChartOutline,
//     CalculatorOutline,
// } from "react-ionicons";
// import { Link, useLocation } from "react-router-dom"; // Import useLocation

// const Sidebar = () => {
//     const location = useLocation(); // Get current location

//     // Define navigation links
//     const navLinks = [
//         {
//             title: "Dashboard",
//             icon: <HomeOutline color="#555" width="22px" height="22px" />,
//             path: "/dashboard",
//         },
//         {
//             title: "Manage Leads",
//             icon: <AppsOutline color="#555" width="22px" height="22px" />,
//             path: "/manageleads",
//         },
//         {
//             title: "Contact",
//             icon: <GridOutline color="#555" width="22px" height="22px" />,
//             path: "/contact",
//         },
//         {
//             title: "Bobot",
//             icon: <CalculatorOutline color="#555" width="22px" height="22px" />,
//             path: "/bobot",
//         },
//         {
//             title: "Laporan",
//             icon: <PieChartOutline color="#555" width="22px" height="22px" />,
//             path: "/laporan",
//         },
//         {
//             title: "Segmentasi Pasar",
//             icon: <PieChartOutline color="#555" width="22px" height="22px" />,
//             path: "/segmentasi",
//         },
//     ];

//     // Log out function
//     const logOut = () => {
//         window.localStorage.clear();
//         window.location.href = "/login";
//     };

//     return (
//         <div className="fixed left-0 top-0 md:w-[230px] w-[60px] overflow-hidden h-full flex flex-col transition-all duration-300 ease-in-out">
//             {/* Header */}
//             <div className="w-full flex items-center md:justify-start justify-center md:pl-5 h-[70px] bg-[#fff]">
//                 <span className="text-blue-400 font-semibold text-2xl md:block hidden">TEKMT.</span>
//                 <span className="text-blue-400 font-semibold text-2xl md:hidden block">T</span>
//             </div>

//             {/* Navigation Links */}
//             <div className="w-full h-[calc(100vh-70px)] border-r flex flex-col md:items-start items-center gap-2 border-slate-300 bg-[#fff] py-5 md:px-3 px-3 relative pt-0">
//                 {navLinks.map((link) => (
//                     <Link to={link.path} key={link.title} className="w-full">
//                         <div
//                             className={`flex items-center gap-2 w-full rounded-lg hover:bg-blue-300 px-2 py-3 cursor-pointer ${location.pathname === link.path ? "bg-blue-400 text-white" : "bg-transparent text-gray-700"
//                                 }`}
//                         >
//                             {/* Icon aligned to the left when expanded or center when minimized */}
//                             <div className="flex justify-center md:justify-start">
//                                 {link.icon}
//                             </div>
//                             {/* Show title only on larger screens */}
//                             <span className="font-medium text-[15px] md:block hidden text-left">{link.title}</span>
//                         </div>
//                     </Link>
//                 ))}

//                 {/* Log Out Button */}
//                 <div
//                     className="flex absolute bottom-4 items-center md:justify-start justify-center gap-2 md:w-[90%] w-[70%] rounded-lg hover:bg-orange-300 px-2 py-3 cursor-pointer bg-gray-200"
//                     onClick={logOut}
//                 >
//                     <LogOutOutline />
//                     <span className="font-medium text-[15px] md:block hidden">Log Out</span>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default Sidebar;


// import { useState } from "react";
// import { FaUserCircle } from "react-icons/fa";
// import {
//     AppsOutline,
//     GridOutline,
//     HomeOutline,
//     LogOutOutline,
//     PieChartOutline,
//     CalculatorOutline,
// } from "react-ionicons";
// import { Link, useLocation } from "react-router-dom"; // Import useLocation

// const Sidebar = () => {
//     const location = useLocation(); // Get current location

//     // State untuk modal konfirmasi logout
//     const [showLogoutModal, setShowLogoutModal] = useState(false);

//     // Define navigation links
//     const navLinks = [
//         {
//             title: "Dashboard",
//             icon: <HomeOutline color="#555" width="22px" height="22px" />,
//             path: "/dashboard",
//         },
//         {
//             title: "Manage Leads",
//             icon: <AppsOutline color="#555" width="22px" height="22px" />,
//             path: "/manageleads",
//         },
//         {
//             title: "Contact",
//             icon: <GridOutline color="#555" width="22px" height="22px" />,
//             path: "/contact",
//         },
//         {
//             title: "Bobot",
//             icon: <CalculatorOutline color="#555" width="22px" height="22px" />,
//             path: "/bobot",
//         },
//         {
//             title: "Laporan",
//             icon: <PieChartOutline color="#555" width="22px" height="22px" />,
//             path: "/laporan",
//         },
//         {
//             title: "Segmentasi Pasar",
//             icon: <PieChartOutline color="#555" width="22px" height="22px" />,
//             path: "/segmentasi",
//         },
//     ];

//     // Fungsi untuk menangani logout
//     const logOut = () => {
//         window.localStorage.clear();
//         window.location.href = "/login";
//     };

//     return (
//         <div className="fixed left-0 top-0 md:w-[230px] w-[60px] overflow-hidden h-full flex flex-col transition-all duration-300 ease-in-out">
//             {/* Header */}
//             <div className="w-full flex items-center md:justify-start justify-center md:pl-5 h-[70px] bg-[#fff]">
//                 <span className="text-blue-400 font-semibold text-2xl md:block hidden">TEKMT.</span>
//                 <span className="text-blue-400 font-semibold text-2xl md:hidden block">T</span>
//             </div>

//             {/* Navigation Links */}
//             <div className="w-full h-[calc(100vh-70px)] border-r flex flex-col md:items-start items-center gap-2 border-slate-300 bg-[#fff] py-5 md:px-3 px-3 relative pt-0">
//                 {navLinks.map((link) => (
//                     <Link to={link.path} key={link.title} className="w-full">
//                         <div
//                             className={`flex items-center gap-2 w-full rounded-lg hover:bg-blue-300 px-2 py-3 cursor-pointer ${location.pathname === link.path ? "bg-blue-400 text-white" : "bg-transparent text-gray-700"
//                                 }`}
//                         >
//                             {/* Icon aligned to the left when expanded or center when minimized */}
//                             <div className="flex justify-center md:justify-start">
//                                 {link.icon}
//                             </div>
//                             {/* Show title only on larger screens */}
//                             <span className="font-medium text-[15px] md:block hidden text-left">{link.title}</span>
//                         </div>
//                     </Link>
//                 ))}

//                 {/* Log Out Button */}
//                 <div
//                     className="flex absolute bottom-4 items-center md:justify-start justify-center gap-2 md:w-[90%] w-[70%] rounded-lg hover:bg-orange-300 px-2 py-3 cursor-pointer bg-gray-200"
//                     onClick={() => setShowLogoutModal(true)} // Buka modal saat tombol logout diklik
//                 >
//                     <LogOutOutline />
//                     <span className="font-medium text-[15px] md:block hidden">Log Out</span>
//                 </div>
//             </div>

//             {/* Modal untuk Konfirmasi Logout */}
//             {showLogoutModal && (
//                 <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
//                     <div className="bg-white p-6 rounded-lg shadow-lg w-80">
//                         <h3 className="text-lg font-semibold text-center mb-4">Konfirmasi Logout</h3>
//                         <p className="text-sm text-center mb-6">Apakah Anda yakin ingin keluar?</p>
//                         <div className="flex justify-between">
//                             <button
//                                 onClick={() => setShowLogoutModal(false)} // Tutup modal jika batal
//                                 className="px-4 py-2 bg-gray-300 text-black rounded-lg hover:bg-gray-400"
//                             >
//                                 Batal
//                             </button>
//                             <button
//                                 onClick={logOut} // Logout jika konfirmasi
//                                 className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
//                             >
//                                 Logout
//                             </button>
//                         </div>
//                     </div>
//                 </div>
//             )}
//         </div>
//     );
// };

// export default Sidebar;


import { useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import {
    AppsOutline,
    GridOutline,
    HomeOutline,
    LogOutOutline,
    PieChartOutline,
    CalculatorOutline,
} from "react-ionicons";
import { Link, useLocation } from "react-router-dom"; // Import useLocation

const Sidebar = () => {
    const location = useLocation(); // Get current location

    // State untuk modal konfirmasi logout
    const [showLogoutModal, setShowLogoutModal] = useState(false);

    // Define navigation links
    const navLinks = [
        {
            title: "Dashboard",
            icon: <HomeOutline color="#555" width="22px" height="22px" />,
            path: "/dashboard",
        },
        {
            title: "Manage Leads",
            icon: <AppsOutline color="#555" width="22px" height="22px" />,
            path: "/manageleads",
        },
        {
            title: "Contact",
            icon: <GridOutline color="#555" width="22px" height="22px" />,
            path: "/contact",
        },
        {
            title: "Bobot",
            icon: <CalculatorOutline color="#555" width="22px" height="22px" />,
            path: "/bobot",
        },
        {
            title: "Summary CRM",
            icon: <PieChartOutline color="#555" width="22px" height="22px" />,
            path: "/summary-crm",
        },
        {
            title: "Laporan",
            icon: <PieChartOutline color="#555" width="22px" height="22px" />,
            path: "/laporan",
        },
        {
            title: "Segmentasi Pasar",
            icon: <PieChartOutline color="#555" width="22px" height="22px" />,
            path: "/segmentasi",
        },
    ];

    // Fungsi untuk menangani logout
    const logOut = () => {
        window.localStorage.clear();
        window.location.href = "/login";
    };

    return (
        <div className="fixed left-0 top-0 md:w-[230px] w-[60px] overflow-hidden h-full flex flex-col transition-all duration-300 ease-in-out">
            {/* Header */}
            <div className="w-full flex items-center md:justify-start justify-center md:pl-5 h-[70px] bg-[#fff]">
                <span className="text-blue-400 font-semibold text-2xl md:block hidden">TEKMT.</span>
                <span className="text-blue-400 font-semibold text-2xl md:hidden block">T</span>
            </div>

            {/* Navigation Links */}
            <div className="w-full h-[calc(100vh-70px)] border-r flex flex-col md:items-start items-center gap-2 border-slate-300 bg-[#fff] py-5 md:px-3 px-3 relative pt-0 ">
                {navLinks.map((link) => (
                    <Link to={link.path} key={link.title} className="w-full">
                        <div
                            className={`flex items-center gap-2 w-full rounded-lg hover:bg-blue-300 px-2 py-3 cursor-pointer ${location.pathname === link.path
                                ? "bg-blue-400 text-white"
                                : "bg-transparent text-gray-700"
                                }`}
                        >
                            {/* Icon aligned to the left when expanded or center when minimized */}
                            <div className="flex justify-center md:justify-start">
                                {link.icon}
                            </div>
                            {/* Show title only on larger screens */}
                            <span className="font-medium text-[15px] md:block hidden text-left ">{link.title}</span>
                        </div>
                    </Link>
                ))}

                {/* Log Out Button */}
                <div
                    className="flex absolute bottom-4 items-center md:justify-start justify-center gap-2 md:w-[90%] w-[70%] rounded-lg hover:bg-red-300 px-2 py-3 cursor-pointer bg-gray-200"
                    onClick={() => setShowLogoutModal(true)} // Buka modal saat tombol logout diklik
                >
                    <LogOutOutline />
                    <span className="font-medium text-[15px] md:block hidden">Log Out</span>
                </div>
            </div>

            {/* Modal untuk Konfirmasi Logout */}
            {showLogoutModal && (
                <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-80">
                        <h3 className="text-lg font-semibold text-center mb-4">Konfirmasi Logout</h3>
                        <p className="text-sm text-center mb-6">Apakah Anda yakin ingin keluar?</p>
                        <div className="flex justify-between">
                            <button
                                onClick={() => setShowLogoutModal(false)} // Tutup modal jika batal
                                className="px-4 py-2 bg-gray-300 text-black rounded-lg hover:bg-gray-400"
                            >
                                Batal
                            </button>
                            <button
                                onClick={logOut} // Logout jika konfirmasi
                                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                            >
                                Logout
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Sidebar;
