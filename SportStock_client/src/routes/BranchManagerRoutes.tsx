import Home from "@/pages/Home";
import NotFound from "@/pages/others/NotFound";

import Products from "@/pages/products/Products";

import CreateSeller from "@/pages/user/CreateSeller";
import Users from "@/pages/user/Users";
import { Route, Routes } from "react-router-dom";

import AddStockHistory from "@/pages/History/AddHistory";
import AdjustHistory from "@/pages/History/AdjustHistory";
import TransferedHistory from "@/pages/History/TransferedHistory";

import ChangePassword from "@/pages/auth/ChangePassword";

import AddStock from "@/pages/stockManage/AddStock";
import AdjustStock from "@/pages/stockManage/AdjustStock";
import StockList from "@/pages/stockManage/StockList";
import StockTransfer from "@/pages/stockManage/StockTransfer";
import UpdateUser from "@/pages/user/update user/UpdateUser";

export const BranchManagerRoutes = () => {
    return (
        <Routes>
            <Route path="dashboard" element={<Home />} />
            <Route path="users" element={<Users />} />
            <Route path="update-user" element={<UpdateUser />} />
            <Route path="products" element={<Products />} />
            <Route path="create-seller" element={<CreateSeller />} />

            <Route path="add-stock" element={<AddStock />} />
            <Route path="stock-list" element={<StockList />} />
            <Route path="adjust-stock" element={<AdjustStock />} />
            <Route path="stock-transfer" element={<StockTransfer />} />

            <Route path="add-history" element={<AddStockHistory />} />
            <Route path="adjust-history" element={<AdjustHistory />} />
            <Route path="transfer-history" element={<TransferedHistory />} />

            <Route path="create-seller" element={<CreateSeller />} />
            <Route path="change-password" element={<ChangePassword />} />
            <Route path="*" element={<NotFound />} />
        </Routes>
    );
};
