/* eslint-disable react-hooks/rules-of-hooks */
import { HomeCard } from "@/components/cards/HomeCard";
import { Barchart } from "@/components/charts/BarChart";

import { PieCrtCategory } from "@/components/charts/PieChart";
import { StocksLineChart } from "@/components/charts/StocksLineChart";
import { userRole } from "@/constants/user";

import { useGetDashboardCardsQuery } from "@/redux/api/stockApi";
import { useCurrentUser } from "@/redux/Hooks";
import {
    DollarSign,
    PackageIcon,
    ShoppingBag,
    ShoppingCart,
} from "lucide-react";
import AdjustStock from "./stockManage/AdjustStock";

const Home = () => {
    const user = useCurrentUser();

    if (user?.role === userRole.SELLER) return <AdjustStock />; //only for .......................seller .........................................

    const { data } = useGetDashboardCardsQuery(undefined);

    console.log(data, "dashboard cards data");

    const cardData = data?.data;

    return (
        <div className="bg-white p-4">
            <div className="flex justify-between gap-4">
                <HomeCard
                    title="Total Products"
                    value={cardData?.totalProducts}
                    icon={<ShoppingBag size={30} />}
                    // subtext={`${cardData?.totalProducts} products added this week`}
                />
                <HomeCard
                    title="Total Stock Items"
                    icon={<ShoppingCart size={30} />}
                    // subtext={`${cardData?.totalStocks} item added this week`}
                    value={cardData?.totalStockItems}
                />
                <HomeCard
                    title="Total Stock value"
                    icon={<DollarSign size={30} />}
                    // subtext={`$${cardData?.totalStockValue}  stock value added this week`}
                    value={cardData?.totalStockValue}
                />
            </div>

            <div className="flex justify-between gap-4 mt-14">
                {user?.role === userRole.ADMIN ||
                    (user?.role === userRole.SUPER_ADMIN && (
                        <div className="w-7/12">
                            <Barchart />
                        </div>
                    ))}
                <div className="w-5/12 mx-auto">
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
