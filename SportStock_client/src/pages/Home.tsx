import { HomeCard } from "@/components/cards/HomeCard";
import { userRole } from "@/constants/user";
import { useGetDashboardMetaQuery } from "@/redux/features/product/productApi";
import { useCurrentUser } from "@/redux/Hooks";
import {
    DollarSign,
    PackageIcon,
    ShoppingBag,
    ShoppingCart,
} from "lucide-react";

const Home = () => {
    const user = useCurrentUser();

    const { data } = useGetDashboardMetaQuery(undefined);
    const metaData = data?.data;

    return (
        // <div className="h-full w-full flex justify-center items-center ">
        <div className="flex justify-between gap-4">
            <HomeCard
                title="Total Products (Unique)"
                value={metaData?.totalProducts}
                icon={<ShoppingBag size={30} />}
                subtext="5 products added this week"
            />
            <HomeCard
                title="Total Quantity"
                icon={<ShoppingCart size={30} />}
                subtext="5 items increased since last week"
                value={metaData?.totalQuantity}
            />
            <HomeCard
                title="Total Stock value"
                icon={<DollarSign size={30} />}
                subtext="5% increased since last week"
                value={metaData?.totalStockValue}
            />
            {/* <HomeCard /> */}
            {/* <h3>
                WELCOME TO <span className="uppercase">{role}</span> DASHBOARD
            </h3> */}
        </div>
    );
};

export default Home;
