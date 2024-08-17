/* eslint-disable @typescript-eslint/no-explicit-any */
import { useGetuserByIdQuery } from "@/redux/api/userApi";
import { useLocation } from "react-router-dom";
import { Spinner } from "@/components/ui/Spinner";
import { userRole } from "@/constants/user";
import UpdateSeller from "./UpdateSeller";
import UpdateBranchManager from "./UpdateBranchManager";
import UpdateAdmin from "./UpdateAdmin";


const UpdateUser = () => {
    const { state } = useLocation();
    const userId = state?.params;

    const { data, isLoading } = useGetuserByIdQuery(userId) as any;

    if (isLoading) return <Spinner label="Loading..." />;

    const role = data?.data?.role;

    if (role === userRole.SELLER) {
        return <UpdateSeller userData={data?.data} />;
    } else if (role === userRole.BRANCH_MANAGER) {
        return <UpdateBranchManager userData={data?.data} />;
    } else if (role === userRole.ADMIN) {
        return <UpdateAdmin userData={data?.data} />;
    }

    return <div>Unknown user role</div>;
};

export default UpdateUser;
