import Home from "@/pages/Home";
import ChangePassword from "@/pages/auth/ChangePassword";
import NotFound from "@/pages/others/NotFound";
import AdjustHistory from "@/pages/History/AdjustHistory";

import { Route, Routes } from "react-router-dom";
import StockList from "@/pages/stockManage/StockList";

export const SellerRoutes = () => {
    return (
        <Routes>
            <Route path="dashboard" element={<Home />} />
            {/* <Route path="products" element={<Products />} /> */}
            <Route path="stock-list" element={<StockList />} />
   
            <Route path="adjust-history" element={<AdjustHistory />} />
            <Route path="change-password" element={<ChangePassword />} />
            <Route path="*" element={<NotFound />} />
        </Routes>
    );
};
