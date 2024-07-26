import { userRole } from "@/constants/user";

import UpdateSeller from "./UpdateSeller";
import { useLocation } from "react-router-dom";
import { useGetuserByIdQuery } from "@/redux/api/userApi";
import { Spinner } from "@/components/ui/Spinner";

const UpdateUser = () => {
    const { state } = useLocation();
    const userId = state?.params;

    const { data } = useGetuserByIdQuery(userId);

    if (!data) return <Spinner label="Please wait..." />;

    const userData = data?.data;

    if (userData?.role === userRole.SELLER)
        return <UpdateSeller userData={userData} />;
};

export default UpdateUser;
