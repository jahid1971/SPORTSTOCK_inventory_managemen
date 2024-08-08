import { useState } from "react";
import { Line, LineChart, CartesianGrid, XAxis } from "recharts";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardDescription,
    CardFooter,
} from "@/components/ui/card";
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
    ChartLegend,
    ChartLegendContent,
} from "@/components/ui/chart";
import { useGetStockLineChartQuery } from "@/redux/api/stockApi";
import { primary } from "@/constants/colors";

const chartConfig: ChartConfig = {
    incoming: {
        label: "Incoming Stock",
        color: primary[500],
    },
    outgoing: {
        label: "Outgoing Stock",
        color: primary[200],
    },
};

const RANGE_OPTIONS = [
    { label: "Last Week", value: "lastWeek" },
    { label: "Last Month", value: "lastMonth" },
    { label: "Last Year", value: "lastYear" },
];

export function StocksLineChart() {
    const [range, setRange] = useState("lastWeek");
    const { data, isLoading } = useGetStockLineChartQuery([
        { name: "range", value: range },
    ]);
    if (isLoading) return <div>Loading...</div>;

    const chartData = data?.data || [];



    return (
        <Card className="my-10 border-l-0 border-b-0 border-r-0 shadow-sm">
            <CardHeader>
                <CardTitle>Stock Movement</CardTitle>
                <CardDescription>
                    Incoming and outgoing stocks over selected period
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="flex gap-2 mb-4">
                    {RANGE_OPTIONS.map((opt) => (
                        <button
                            key={opt.value}
                            className={`px-3 py-1 rounded border text-xs ${
                                range === opt.value
                                    ? "bg-primary text-white"
                                    : "bg-muted text-foreground"
                            }`}
                            onClick={() => setRange(opt.value)}
                        >
                            {opt.label}
                        </button>
                    ))}
                </div>
                {isLoading ? (
                    <div>Loading...</div>
                ) : (
                    <ChartContainer config={chartConfig} className="h-[400px] mx-auto">
                        <LineChart
                            accessibilityLayer
                            data={chartData as any}
                            margin={{ left: 12, right: 12 }}
                        >
                            <CartesianGrid vertical={false} />
                            <XAxis
                                dataKey="date"
                                tickLine={false}
                                axisLine={false}
                                tickMargin={8}
                                tickFormatter={(value) => value.slice(0, 7)}
                            />
                            <ChartTooltip content={<ChartTooltipContent />} />
                            <Line
                                dataKey="incoming"
                                type="monotone"
                                stroke="var(--color-incoming)"
                                strokeWidth={2}
                                dot={{
                                    fill: "var(--color-incoming)",
                                }}
                                activeDot={{
                                    r: 6,
                                }}
                            />
                            <Line
                                dataKey="outgoing"
                                type="monotone"
                                stroke="var(--color-outgoing)"
                                strokeWidth={2}
                                dot={{
                                    fill: "var(--color-incoming)",
                                }}
                                activeDot={{
                                    r: 6,
                                }}
                            />
                            <ChartLegend content={<ChartLegendContent />} />
                        </LineChart>
                    </ChartContainer>
                )}
            </CardContent>
            <CardFooter>
                <div className="text-xs text-muted-foreground">
                    {RANGE_OPTIONS.find((opt) => opt.value === range)?.label}{" "}
                    stock movement
                </div>
            </CardFooter>
        </Card>
    );
}
