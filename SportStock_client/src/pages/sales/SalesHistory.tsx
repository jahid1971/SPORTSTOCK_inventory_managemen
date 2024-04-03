import React, { useMemo, useState } from "react";
import LineChart from "@/components/charts/LineChart";
import { useGetSalesHistoryQuery } from "@/redux/features/sale/SaleApi";
import { Spinner } from "@/components/ui/Spinner";

const SalesHistory = () => {
    const [selectedView, setSelectedView] = useState("daily");
    const [params, setParams] = useState<{ name: string; value: any }[]>([
        {
            name: "saleHistoryBy",
            value: "daily",
        },
    ]);

    const { data, isFetching } = useGetSalesHistoryQuery(params);

    const salesData = data?.data;

    return (
        <div className="min-h-screen bg-gray-100 p-8">
            <div className="flex justify-center mb-8">
                <div className="flex space-x-4">
                    {["daily", "weekly", "monthly", "yearly"].map((view) => (
                        <button
                            key={view}
                            onClick={() => {
                                setSelectedView(view);
                                setParams([{ name: "saleHistoryBy", value: view }]);
                            }}
                            className={`px-4 py-2 rounded-lg font-semibold ${
                                selectedView === view
                                    ? "bg-primary-400 text-white"
                                    : "bg-white text-primary-400 border border-primary-400"
                            }`}>
                            {view.charAt(0).toUpperCase() + view.slice(1)}
                        </button>
                    ))}
                </div>
            </div>
            <div className="flex flex-col items-center gap-8">
                {isFetching ? (
                    <Spinner label="Please wait..." />
                ) : (
                    <div className="w-full h-96 flex justify-center">
                        <LineChart
                            data={salesData.sales}
                            labels={salesData.labels}
                            title={`${selectedView.charAt(0).toUpperCase() + selectedView.slice(1)} Sales`}
                        />
                    </div>
                )}
            </div>
        </div>
    );
};

export default SalesHistory;
