import React, { useState } from "react";
import ReactPaginate from "react-paginate";

export const MyPagination = ({ metaData, setPage, params, setParams }) => {
    const totalPages = Math.ceil(metaData?.totalPages);

    const handlePageChange = (selected) => {
        const updatedParams = params.filter((param) => param.name !== "page");
        updatedParams.push({ name: "page", value: selected.selected + 1 });
        setParams(updatedParams);
    };

    return (
        <ReactPaginate
            previousLabel={"Previous"}
            nextLabel={"Next"}
            breakLabel={"..."}
            pageCount={totalPages}
            marginPagesDisplayed={1}
            pageRangeDisplayed={4}
            onPageChange={handlePageChange}
            containerClassName={"pagination flex justify-center items-center mt-4"}
            activeClassName={"border border-primary py-1"}
            previousClassName={"px-3 py-1 bg-primary-400 text-white rounded-full mr-2"}
            nextClassName={"px-3 py-1 bg-primary-400 text-white  rounded-full ml-2"}
            pageClassName={"mx-1"}
            pageLinkClassName={" px-3 py-1  hover:border border-primary text-base text-primary"}
            breakClassName={"mx-1"}
            forcePage={metaData?.page - 1}
        />
    );
};
