import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent } from "@/components/ui/dialog";
import { Trash2 } from "lucide-react";

const DeleteButton = ({
    setOpen,
    open,
    handleTrigger,
    handleMultiDelete,
    classNames,
    variant,
}: {
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    open: boolean;
    handleTrigger: () => void;
    handleMultiDelete: any
    variant?: any;
    classNames?: string;
}) => {
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <Button
                onClick={() => handleTrigger()}
                className={` mt-2 ${classNames}`}
                size={"xsm"}
                variant={variant}
            >
                <Trash2 className="mr-2" size={15} />
                DELETE
            </Button>
            <DialogContent className="sm:max-w-[425px]">
                <h4 className="text-2xl text-center">Are you Sure?</h4>
                <h5 className="text-xl text-center text-slate-500">
                    You won't be able to revert this!
                </h5>

                <div className="flex justify-between px-14 mt-8">
                    <DialogClose asChild>
                        <Button onClick={() => handleMultiDelete()}>Yes</Button>
                    </DialogClose>
                    <DialogClose asChild>
                        <Button variant={"base"}>No</Button>
                    </DialogClose>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default DeleteButton;
