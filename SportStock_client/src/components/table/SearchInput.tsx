import { useEffect, useState } from "react";
import { Input } from "../ui/input";
import { IoSearchOutline } from "react-icons/io5";

const SearchInput = ({ params, setParams }) => {
    const [searchValue, setSearchValue] = useState("");
    useEffect(() => {
        if (params.length < 1) setSearchValue("");
    }, [params]);

    const handleOnChange = (e) => {
        const updatedParams = params.filter((param) => param.name !== "searchTerm");
        updatedParams.push({ name: "searchTerm", value: e.target.value });
        setParams(updatedParams);
        setSearchValue(e.target.value);
    };

    return (
        <div className="relative w-64">
            <Input
                value={searchValue}
                onChange={(e) => handleOnChange(e)}
                className="pr-9"
                placeholder="Search"
            />
            <button className="absolute  border-l  right-0 top-0 ">
                <IoSearchOutline className=" size-5 rotate-90 text-muted-foreground m-2.5" />
            </button>
        </div>
    );
};

export default SearchInput;
