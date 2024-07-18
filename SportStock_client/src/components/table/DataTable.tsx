import React, {
    useCallback,
    useEffect,
    useMemo,
    useRef,
    useState,
} from "react";
import { AgGridReact } from "@ag-grid-community/react"; // React Grid Logic
import "@ag-grid-community/styles/ag-grid.css"; // Core CSS
import "@ag-grid-community/styles/ag-theme-quartz.css"; // Theme

import { ColDef, ModuleRegistry } from "@ag-grid-community/core";
import { ClientSideRowModelModule } from "@ag-grid-community/client-side-row-model";

import { loadingOverlayComponent } from "@/components/table/tableLoader/LoadingOverlay";
import { noRowsOverlayComponent } from "@/components/table/tableLoader/NoRowsOverlay";
import SearchInput from "./SearchInput";
import { Button } from "../ui/button";
import { RiFilterLine } from "react-icons/ri";
import { X } from "lucide-react";
import styles from "./table.module.css";
import { CustomPagination } from "../others/Pagination";

ModuleRegistry.registerModules([ClientSideRowModelModule]);

const DataTable = ({
    rowData,
    columnDefs,
    isFetching,
    handleSelectedRows,
    params,
    setParams,
    searchField = true,
    filterable,
    createButton,
    filters,
    checkedRowsActionBtn,
    title,
    metaData,
}: {
    rowData: any[];
    columnDefs: ColDef[];
    isFetching: boolean;
    handleSelectedRows?: (selectedRows: any) => void;
    searchField?: boolean;
    filterable?: boolean;
    params?: any;
    setParams?: (params: any) => void;
    createButton?: React.ReactNode;
    filters?: React.ReactNode;
    checkedRowsActionBtn?: React.ReactNode;
    title: string;
    metaData?: any;
}) => {
    const gridRef = useRef<AgGridReact>(null);
    const [showFilters, setShowFilters] = useState(false);
    const [selectedRows, setSelectedRows] = useState<any[]>([]);

    const defaultColDef = useMemo(() => {
        return {
            flex: 1,
        };
    }, []);

    console.log(params, "params");

    useEffect(() => {
        setTimeout(() => {
            if (isFetching && gridRef.current?.api)
                gridRef.current.api.showLoadingOverlay();
            else if (!isFetching && !rowData?.length && gridRef.current?.api)
                gridRef.current.api.showNoRowsOverlay();
            else if (gridRef.current?.api) gridRef.current.api.hideOverlay();
        });
    }, [isFetching, rowData?.length]);

    const [gridApi, setGridApi] = useState<any>(null);

    const onSelectionChanged = useCallback(() => {
        const selectedNodes = gridApi.getSelectedNodes();

        const selectedData = selectedNodes.map((item: any) => item.data);

        setSelectedRows(selectedData);
        handleSelectedRows && handleSelectedRows(selectedData);
    }, [gridApi, handleSelectedRows]);

    useEffect(() => {
        if (gridApi) {
            gridApi.addEventListener("selectionChanged", onSelectionChanged);

            const getSelectedRows = gridApi.getSelectedRows();
            if (getSelectedRows?.length === 0) setSelectedRows([]);

            return () => {
                gridApi.removeEventListener(
                    "selectionChanged",
                    onSelectionChanged
                );
            };
        }
    }, [gridApi, onSelectionChanged]);

    const onGridReady = useCallback((params: any) => {
        setGridApi(params.api);
    }, []);

    return (
        <div>
            {(title || createButton) && (
                <div className="flex items-center justify-between mb-2 bg-slate-200 p-2 px-5 md:px-10 shadow-md absolute top-0 left-0  right-0">
                    <h5 className="text-lg font-semibold text-primary ">
                        {title}
                    </h5>
                    {createButton}
                </div>
            )}

            <div
                className={`flex items-center  gap-2 flex-wrap ${
                    (title || createButton) && `mt-10`
                }`}
            >
                {searchField && (
                    <SearchInput params={params} setParams={setParams} />
                )}
                {filterable && (
                    <Button
                        className=""
                        variant={showFilters ? "default" : "outline"}
                        onClick={() => setShowFilters(!showFilters)}
                        size={"xsm"}
                    >
                        <RiFilterLine className=" mr-1" />
                        Filter
                    </Button>
                )}
                <span
                    className={` transform transition-transform duration-300 ease-in-out ${
                        showFilters
                            ? "translate-x-0"
                            : "absolute left-0 -translate-x-full"
                    }`}
                >
                    {filters}
                </span>
                {params?.length > 0 && (
                    <Button
                        size={"xsm"}
                        variant={"outline"}
                        className="text-red-500"
                        onClick={() => setParams && setParams([])}
                    >
                        <X size={20} className="mr-1" /> RESET
                    </Button>
                )}
            </div>

            {checkedRowsActionBtn && (
                <div
                    className={`mb-2 transform transition-transform duration-300 ease-in-out ${
                        selectedRows?.length > 0
                            ? "translate-x-0"
                            : "absolute left-0 -translate-x-full"
                    }`}
                >
                    {checkedRowsActionBtn}
                </div>
            )}

            <div className={`ag-theme-quartz ${styles.noBorders} my-3`}>
                <AgGridReact
                    ref={gridRef}
                    rowData={rowData}
                    columnDefs={columnDefs}
                    defaultColDef={defaultColDef}
                    domLayout="autoHeight"
                    loadingOverlayComponent={loadingOverlayComponent}
                    noRowsOverlayComponent={noRowsOverlayComponent}
                    rowSelection={"multiple"}
                    suppressRowClickSelection={true}
                    onGridReady={onGridReady}
                />
            </div>

            {metaData?.total > 5 && setParams && (
                <CustomPagination
                    metaData={metaData}
                    params={params}
                    setParams={setParams}
                />
            )}
        </div>
    );
};

export default DataTable;
