import { userRole } from "../constants/user";
import User from "../modules/user/user.model";
import { passwordHash } from "../utls/passwordHash";

const seedSuperAdmin = async () => {
    console.log("Seeding super admin...");
    const isSuperAdminExists = await User.findOne({
        role: userRole.SUPER_ADMIN,
    });

    if (!isSuperAdminExists) {
        const superAdminPassword = process.env.SUPER_ADMIN_PASSWORD || "";
        const hashedPassword =
            await passwordHash.hashPassword(superAdminPassword);

        const superAdmin = {
            id: process.env.SUPER_ADMIN_ID,
            fullName: "SUPER ADMIN",
            email: process.env.SUPER_ADMIN_EMAIL,
            needsPasswordChange: false,
            role: userRole.SUPER_ADMIN,
            status: "active",
            isDeleted: false,
            password: hashedPassword,
            contactNumber: "N/A",
            address: "N/A",
        };

        await User.create(superAdmin);
        console.log("Super Admin created successfully");
    }
};
export default seedSuperAdmin;
