/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useRef } from "react";
import { AgGridReact } from "@ag-grid-community/react"; // React Grid Logic
import "@ag-grid-community/styles/ag-grid.css"; // Core CSS
import "@ag-grid-community/styles/ag-theme-quartz.css"; // Theme

import { ColDef, ModuleRegistry } from "@ag-grid-community/core";
import { ClientSideRowModelModule } from "@ag-grid-community/client-side-row-model";

import { loadingOverlayComponent } from "@/components/table/tableLoader/LoadingOverlay";
import { noRowsOverlayComponent } from "@/components/table/tableLoader/NoRowsOverlay";

ModuleRegistry.registerModules([ClientSideRowModelModule]);

const DataTable = ({
    rowData,
    columnDefs,
    isFetching,
}: {
    rowData: any[];
    columnDefs: ColDef[];
    isFetching: boolean;
}) => {
    const gridRef = useRef<AgGridReact>(null);

    const defaultColDef: ColDef = {
        flex: 1,
    };

    useEffect(() => {
        setTimeout(() => {
            if (isFetching) gridRef.current?.api?.showLoadingOverlay();
            else if (!isFetching && !rowData?.length) gridRef.current!.api?.showNoRowsOverlay();
            else gridRef.current?.api?.hideOverlay();
        });
    }, [gridRef, isFetching, rowData?.length]);


    return (
        <div className="ag-theme-quartz ">
            <AgGridReact
                ref={gridRef}
                rowData={rowData}
                columnDefs={columnDefs}
                defaultColDef={defaultColDef}
                domLayout="autoHeight"
                loadingOverlayComponent={loadingOverlayComponent}
                noRowsOverlayComponent={noRowsOverlayComponent}
            />
        </div>
    );
};

export default DataTable;
