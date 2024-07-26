import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useGetuserByIdQuery } from "@/redux/api/userApi";
import { Spinner } from "@/components/ui/Spinner";
import { TUser } from "@/types/global.types";

type UserDetailsModalProps = {
    open: boolean;
    onClose: () => void;
    userId?: string;
    userData?: TUser;
};

const UserDetailsModal = ({
    open,
    onClose,
    userId,
    userData,
}: UserDetailsModalProps) => {
    const { data, isFetching } = useGetuserByIdQuery(userId!, {
        skip: !userId,
    });
    const user = userData || data?.data;

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className="max-w-2xl min-h-[400px] p-8 flex flex-col items-center">
                {isFetching ? (
                    <Spinner label="Loading user details..." />
                ) : user ? (
                    <div className="w-full flex flex-col items-center gap-4">
                        <img
                            src={user.userPhoto || "/default-user.png"}
                            alt="User"
                            className="w-32 h-32 rounded-full object-cover border-4 border-primary-400 shadow"
                        />
                        <h2 className="text-2xl font-bold text-primary-400">
                            {user.fullName}
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full mt-4">
                            <div>
                                <span className="font-semibold">User ID:</span>
                                <div className="text-gray-700">
                                    {user.id || user._id}
                                </div>
                            </div>
                            <div>
                                <span className="font-semibold">Role:</span>
                                <div className="capitalize">{user.role}</div>
                            </div>
                            <div>
                                <span className="font-semibold">Status:</span>
                                <div>
                                    {user.status === "active" ? (
                                        <span className="text-green-500">
                                            ACTIVE
                                        </span>
                                    ) : (
                                        <span className="text-red-500">
                                            BLOCKED
                                        </span>
                                    )}
                                </div>
                            </div>
                            <div>
                                <span className="font-semibold">Branch:</span>
                                <div>
                                    {(user as any)?.branch?.branchName ||
                                        user.branch ||
                                        "-"}
                                </div>
                            </div>
                            <div>
                                <span className="font-semibold">Email:</span>
                                <div>{user.email || "-"}</div>
                            </div>
                            <div>
                                <span className="font-semibold">
                                    Contact Number:
                                </span>
                                <div>{user.contactNumber || "-"}</div>
                            </div>
                            <div>
                                <span className="font-semibold">Address:</span>
                                <div>{user.address || "-"}</div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="text-center text-gray-500">
                        No user data found.
                    </div>
                )}
            </DialogContent>
        </Dialog>
    );
};

export default UserDetailsModal;
