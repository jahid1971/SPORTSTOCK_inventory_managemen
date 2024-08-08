/* eslint-disable @typescript-eslint/no-explicit-any */
import {
    Dialog,
    DialogClose,
    DialogContent,
  
} from "../../ui/dialog";
import { Button } from "../../ui/button";

import tryCatch from "@/utls/tryCatch";
import { userRole } from "@/constants/user";
import { useDeleteUserMutation } from "@/redux/api/userApi";

export const UserDeleteButton = ({ deleteParams, setDeleteParams }: any) => {
    const [deleteUser] = useDeleteUserMutation();

    const handleDeleteproduct = () => {
        tryCatch(
            async () =>
                await deleteUser({
                    data: { isDeleted: true },
                    id: deleteParams?._id,
                }),
            "User deleted successfully",
            "Deleting User"
        );
    };

    return (
        deleteParams?.role !==
            (userRole.SUPER_ADMIN || userRole.BRANCH_MANAGER) && (
            <Dialog
                open={!!deleteParams}
                onOpenChange={() => setDeleteParams(null)}
            >
                <DialogContent className="sm:max-w-[425px]">
                    <h4 className="text-xl text-center">
                        Do you want to delete this user?
                    </h4>

                    <div className="flex justify-between px-10 mt-3">
                        <DialogClose asChild>
                            <Button onClick={() => handleDeleteproduct()}>
                                Yes
                            </Button>
                        </DialogClose>
                        <DialogClose asChild>
                            <Button variant={"base"}>No</Button>
                        </DialogClose>
                    </div>
                </DialogContent>
            </Dialog>
        )
    );
};
