import { useState } from "react";
import Header from "../components/layout/Header";
import Sidebar from "../components/layout/Sidebar";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [desktopSidebarOpen, setDesktopSidebarOpen] = useState(true);
    return (
        <>
            <div className="flex min-h-screen">
                <Sidebar
                    desktopSidebarOpen={desktopSidebarOpen}
                    mobileMenuOpen={mobileMenuOpen}
                    setMobileMenuOpen={setMobileMenuOpen}
                />
                <div className="w-full flex flex-col">
                    <Header
                        desktopSidebarOpen={desktopSidebarOpen}
                        setDesktopSidebarOpen={setDesktopSidebarOpen}
                        mobileMenuOpen={mobileMenuOpen}
                        setMobileMenuOpen={setMobileMenuOpen}></Header>
                    <main className="container bg-slate-100 flex-1 overflow-y-auto overflow-x-hidden py-5 bg-secondary/10 ">
                        <Outlet />
                    </main>
                </div>
            </div>
        </>
    );
};
export default MainLayout;
