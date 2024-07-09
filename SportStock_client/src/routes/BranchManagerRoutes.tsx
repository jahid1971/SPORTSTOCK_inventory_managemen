import Home from "@/pages/Home";
import NotFound from "@/pages/others/NotFound";
import CreatreProduct from "@/pages/products/CreatreProduct";
import Products from "@/pages/products/Products";
import SalesHistory from "@/pages/sales/SalesHistory";
import SalesReport from "@/pages/sales/SalesReport";
import CreateSeller from "@/pages/user/CreateSeller";
import Users from "@/pages/user/Users";
import { Route, Routes } from "react-router-dom";

export const BranchManagerRoutes = () => {
    return (
        <Routes>
            <Route path="dashboard" element={<Home />} />
            <Route path="users" element={<Users />} />
            <Route path="create-product" element={<CreatreProduct  />} />
            <Route path="products" element={<Products />} />
            <Route path="sales-report" element={<SalesReport />} />
            <Route path="sales-history" element={<SalesHistory />} />
            <Route path="create-seller" element={<CreateSeller />} />
            <Route path="*" element={<NotFound />} />
        </Routes>
    );
};
