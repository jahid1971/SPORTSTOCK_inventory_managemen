import AddStockHistory from "@/pages/History/AddHistory";
import AdjustHistory from "@/pages/History/AdjustHistory";
import TransferedHistory from "@/pages/History/TransferedHistory";

import Home from "@/pages/Home";
import ChangePassword from "@/pages/auth/ChangePassword";
import AddBranch from "@/pages/branch/AddBranch";
import Branches from "@/pages/branch/Branches";
import Categories from "@/pages/categories/Categories";
import NotFound from "@/pages/others/NotFound";
import CreateVariant from "@/pages/products/CreateVariant";
import CreatreProduct from "@/pages/products/CreatreProduct";
import Products from "@/pages/products/Products";
import UpdateProduct from "@/pages/products/UpdateProduct";
import AddStock from "@/pages/stockManage/AddStock";
import AdjustStock from "@/pages/stockManage/AdjustStock";
import StockList from "@/pages/stockManage/StockList";
import StockTransfer from "@/pages/stockManage/StockTransfer";
import CreateBranchManager from "@/pages/user/CreateBranchManager";
import CreateSeller from "@/pages/user/CreateSeller";
import Users from "@/pages/user/Users";
import UpdateUser from "@/pages/user/update user/UpdateUser";
import { Route, Routes } from "react-router-dom";

export const AdminRoutes = () => {
    return (
        <Routes>
            <Route path="dashboard" element={<Home />} />
            <Route path="users" element={<Users />} />
            <Route path="update-user" element={<UpdateUser />} />
            <Route path="create-product" element={<CreatreProduct />} />
            <Route
                path="create-variant/:productId"
                element={<CreateVariant />}
            />
            <Route path="products" element={<Products />} />

            <Route
                path="update-product/:productId"
                element={<UpdateProduct />}
            />

            <Route path="add-stock" element={<AddStock />} />
            <Route path="stock-list" element={<StockList />} />
            <Route path="adjust-stock" element={<AdjustStock />} />
            <Route path="stock-transfer" element={<StockTransfer />} />

            <Route path="add-branch" element={<AddBranch />} />

            <Route path="add-history" element={<AddStockHistory />} />
            <Route path="adjust-history" element={<AdjustHistory />} />
            <Route path="transfer-history" element={<TransferedHistory />} />

            <Route
                path="create-branch-manager"
                element={<CreateBranchManager />}
            />
            <Route path="create-seller" element={<CreateSeller />} />
            <Route path="categories" element={<Categories />} />
            <Route path="branches" element={<Branches />} />
            <Route path="change-password" element={<ChangePassword />} />
            <Route path="*" element={<NotFound />} />
        </Routes>
    );
};
