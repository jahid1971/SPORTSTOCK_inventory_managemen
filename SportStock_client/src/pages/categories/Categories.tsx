import CreateCategory from "@/components/product/createCategory";
import DataTable from "@/components/table/DataTable";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { useGetAllCategoriesQuery } from "@/redux/features/product/productApi";
import { TQueryParam } from "@/types/global.types";
import { useState } from "react";
import { PiPlusBold, PiPlusCircleBold } from "react-icons/pi";

const Categories = () => {
    const [params, setParams] = useState<TQueryParam[]>([]);
    const { data, isFetching } = useGetAllCategoriesQuery(undefined);
    const categories = data?.data;
    console.log("categories", categories);

    const categoryData = categories?.map((category) => ({
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
                <Button>
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
                rowData={categoryData}
                columnDefs={columnDefs}
                isFetching={isFetching}
                // handleSelectedRows={handleSelectedRows}
                params={params}
                setParams={setParams}
                filterable={true}
                // filters={filters}
                createButton={createButton}
            />
        </div>
    );
};

export default Categories;
