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
