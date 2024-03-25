export const noRowsOverlayComponent = () => {
    return (
        <div
            role="presentation"
            className="ag-overlay-loading-center"
            style={{ backgroundColor: "#b4bebe", height: "9%" }}>
            <i className="far fa-frown" aria-live="polite" aria-atomic="true">
                No Data Found
            </i>
        </div>
    );
};
