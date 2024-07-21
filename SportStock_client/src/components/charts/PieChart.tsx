import { TrendingUp } from "lucide-react";
import { Pie, PieChart } from "recharts";

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    ChartConfig,
    ChartContainer,
    ChartLegend,
    ChartLegendContent,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart";
import { primary } from "@/constants/colors";
import { useGetStockPieChartQuery } from "@/redux/api/stockApi";

const orderedPrimaryShades = [
    primary[900],
    primary[800],
    primary[700],
    primary[600],
    primary[500],
    primary[400],
    primary[300],
    primary[200],
    primary[100],
    primary[50],
];

export function PieCrtCategory() {
    const { data, isLoading } = useGetStockPieChartQuery(undefined);
    if (isLoading) {
        return <div>Loading stock data...</div>;
    }

    const chartData = data?.data?.map((item, index) => ({
        label: item.category,
        value: item.totalQuantity,
        fill: orderedPrimaryShades[index % orderedPrimaryShades.length],
    }));

    const chartConfig: ChartConfig =
        chartData?.length > 0 &&
        chartData?.reduce((config, item, index) => {
            config[item.label] = {
                label:
                    item?.label?.charAt(0).toUpperCase() +
                    item?.label?.slice(1),
                color: orderedPrimaryShades[
                    index % orderedPrimaryShades.length
                ],
            };
            return config;
        }, {});

    return (
        <Card className="flex flex-col bg-inherit border-0 shadow-none ">
            <CardTitle className="text-center  pb-6 text-slate-600 text-xl">
                Stocks Per Category
            </CardTitle>
            {/* <CardDescription>January - June 2024</CardDescription> */}

            <CardContent className="flex-1 pb-0 px-0">
                <ChartContainer
                    config={chartConfig}
                    className="w-full mx-auto aspect-square max-h-[350px] pb-0 [&_.recharts-pie-label-text]:fill-foreground"
                >
                    <PieChart className=" w-full">
                        <ChartTooltip
                            content={<ChartTooltipContent hideLabel />}
                        />
                        <Pie
                            data={chartData}
                            dataKey="value"
                            label
                            nameKey="label"
                        />

                        <ChartLegend
                            content={<ChartLegendContent nameKey="label" />}
                            className="-translate-y-2 w-full flex-wrap  gap-2 [&>*]:basis-1/4 [&>*]:justify-center"
                        />
                    </PieChart>
                </ChartContainer>
            </CardContent>
        </Card>
    );
}
