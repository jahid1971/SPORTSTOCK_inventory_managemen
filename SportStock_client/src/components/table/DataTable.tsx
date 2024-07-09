/* eslint-disable @typescript-eslint/no-explicit-any */
// /* eslint-disable @typescript-eslint/no-explicit-any */
// import { useEffect, useMemo, useRef } from "react";
// import { AgGridReact } from "@ag-grid-community/react"; // React Grid Logic
// import "@ag-grid-community/styles/ag-grid.css"; // Core CSS
// import "@ag-grid-community/styles/ag-theme-quartz.css"; // Theme

// import { ColDef, ModuleRegistry } from "@ag-grid-community/core";
// import { ClientSideRowModelModule } from "@ag-grid-community/client-side-row-model";

// import { loadingOverlayComponent } from "@/components/table/tableLoader/LoadingOverlay";
// import { noRowsOverlayComponent } from "@/components/table/tableLoader/NoRowsOverlay";

// ModuleRegistry.registerModules([ClientSideRowModelModule]);

// const DataTable = ({
//     rowData,
//     columnDefs,
//     isFetching,
//     handleSelectedRows,
// }: {
//     rowData: any[];
//     columnDefs: ColDef[];
//     isFetching: boolean;
//     handleSelectedRows?: (selectedRows: any) => void;
// }) => {
//     const gridRef = useRef<AgGridReact>(null);

//     const defaultColDef = useMemo(() => {
//         return {
//             flex: 1,
//         };
//     }, []);

//     useEffect(() => {
//         setTimeout(() => {
//             if (isFetching && gridRef.current?.api) gridRef.current.api.showLoadingOverlay();
//             else if (!isFetching && !rowData?.length && gridRef.current?.api)
//                 gridRef.current.api.showNoRowsOverlay();
//             else if (gridRef.current?.api) gridRef.current.api.hideOverlay();
//         });
//     }, [gridRef, isFetching, rowData?.length]);

//     // const onSelectionChanged = () => {
//     //     const selectedNodes = gridRef.current?.api?.getSelectedNodes();
//     //     const selectedData =  selectedNodes?.map( item => item.data  )
//     //     handleSelectedRows(selectedData);
//     // };

//     const onSelectionChanged = () => {
//         const selectedNodes = gridRef.current?.api?.getSelectedNodes();
//         const selectedData = selectedNodes?.map((item) => item.data);
//         handleSelectedRows && handleSelectedRows(selectedData);
//     };

//     return (
//         <div className="ag-theme-quartz ">
//             <AgGridReact
//                 ref={gridRef}
//                 rowData={rowData}
//                 columnDefs={columnDefs}
//                 defaultColDef={defaultColDef}
//                 domLayout="autoHeight"
//                 loadingOverlayComponent={loadingOverlayComponent}
//                 noRowsOverlayComponent={noRowsOverlayComponent}
//                 rowSelection={"multiple"}
//                 suppressRowClickSelection={true}
//                 onSelectionChanged={onSelectionChanged}
//             />
//         </div>
//     );
// };

// export default DataTable;



import { useCallback, useEffect, useMemo, useRef, useState } from "react";
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
    handleSelectedRows,
}: {
    rowData: any[];
    columnDefs: ColDef[];
    isFetching: boolean;
    handleSelectedRows?: (selectedRows: any) => void;
}) => {
    const gridRef = useRef<AgGridReact>(null);

    const defaultColDef = useMemo(() => {
        return {
            flex: 1,
        };
    }, []);

    useEffect(() => {
        setTimeout(() => {
            if (isFetching && gridRef.current?.api) gridRef.current.api.showLoadingOverlay();
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
            gridApi.addEventListener('selectionChanged', onSelectionChanged);

            return () => {
                gridApi.removeEventListener('selectionChanged', onSelectionChanged);
            };
        }
    }, [gridApi, onSelectionChanged]);

    const onGridReady = useCallback((params: any) => {
        setGridApi(params.api);
    }, []);

    return (
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
    );
};

export default DataTable;
