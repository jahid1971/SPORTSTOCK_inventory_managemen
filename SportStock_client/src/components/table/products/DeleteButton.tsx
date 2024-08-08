import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent } from "@/components/ui/dialog";
import { useMultiProductDeleteMutation } from "@/redux/api/productApi";
import tryCatch from "@/utls/tryCatch";

import React from "react";

const DeleteButton = ({
    deleteids,
    setDeleteIds,
}: {
    deleteids?: any;
    setDeleteIds: React.Dispatch<React.SetStateAction<any>>;
}) => {
    const [multiDelete] = useMultiProductDeleteMutation();

    const handleDelete = (deleteids: string[]) => {
        tryCatch(
            async () => await multiDelete({ data: deleteids }),
            "Products Deleted",
            "Deleting Products",
            () => {
                setDeleteIds([]);
            }
        );
    };

    return (
        <Dialog
            open={deleteids?.length > 0 ? true : false}
            onOpenChange={() => setDeleteIds && setDeleteIds([])}
        >
            <DialogContent className="sm:max-w-[425px]">
                <h4 className="text-2xl text-center">Are you Sure?</h4>
                <h5 className="text-xl text-center text-slate-500">
                    You won't be able to revert this!
                </h5>

                <div className="flex justify-between px-14 mt-8">
                    <Button
                        onClick={() => {
                            handleDelete(deleteids);
                        }}
                    >
                        Yes
                    </Button>

                    <DialogClose asChild>
                        <Button variant={"base"}>No</Button>
                    </DialogClose>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default DeleteButton;
