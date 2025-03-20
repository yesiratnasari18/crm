// import Sidebar from "../components/SidebarSales";
// import Navbar from "../components/Navbar";
// import { Outlet } from "react-router-dom";

// type LayoutProps = {
//   isLoggedIn: boolean;
//   role?: string; // Make this optional if it's not always passed
// };

// const Layout: React.FC<LayoutProps> = ({ isLoggedIn, role }) => {
//   return (
//     <div className="w-screen h-screen relative">
//       {isLoggedIn && <Sidebar />}
//       <Navbar />
//       <div className="md:pl-[250px] pl-[60px] pr-[20px] pt-[70px] w-full h-full overflow-y-auto">
//         <Outlet />
//       </div>
//     </div>
//   );
// };

// export default Layout;


// // import Sidebar from "../components/Sidebar";
// // import Navbar from "../components/Navbar";
// // import { Outlet } from "react-router-dom";

// // type LayoutProps = {
// //   isLoggedIn: boolean; // Indicates if the user is logged in
// //   role?: string; // User role, optional
// // };

// // const Layout: React.FC<LayoutProps> = ({ isLoggedIn, role = "guest" }) => {
// //   return (
// //     <div className="w-screen h-screen relative">
// //       {/* Render Sidebar only if the user is logged in */}
// //       {isLoggedIn && <Sidebar role={role} />}

// //       {/* Always render Navbar */}
// //       <Navbar />

// //       {/* Main content area with padding and responsive styles */}
// //       <div className="md:pl-[250px] pl-[60px] pr-[20px] pt-[70px] w-full h-full overflow-y-auto">
// //         <Outlet />
// //       </div>
// //     </div>
// //   );
// // };

// // export default Layout;


import Sidebar from "../components/SidebarSales";
import Navbar from "../components/Navbar";
import { Outlet } from "react-router-dom";

const Layout = ({ isLoggedIn, role }) => {
  return (
    <div className="w-screen h-screen relative">
      {isLoggedIn && <Sidebar />}
      <Navbar />
      <div className="md:pl-[250px] pl-[60px] pr-[20px] pt-[70px] w-full h-full overflow-y-auto">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
