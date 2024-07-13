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
}) => {
    const gridRef = useRef<AgGridReact>(null);
    const [showFilters, setShowFilters] = useState(false);

    const defaultColDef = useMemo(() => {
        return {
            flex: 1,
        };
    }, []);

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
        handleSelectedRows && handleSelectedRows(selectedData);
    }, [gridApi, handleSelectedRows]);

    useEffect(() => {
        if (gridApi) {
            gridApi.addEventListener("selectionChanged", onSelectionChanged);

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
            <div className="mb-2 flex justify-between  gap gap-2">
                <div className="flex items-center  gap-2 flex-wrap">
                    {searchField && (
                        <SearchInput params={params} setParams={setParams} />
                    )}
                    {filterable && (
                        <Button
                            className=""
                            variant={showFilters ? "default" : "outline"}
                            onClick={() => setShowFilters(!showFilters)}
                        >
                            <RiFilterLine className="w-4 h-4 mr-1" />
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
                </div>

                {createButton}
            </div>

            <div className="ag-theme-quartz">
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
        </div>
    );
};

export default DataTable;
