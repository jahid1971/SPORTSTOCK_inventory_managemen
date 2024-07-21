import { HomeCard } from "@/components/cards/HomeCard";
import { Barchart } from "@/components/charts/BarChart";

import { PieCrtCategory } from "@/components/charts/PieChart";
import { StocksLineChart } from "@/components/charts/StocksLineChart";
import { userRole } from "@/constants/user";
import {
    useGetDashboardMetaQuery,
    useGetStockAvailabilityQuery,
} from "@/redux/api/productApi";
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

        <div className="bg-white p-4">
            <div className="flex justify-between gap-4">
                <HomeCard
                    title="Total Products"
                    value={metaData?.totalProducts}
                    icon={<ShoppingBag size={30} />}
                    // subtext={`${metaData?.totalProducts} products added this week`}
                />
                <HomeCard
                    title="Total Stock Items"
                    icon={<ShoppingCart size={30} />}
                    // subtext={`${metaData?.totalStocks} item added this week`}
                    value={metaData?.totalStocks}
                />
                <HomeCard
                    title="Total Stock value"
                    icon={<DollarSign size={30} />}
                    // subtext={`$${metaData?.totalStockValue}  stock value added this week`}
                    value={metaData?.totalStockValue}
                />
            </div>

            <div className="flex justify-between gap-4 mt-14">
                <div className="w-7/12">
                    <Barchart />
                </div>
                <div className="w-5/12">
                    <PieCrtCategory />
                </div>
            </div>

            <div>
                <StocksLineChart />
            </div>
        </div>
    );
};

export default Home;
