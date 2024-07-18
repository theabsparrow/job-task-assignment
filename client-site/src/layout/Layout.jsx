import { Outlet } from "react-router-dom";
import Navbar from "../component/Navbar";



const Layout = () => {
    return <>
        <Outlet></Outlet>
        <div className="flex justify-center">
            <Navbar></Navbar>
        </div>
    </>
};

export default Layout;