import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const NotFound = () => {
    return (
        <div className="text-center flex flex-col gap-2 items-center h-full justify-center">
            <h1 className="text-primary text-2xl">404 - Not Found</h1>
            <p className="text-lg">Sorry, the page you are looking for does not exist.</p>
            <Link to="/">
                <Button variant={"outline"}>Go to Home</Button>
            </Link>
        </div>
    );
};

export default NotFound;
