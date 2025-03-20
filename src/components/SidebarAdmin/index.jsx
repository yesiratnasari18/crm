// Import necessary icons from 'react-ionicons'
// import {
// 	AppsOutline,
// 	GridOutline,
// 	HomeOutline,
// 	LogOutOutline,
// 	PieChartOutline,
// 	CalculatorOutline,
// } from "react-ionicons";
// import { Link } from "react-router-dom"; // Import Link

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
//         <div className="fixed left-0 top-0 md:w-[230px] w-[60px] overflow-hidden h-full flex flex-col bg-white shadow-lg">
//             {/* Header Section */}
//             <div className="w-full flex items-center justify-center md:justify-start h-[60px] bg-white border-b border-gray-200"> {/* Menyesuaikan tinggi */}
//                 <span className="text-blue-400 font-semibold text-2xl md:block hidden">TEKMT.</span>
//                 <span className="text-blue-400 font-semibold text-2xl md:hidden block">T</span>
//             </div>

//             {/* Navigation Links */}
//             <div className="w-full h-[calc(100vh-60px)] flex flex-col justify-between pt-3 md:px-3 px-3"> {/* Menyesuaikan padding top */}
//                 <div className="flex flex-col gap-2">
//                     {navLinks.map((link) => (
//                         <Link to={link.path} key={link.title} className="w-full">
//                             <div
//                                 className={`flex items-center gap-2 w-full rounded-lg hover:bg-blue-300 px-2 py-3 cursor-pointer ${
//                                     location.pathname === link.path
//                                         ? "bg-blue-400 text-white"
//                                         : "bg-transparent text-gray-700"
//                                 }`}
//                             >
//                                 {link.icon}
//                                 <span className="font-medium text-[15px] md:block hidden">{link.title}</span>
//                             </div>
//                         </Link>
//                     ))}
//                 </div>

//                 {/* Logout Button */}
//                 <div
//                     className="flex items-center justify-start gap-2 w-full px-2 py-3 cursor-pointer bg-gray-200 rounded-lg hover:bg-orange-300"
//                     onClick={logOut}
//                 >
//                     <LogOutOutline color="#555" width="22px" height="22px" />
//                     <span className="font-medium text-[15px] md:block hidden">Log Out</span>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default Sidebar;


import {
	AppsOutline,
	GridOutline,
	HomeOutline,
	LogOutOutline,
	PieChartOutline,
	CalculatorOutline,
} from "react-ionicons";
import { Link, useLocation } from "react-router-dom";

const Sidebar = () => {
	const location = useLocation();

	const navLinks = [
		{ title: "Dashboard", icon: <HomeOutline color="#555" width="22px" height="22px" />, path: "/dashboard" },
		{ title: "Manage Leads", icon: <AppsOutline color="#555" width="22px" height="22px" />, path: "/manageleads" },
		{ title: "Contact", icon: <GridOutline color="#555" width="22px" height="22px" />, path: "/contact" },
		{ title: "Bobot", icon: <CalculatorOutline color="#555" width="22px" height="22px" />, path: "/bobot" },
		{ title: "Laporan", icon: <PieChartOutline color="#555" width="22px" height="22px" />, path: "/laporan" },
		{ title: "Segmentasi Pasar", icon: <PieChartOutline color="#555" width="22px" height="22px" />, path: "/segmentasi" },
	];

	const logOut = () => {
		window.localStorage.clear();
		window.location.href = "/login";
	};

	return (
		<div className="fixed left-0 top-0 md:w-[230px] w-[60px] overflow-hidden h-full flex flex-col bg-white shadow-lg">
			{/* Header Section */}
			<div className="w-full flex items-center justify-center md:justify-start h-[60px] bg-white border-b border-gray-200">
				<span className="text-blue-400 font-semibold text-2xl md:block hidden">TEKMT.</span>
				<span className="text-blue-400 font-semibold text-2xl md:hidden block">T</span>
			</div>

			{/* Navigation Links */}
			<div className="w-full h-[calc(100vh-50px)] flex flex-col justify-between pt-3 md:px-3 px-3">
				<div className="flex flex-col gap-2">
					{navLinks.map((link) => (
						<Link to={link.path} key={link.title} className="w-full">
							<div
								className={`flex items-center gap-2 w-full rounded-lg hover:bg-blue-300 px-2 py-3 cursor-pointer ${location.pathname === link.path ? "bg-blue-400 text-white" : "bg-transparent text-gray-700"
									}`}
							>
								{link.icon}
								<span className="font-medium text-[15px] md:block hidden">{link.title}</span>
							</div>
						</Link>
					))}
				</div>

				{/* Logout Button */}
				<div
					className="flex items-center justify-start gap-3 w-full px-2 py-3 cursor-pointer bg-gray-200 rounded-lg hover:bg-orange-300"
					onClick={logOut}
				>
					<LogOutOutline color="#555" width="22px" height="22px" />
					<span className="font-medium text-[15px] md:block hidden">Log Out</span>
				</div>
			</div>
		</div>
	);
};

export default Sidebar;
