import Home from "@/pages/Home";
import CahangePassword from "@/pages/auth/ChangePassword";
import NotFound from "@/pages/others/NotFound";

import Products from "@/pages/products/Products";

import SalesReport from "@/pages/sales/SalesReport";

import { Route, Routes } from "react-router-dom";

export const SellerRoutes = () => {
    return (
        <Routes>
            <Route path="dashboard" element={<Home />} />
            <Route path="change-password" element={<CahangePassword />} />

            <Route path="products" element={<Products />} />
            <Route path="sales-report" element={<SalesReport />} />
            {/* <Route path="sales-history" element={<SalesHistory />} /> */}
            <Route path="*" element={<NotFound />} />
        </Routes>
    );
};
