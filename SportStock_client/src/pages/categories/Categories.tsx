import CreateCategory from "@/components/product/createCategory";
import DataTable from "@/components/table/DataTable";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { useGetAllCategoriesQuery } from "@/redux/api/productApi";
import { TQueryParam } from "@/types/global.types";
import { TCategory } from "@/types/product";
import { tableSerial } from "@/utls/utls";
import { useState } from "react";
import { PiPlusBold } from "react-icons/pi";

const Categories = () => {
    const [params, setParams] = useState<TQueryParam[]>([]);
    const { data, isFetching } = useGetAllCategoriesQuery(undefined) as any;
    const categories = data?.data;

    const categoryData = categories?.map((category: TCategory, i: number) => ({
        sl: tableSerial(params, i),
        id: category._id,
        category: category.category,
        status: category.status,
    }));

    const columnDefs = [
        { field: "category", headerName: "Category" },
        { field: "status", headerName: "Status" },
    ];

    const createButton = (
        <Dialog>
            <DialogTrigger asChild>
                <Button size={"xsm"}>
                    <div className="flex items-center gap-1">
                        <PiPlusBold />
                        Create Category
                    </div>
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <CreateCategory />
            </DialogContent>
        </Dialog>
    );
    return (
        <div>
            <DataTable
                title="Categories"
                rowData={categoryData}
                columnDefs={columnDefs}
                isFetching={isFetching}
                params={params}
                setParams={setParams}
                createButton={createButton}
                serial={true}
                searchField={false}
            />
        </div>
    );
};

export default Categories;
