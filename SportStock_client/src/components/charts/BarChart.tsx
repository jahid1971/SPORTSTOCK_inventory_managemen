import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

import {
    ChartConfig,
    ChartContainer,
    ChartLegend,
    ChartLegendContent,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart";
import { primary } from "@/constants/colors";
import { useGetStocksBarChartQuery } from "@/redux/api/stockApi";

const chartConfig = {
    totalQuantity: {
        label: "Total Quantity: ",
        color: primary[500],
    },
    totalPrice: {
        label: "Total Price: ",
        color: primary[200],
    },
} satisfies ChartConfig;

export function Barchart() {
    const { data, isLoading }:any = useGetStocksBarChartQuery(undefined);
    if (isLoading) return <div>Loading...</div>;
    
    const barChartData = data?.data?.map((item:any) => ({
        ...item,

        totalPrice: item.totalPrice / 1000,
    }));
  
    return (
        <div className="w-full ">
            <h5 className="text-slate-600 text-xl font-semibold text-center">
                Stocks Per Branch
            </h5>
            <ChartContainer
                config={chartConfig}
                className="min-h-[350px] w-full"
            >
                <BarChart accessibilityLayer data={barChartData}>
                    <CartesianGrid vertical={false} />
                    <XAxis
                        dataKey="branchName"
                        tickLine={false}
                        tickMargin={10}
                        axisLine={false}
                        tickFormatter={(value) => value.slice(0, 3)}
                    />
                    <ChartTooltip
                        content={
                            <ChartTooltipContent
                                customValue={(value, name) =>
                                    String(name) === "totalPrice"
                                        ? `${value}K`
                                        : value
                                }
                            />
                        }
                    />
                    <ChartLegend content={<ChartLegendContent />} />
                    <Bar
                        dataKey="totalQuantity"
                        fill="var(--color-totalQuantity)"
                        radius={4}
                    />
                    <Bar
                        dataKey="totalPrice"
                        fill="var(--color-totalPrice)"
                        radius={4}
                    />
                </BarChart>
            </ChartContainer>
        </div>
    );
}
