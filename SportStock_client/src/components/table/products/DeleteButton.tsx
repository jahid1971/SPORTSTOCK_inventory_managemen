import { Dialog, DialogClose, DialogContent, DialogTrigger } from "../../ui/dialog";
import { Button } from "../../ui/button";

import tryCatch from "@/utls/tryCatch";
import { userRole } from "@/constants/user";
import { useDeleteProductMutation } from "@/redux/features/product/productApi";

export const DeleteButton = (params: any) => {
    const [deleteProduct] = useDeleteProductMutation();

    const handleDeleteproduct = () => {
        tryCatch(
            async () => await deleteProduct({ data: { isDeleted: true }, id: params.data._id }),
            "Product deleted successfully",
            "Deleting product"
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
                    <h4 className="text-xl text-center">Do you want to remove this product?</h4>

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
