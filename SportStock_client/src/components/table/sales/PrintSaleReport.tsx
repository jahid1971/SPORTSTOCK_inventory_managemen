/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import React, { useRef } from "react";
import ReactToPrint from "react-to-print";

const PrintableSaleReport = React.forwardRef<HTMLDivElement, { data: any }>(({ data }, ref) => (
    <div ref={ref} className="p-8 bg-white">
        <h1 className="text-3xl font-bold text-center mb-8">Sale Report</h1>
        <table className="min-w-full divide-y divide-gray-200 mb-8">
            <thead className="bg-gray-50">
                <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Field
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Details
                    </th>
                </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
                <tr>
                    <td className="px-6 py-4 whitespace-nowrap font-bold">Sale Id</td>
                    <td className="px-6 py-4 whitespace-nowrap">{data?.saleId}</td>
                </tr>
                <tr>
                    <td className="px-6 py-4 whitespace-nowrap font-bold">Product Name</td>
                    <td className="px-6 py-4 whitespace-nowrap">{data?.productName}</td>
                </tr>
                <tr>
                    <td className="px-6 py-4 whitespace-nowrap font-bold">Sold By</td>
                    <td className="px-6 py-4 whitespace-nowrap">{data?.saleData?.soldBy?.sellerName}</td>
                </tr>
                <tr>
                    <td className="px-6 py-4 whitespace-nowrap font-bold">Buyer Name</td>
                    <td className="px-6 py-4 whitespace-nowrap">{data?.buyerName}</td>
                </tr>
                <tr>
                    <td className="px-6 py-4 whitespace-nowrap font-bold">Quantity</td>
                    <td className="px-6 py-4 whitespace-nowrap">{data?.quantity}</td>
                </tr>
                <tr>
                    <td className="px-6 py-4 whitespace-nowrap font-bold">Total Price</td>
                    <td className="px-6 py-4 whitespace-nowrap">{data?.totalPrice}</td>
                </tr>
                <tr>
                    <td className="px-6 py-4 whitespace-nowrap font-bold">Branch</td>
                    <td className="px-6 py-4 whitespace-nowrap">{data?.branch}</td>
                </tr>
                <tr>
                    <td className="px-6 py-4 whitespace-nowrap font-bold">Sale Date</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                        {data ? new Date(data.saleDate).toLocaleDateString() : ""}
                    </td>
                </tr>
            </tbody>
        </table>
        <div className="mt-8">
            <h2 className="text-2xl font-bold mb-4">Summary</h2>
            <div className="border-t border-gray-300 pt-4">
                <p className="text-lg">
                    <span className="font-bold">Total Items:</span> {data?.quantity}
                </p>
                <p className="text-lg">
                    <span className="font-bold">Total Amount:</span> ${data?.totalPrice}
                </p>
            </div>
        </div>
        <div className="mt-8 text-center">
            <p className="text-sm text-gray-600">Thank you for your business!</p>
        </div>
    </div>
));

const DownLoadSaleReport = ({ data }: { data: any }) => {
    const componentRef = useRef<HTMLDivElement>(null);

    return (
        <div className="">
            <ReactToPrint
                trigger={() => (
                    <Button className="bg-primary/10 p-1 px-2 font-normal" variant="outline" size={"xsm"}>
                        Print
                    </Button>
                )}
                content={() => componentRef.current}
            />
            <div className="">
                <PrintableSaleReport ref={componentRef} data={data} />
            </div>
        </div>
    );
};

export default DownLoadSaleReport;
