import { HomeCard } from "@/components/cards/HomeCard";
import { Barchart } from "@/components/charts/BarChart";
import { userRole } from "@/constants/user";
import {
    useGetDashboardMetaQuery,
    useGetStockAvailabilityQuery,
} from "@/redux/features/product/productApi";
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
    const { data: stockAvailability } = useGetStockAvailabilityQuery(undefined);
    const metaData = data?.data;
    const stockData = stockAvailability?.data;

    console.log("stockData", stockData);

    return (
        // <div className="h-full w-full flex justify-center items-center ">
        <div>
            <div className="flex justify-between gap-4">
                <HomeCard
                    title="Total Products"
                    value={metaData?.totalProducts}
                    icon={<ShoppingBag size={30} />}
                    subtext={`${metaData?.addedProducts} products added this week`}
                />
                <HomeCard
                    title="Total Stock Items"
                    icon={<ShoppingCart size={30} />}
                    subtext={`${metaData?.addedQuantity} item added this week`}
                    value={metaData?.totalQuantity}
                />
                <HomeCard
                    title="Total Stock value"
                    icon={<DollarSign size={30} />}
                    subtext={`$${metaData?.addedStockValue}  stock value added this week`}
                    value={metaData?.totalStockValue}
                />
            </div>
            <div>
                <Barchart chartData={stockData} />
            </div>
        </div>
    );
};

export default Home;
