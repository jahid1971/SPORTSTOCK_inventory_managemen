import React, { useState } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
    const [open, setOpen] = useState(false);
    return (
        <>
            <Header open={open} setOpen={setOpen}></Header>
            {/* <div className="relative flex min-h-screen border-collapse">
                <Sidebar open={open} setOpen={setOpen} />
                <main className="container flex-1 overflow-y-auto overflow-x-hidden pt-16 bg-secondary/10 ">
                    <Outlet />
                </main>
            </div> */}
        </>
    );
};
export default MainLayout;
