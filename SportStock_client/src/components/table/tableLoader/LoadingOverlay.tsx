import { Spinner } from "@/components/ui/Spinner";

export const loadingOverlayComponent = () => {
    return (
        <div className="relative " role="presentation">
            <Spinner label="please wait" />
        </div>
    );
};
