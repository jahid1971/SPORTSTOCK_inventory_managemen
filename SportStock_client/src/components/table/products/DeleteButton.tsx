/* eslint-disable @typescript-eslint/no-explicit-any */
// import tryCatch from "@/utls/tryCatch";
// import { useDeleteProductMutation } from "@/redux/features/product/productApi";
// import DeleteModal from "@/components/Modals/DeleteModal";
// import { CustomCellRendererProps } from "@ag-grid-community/react";
// import { Button } from "@/components/ui/button";

// export const DeleteButton = ({ params }: { params: CustomCellRendererProps }) => {
//     const [deleteProduct] = useDeleteProductMutation();

//     const handleDeleteproduct = () => {
//         tryCatch(
//             async () => await deleteProduct({ data: { isDeleted: true }, id: params.data._id }),
//             "Product deleted successfully",
//             "Deleting product"
//         );
//     };
//     const triggerButton = (
//         <Button className="bg-primary/10 p-1 font-normal" variant="outline" size={"xsm"}>
//             Delete
//         </Button>
//     );

//     return (
//         <div>
//             <DeleteModal handleDelete={handleDeleteproduct} modalTrigger={triggerButton} />
//         </div>
//     );
// };


import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent } from "@/components/ui/dialog";

// type DeleteModalProps = {
//     handleDelete: () => void;
//     modalTrigger: React.ReactNode;
// };

const DeleteButton = ({ setOpen, open, handleTrigger, handleMultiDelete }: { setOpen: React.Dispatch<React.SetStateAction<boolean>>, open: boolean, handleTrigger: () => void, handleMultiDelete: () => void }) => {
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <Button onClick={() => handleTrigger()} className="mt-2" size={"xsm"}>
                Delete
            </Button>
            <DialogContent className="sm:max-w-[425px]">
                <h4 className="text-2xl text-center">Are you Sure?</h4>
                <h5 className="text-xl text-center text-slate-500">You won't be able to revert this!</h5>

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
