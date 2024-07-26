import { Spinner } from "@/components/ui/Spinner";

export const LoadingOverlayComponent = () => {
    return (
        <div className="relative " role="presentation">
            <Spinner label="please wait" />
        </div>
    );
};
