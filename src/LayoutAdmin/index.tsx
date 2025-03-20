import Sidebar from "../components/SidebarAdmin";
import Navbar from "../components/Navbar";
import { Outlet } from "react-router-dom";

type LayoutProps = {
  isLoggedIn: boolean;
};

const LayoutAdmin: React.FC<LayoutProps> = ({ isLoggedIn }) => {
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

export default LayoutAdmin;
