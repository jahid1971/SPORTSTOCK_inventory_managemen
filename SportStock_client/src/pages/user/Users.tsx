import "@ag-grid-community/styles/ag-grid.css"; // Core CSS
import "@ag-grid-community/styles/ag-theme-quartz.css"; // Theme

import {
    ColDef,
    ICellRendererParams,
    ModuleRegistry,
} from "@ag-grid-community/core";
import { ClientSideRowModelModule } from "@ag-grid-community/client-side-row-model";
// import { UpdateButton } from "@/components/table/products/UpdateButton";
// import { UserDeleteButton } from "@/components/table/users/UserDeleteButton";
import { useGetAllUsersQuery } from "@/redux/api/userApi";
import DataTable from "@/components/table/DataTable";
import { TQueryParam } from "@/types/global.types";
import { UserDeleteButton } from "@/components/table/users/UserDeleteButton";
import { UpdateButton } from "@/components/table/products/UpdateButton";
import { defaultParams } from "@/constants/global.constant";
import UserDetailsModal from "@/components/user/UserDetailsModal";

import { useState } from "react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ChevronDown, EllipsisVertical, Pencil, Trash2 } from "lucide-react";
import { useGetAllBranchesQuery } from "@/redux/api/adminApi";
import FilterByOptions from "@/components/table/FilterByOptions";
import { userRole } from "@/constants/user";
import { useCurrentUser } from "@/redux/Hooks";
import { Dialog, DialogContent } from "@/components/ui/dialog";

ModuleRegistry.registerModules([ClientSideRowModelModule]);

interface IRow {
    id: string;
    fullName: string;
    role: number;
    status: boolean;
    branch: {
        branchName: string;
    };
    userPhoto: string;
}

const Users = () => {
    const [updateParams, setUpdateParams] = useState(null);
    const [deleteParams, setDeleteParams] = useState(null);
    const [viewDetailsUser, setViewDetailsUser] = useState<IRow | null>(null);

    const navigate = useNavigate();

    const user = useCurrentUser();

    const [params, setParams] = useState<TQueryParam[]>(defaultParams);

    const { data: branches } = useGetAllBranchesQuery(undefined);

    const { data, isFetching } = useGetAllUsersQuery(params);

    const colDefs: ColDef<IRow>[] = [
        {
            field: "userPhoto",
            headerName: "Photo",

            maxWidth: user?.role !== userRole.SELLER ? 100 : undefined,
            cellRenderer: (params: any) => {
                return params?.data?.userPhoto ? (
                    <img
                        src={params?.data?.userPhoto}
                        alt="product"
                        className="size-10"
                    />
                ) : undefined;
            },
        },
        { field: "fullName" },
        {
            field: "id",
            maxWidth: user?.role === userRole.BRANCH_MANAGER ? 200 : 120,
        },
        { field: "role", maxWidth: 120 },
        { field: "branch.branchName", headerName: "Branch", maxWidth: 150 },
        {
            field: "status",
            maxWidth: user?.role === userRole.BRANCH_MANAGER ? 150 : 100,
            cellRenderer: (params: any) => {
                return params?.data?.status === "active" ? (
                    <span className="text-green-500">ACTIVE</span>
                ) : (
                    <span className="text-red-500">BLOCKED</span>
                );
            },
        },

        {
            headerName: "Action",
            maxWidth: user?.role === userRole.BRANCH_MANAGER ? 150 : 120,
            cellStyle: { display: "flex", alignItems: "center" },
            cellRenderer: (params: ICellRendererParams) => {
                if (params?.data?.role === userRole.SUPER_ADMIN)
                    return (
                        <Button
                            onClick={() => setViewDetailsUser(params?.data)}
                            className="p-1 font-normal w-full"
                            variant="outline_primary"
                            size={"xsm"}
                        >
                            View Details
                        </Button>
                    );
                return (
                    <DropdownMenu>
                        <DropdownMenuTrigger>
                            <EllipsisVertical
                                className="cursor-pointer"
                                size={15}
                            />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuItem
                                onClick={() => {
                                    setTimeout(() => {
                                        setViewDetailsUser(params?.data);
                                    }, 100);
                                }}
                            >
                                <Button
                                    className="p-1 font-normal w-full"
                                    variant="outline_primary"
                                    size={"xsm"}
                                >
                                    View Details
                                </Button>
                            </DropdownMenuItem>

                            <DropdownMenuItem
                                onClick={() =>
                                    navigate(`/update-user`, {
                                        state: { params: params?.data?._id },
                                    })
                                }
                            >
                                <Button
                                    className=" p-1 font-normal w-full"
                                    variant="outline_primary"
                                    size={"xsm"}
                                >
                                    <Pencil className="mr-2" />
                                    Update Profile
                                </Button>
                            </DropdownMenuItem>

                            <DropdownMenuItem
                                onClick={() =>
                                    setTimeout(() => {
                                        setUpdateParams(params?.data);
                                    }, 100)
                                }
                            >
                                <Button
                                    className=" p-1 font-normal w-full"
                                    variant="outline_primary"
                                    size={"xsm"}
                                >
                                    <Pencil className="mr-2" />
                                    Update Status
                                </Button>
                            </DropdownMenuItem>

                            <DropdownMenuItem
                                onClick={() =>
                                    setTimeout(() => {
                                        setDeleteParams(params?.data);
                                    }, 100)
                                }
                            >
                                <Button
                                    className=" p-1 font-normal w-full"
                                    variant="outline_primary"
                                    size={"xsm"}
                                >
                                    <Trash2 className="mr-2" />
                                    Delete
                                </Button>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                );
            },
        },
    ];

    const filteredColumnDefs = colDefs.filter((col) => {
        if (
            user?.role === userRole.BRANCH_MANAGER &&
            (col.field === "branch.branchName" || col.field === "role")
        ) {
            return false;
        }
        return true;
    });

    const filterableRoles = Object.keys(userRole).filter((role) => {
        if (user?.role === userRole.SUPER_ADMIN) {
            return (
                userRole[role as keyof typeof userRole] !== userRole.SUPER_ADMIN
            );
        }
        if (user?.role === userRole.ADMIN) {
            return (
                userRole[role as keyof typeof userRole] !== userRole.ADMIN &&
                userRole[role as keyof typeof userRole] !== userRole.SUPER_ADMIN
            );
        }

        if (user?.role === userRole.BRANCH_MANAGER) {
            return (
                userRole[role as keyof typeof userRole] !== userRole.ADMIN &&
                userRole[role as keyof typeof userRole] !==
                    userRole.SUPER_ADMIN &&
                userRole[role as keyof typeof userRole] !==
                    userRole.BRANCH_MANAGER
            );
        }
    });

    const userRoleOptions = filterableRoles.map((role) => ({
        label: role,
        value: userRole[role as keyof typeof userRole],
    }));

    const filters = [
        user?.role !== userRole.BRANCH_MANAGER && (
            <FilterByOptions
                filterBy="branch"
                filterItems={branches?.data?.data.map((branch) => ({
                    label: branch.branchName,
                    value: branch._id,
                }))}
                params={params}
                setParams={setParams}
                title="Branch"
            />
        ),
        user?.role !== userRole.BRANCH_MANAGER && (
            <FilterByOptions
                filterBy="role"
                title="Roles"
                params={params}
                setParams={setParams}
                filterItems={userRoleOptions}
            />
        ),
        <FilterByOptions
            filterBy="status"
            title="Status"
            params={params}
            setParams={setParams}
            filterItems={[
                { label: "ACTIVE", value: "active" },
                { label: "BLOCKED", value: "blocked" },
            ]}
        />,
    ];

    const createButton = (
        <DropdownMenu>
            <DropdownMenuTrigger className="cursor-pointer" asChild>
                <Button size={"xsm"}>
                    Create <ChevronDown size={15} className="ml-2" />
                </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent className="w-56">
                <DropdownMenuItem onSelect={() => navigate("/create-seller")}>
                    <Button
                        size={"xsm"}
                        className="w-full"
                        variant={"outline_primary"}
                    >
                        Create Seller
                    </Button>
                </DropdownMenuItem>

                <DropdownMenuItem
                    onSelect={() => navigate("/create-branch-manager")}
                >
                    <Button
                        size={"xsm"}
                        className="w-full"
                        variant={"outline_primary"}
                    >
                        Create Branch Manager
                    </Button>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );

    return (
        <div className="ag-theme-quartz ">
            <DataTable
                searchField
                createButton={createButton}
                title="ALL USERS"
                rowData={data?.data?.data}
                columnDefs={filteredColumnDefs}
                isFetching={isFetching}
                params={params}
                setParams={setParams}
                filters={filters}
                filterable
                metaData={data?.data?.meta}
            />

            <UpdateButton
                updateParams={updateParams}
                setUpdateParams={setUpdateParams}
            />
            <UserDeleteButton
                deleteParams={deleteParams}
                setDeleteParams={setDeleteParams}
            />

            {/* User Details Modal */}
            <UserDetailsModal
                open={!!viewDetailsUser}
                onClose={() => setViewDetailsUser(null)}
                userId={viewDetailsUser?._id || viewDetailsUser?.id}
            />
        </div>
    );
};

export default Users;
