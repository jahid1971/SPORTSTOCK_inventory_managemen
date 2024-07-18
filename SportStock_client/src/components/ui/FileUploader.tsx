// import { useState } from "react";
// import { Controller } from "react-hook-form";
// import { FloatingInput } from "./InputFloatingLabel";

// const FileUploader = ({ control, id }: { control: any; id: string }) => {
//     const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(null);
//     return (
//         <Controller
//             name={id}
//             control={control}
//             render={({ field: { onChange, value, ...field } }) => (
//                 <div className="flex  items-center">
//                     <FloatingInput
//                         id={id}
//                         label="Product image"
//                         type="file"
//                         value={value?.fileName}
//                         {...field}
//                         onChange={
//                             (e: React.ChangeEvent<HTMLInputElement>) => {
//                                 const file = e.target.files?.[0];
//                                 if (file) {
//                                     const reader = new FileReader();
//                                     reader.onloadend = () => {
//                                         setImagePreviewUrl(
//                                             reader.result as string
//                                         );
//                                     };
//                                     reader.readAsDataURL(file);
//                                     control.setValue(id, file);
//                                 }
//                             }
//                             // onChange(e.target.files?.[0])
//                         }
//                     />
//                     {imagePreviewUrl && (
//                         <div className="">
//                             <img
//                                 src={imagePreviewUrl}
//                                 alt="Image Preview"
//                                 className="w-16 h-auto rounded-md"
//                             />
//                         </div>
//                     )}
//                 </div>
//             )}
//         />
//     );
// };

// export default FileUploader;
import { ImageUp } from "lucide-react";
import { useRef, useState } from "react";
import { Controller } from "react-hook-form";
import { Button } from "./button";

const FileUploader = ({ control, id }: { control: any; id: string }) => {
    const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement | null>(null);

    return (
        <Controller
            name={id}
            control={control}
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
                            // if (file) {
                            //     const reader = new FileReader();
                            //     reader.onloadend = () => {
                            //         setImagePreviewUrl(reader.result as string);
                            //     };
                            //     reader.readAsDataURL(file);
                            //     control.setValue(id, file);
                            // }

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
                            className=" flex "
                            onClick={() => fileInputRef.current?.click()}
                            variant={"outline"}
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
