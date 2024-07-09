/* eslint-disable @typescript-eslint/no-explicit-any */
import { Dialog, DialogClose, DialogContent, DialogTrigger } from "../../ui/dialog";
import { Button } from "../../ui/button";

import tryCatch from "@/utls/tryCatch";
import { userRole } from "@/constants/user";
import { useDeleteUserMutation } from "@/redux/api/userApi";

export const UserDeleteButton = (params: any) => {
    const [deleteUser] = useDeleteUserMutation()

    const handleDeleteproduct = () => {
        tryCatch(
            async () => await deleteUser({ data: { isDeleted: true }, id: params.data._id }),
            "User deleted successfully",
            "Deleting User"
        );
    };

    return (
        params.data.role !== (userRole.SUPER_ADMIN || userRole.BRANCH_MANAGER) && (
            <Dialog>
                <DialogTrigger asChild>
                    <Button className="bg-primary/10 p-1 font-normal" variant="outline" size={"xsm"}>
                        Delete
                    </Button>
                </DialogTrigger>

                <DialogContent className="sm:max-w-[425px]">
                    <h4 className="text-xl text-center">Do you want to delete this user?</h4>

                    <div className="flex justify-between px-10 mt-3">
                        <DialogClose asChild>
                            <Button onClick={() => handleDeleteproduct()}>Yes</Button>
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
