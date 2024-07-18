import { Button } from "../ui/button";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogTrigger,
} from "../ui/dialog";

type DeleteModalProps = {
    handleDelete: () => void;
    modalTrigger: React.ReactNode;
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const DeleteModal = ({
    handleDelete,
    modalTrigger,
    open,
    setOpen,
}: DeleteModalProps) => {
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>{modalTrigger}</DialogTrigger>

            <DialogContent className="sm:max-w-[425px]">
                <h4 className="text-2xl text-center">Are you Sure?</h4>
                <h5 className="text-xl text-center text-slate-500">
                    You won't be able to revert this!
                </h5>

                <div className="flex justify-between px-14 mt-8">
                    <DialogClose asChild>
                        <Button onClick={() => handleDelete()}>Yes</Button>
                    </DialogClose>
                    <DialogClose asChild>
                        <Button variant={"base"}>No</Button>
                    </DialogClose>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default DeleteModal;
