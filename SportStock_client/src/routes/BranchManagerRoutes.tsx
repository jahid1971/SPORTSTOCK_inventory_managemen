import Home from "@/pages/Home";
import NotFound from "@/pages/others/NotFound";
import CreateVariant from "@/pages/products/CreateVariant";
import CreatreProduct from "@/pages/products/CreatreProduct";
import Products from "@/pages/products/Products";

import CreateSeller from "@/pages/user/CreateSeller";
import Users from "@/pages/user/Users";
import { Route, Routes } from "react-router-dom";

import AddStockHistory from "@/pages/History/AddHistory";
import AdjustHistory from "@/pages/History/AdjustHistory";
import TransferedHistory from "@/pages/History/TransferedHistory";

import ChangePassword from "@/pages/auth/ChangePassword";
import AddBranch from "@/pages/branch/AddBranch";
import Branches from "@/pages/branch/Branches";
import Categories from "@/pages/categories/Categories";

import AddStock from "@/pages/stockManage/AddStock";
import AdjustStock from "@/pages/stockManage/AdjustStock";
import StockList from "@/pages/stockManage/StockList";
import StockTransfer from "@/pages/stockManage/StockTransfer";
import CreateBranchManager from "@/pages/user/CreateBranchManager";
import UpdateUser from "@/pages/user/update user/UpdateUser";

export const BranchManagerRoutes = () => {
    return (
        <Routes>
            <Route path="dashboard" element={<Home />} />
            <Route path="users" element={<Users />} />
            <Route path="update-user" element={<UpdateUser />} />
            {/* <Route path="create-product" element={<CreatreProduct />} /> */}
            <Route path="products" element={<Products />} />
            <Route path="create-seller" element={<CreateSeller />} />

            {/* <Route
                path="create-variant/:productId"
                element={<CreateVariant />}
            /> */}

            <Route path="add-stock" element={<AddStock />} />
            <Route path="stock-list" element={<StockList />} />
            <Route path="adjust-stock" element={<AdjustStock />} />
            <Route path="stock-transfer" element={<StockTransfer />} />

            {/* <Route path="add-branch" element={<AddBranch />} /> */}

            <Route path="add-history" element={<AddStockHistory />} />
            <Route path="adjust-history" element={<AdjustHistory />} />
            <Route path="transfer-history" element={<TransferedHistory />} />

            <Route path="create-seller" element={<CreateSeller />} />
            {/* <Route path="categories" element={<Categories />} /> */}
            <Route path="change-password" element={<ChangePassword />} />
            <Route path="*" element={<NotFound />} />
        </Routes>
    );
};
