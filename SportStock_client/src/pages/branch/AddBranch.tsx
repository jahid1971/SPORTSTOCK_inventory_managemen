import CreateBranch from "@/components/product/CreateBranch";

const AddBranch = () => {
    return (
        <div className="flex justify-center mt-20 w-full ">
            <div className="w-11/12 md:w-6/12">
                <h3 className="text-2xl ml-7 text-primary-400">Add Branch</h3>
                <CreateBranch />
            </div>
        </div>
    );
};

export default AddBranch;
