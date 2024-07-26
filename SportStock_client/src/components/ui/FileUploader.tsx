import { ImageUp } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { Button } from "./button";
import { cn } from "@/lib/utils";

const FileUploader = ({
    control,
    id,
    className,
    watch,
}: {
    control?: any;
    id: string;
    className?: string;
    watch?: any;
}) => {
    const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement | null>(null);

    const methods = useFormContext?.();
    const cntxtControl = methods?.control ?? control;

    useEffect(() => {
        if (watch && !watch(id)) {
            setImagePreviewUrl(null);
        }
    }, [watch]);

    return (
        <Controller
            name={id}
            control={cntxtControl}
            render={({ field: { onChange, value, ...field } }) => (
                <div className="flex items-center gap-4">
                    {/* Hidden file input */}
                    <input
                        id={id}
                        type="file"
                        accept="image/*"
                        ref={fileInputRef}
                        className="hidden"
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                            const file = e.target.files?.[0];

                            if (file) {
                                const reader = new FileReader();
                                reader.onloadend = () => {
                                    setImagePreviewUrl(reader.result as string);
                                };
                                reader.readAsDataURL(file);

                                onChange(file);
                            }
                        }}
                    />

                    {/* Custom upload button */}

                    <div className="flex  items-center gap-2">
                        <Button
                            type="button"
                            className={cn("flex", className)}
                            onClick={() => fileInputRef.current?.click()}
                            variant={"outline_primary"}
                            size={"lg"}
                        >
                            <ImageUp className="mr-2  " size={15} />
                            Upload Image
                        </Button>

                        {/* Image Preview */}
                        {imagePreviewUrl && (
                            <div>
                                <img
                                    src={imagePreviewUrl}
                                    alt="Image Preview"
                                    className=" max-h-12 rounded-md"
                                />
                            </div>
                        )}
                    </div>
                </div>
            )}
        />
    );
};

export default FileUploader;
