// /* eslint-disable @typescript-eslint/no-explicit-any */
// import React from "react";
// import { Controller } from "react-hook-form";
// import {
//     Select,
//     SelectContent,
//     SelectItem,
//     SelectLabel,
//     SelectTrigger,
//     SelectValue,
// } from "../ui/select";

// type TCustomSelectProps = {
//     id: string;
//     label?: string;
//     options: { value: any; label: string }[];
//     disabled?: boolean;
//     control?: any;
// };

// const CustomSelect: React.FC<TCustomSelectProps> = ({
//     id,
//     label,
//     options,
//     control,
//     disabled,
// }) => {
//     return (
//         <Controller
//             name={id}
//             control={control}
//             defaultValue=""
//             render={({ field, fieldState: { error } }) => (
//                 <Select
//                     // className="flex flex-col"
//                     disabled={disabled}
//                     onValueChange={field.onChange}
//                     value={field.value}
//                 >
//                     <SelectTrigger id={id}>
//                         <SelectValue placeholder={label ? label : id} />
//                     </SelectTrigger>
//                     <SelectContent>
//                         {options?.map((option, index) => (
//                             <SelectItem
//                                 className="cursor-pointer"
//                                 key={index}
//                                 value={option.value}
//                             >
//                                 {option.label}
//                             </SelectItem>
//                         ))}
//                     </SelectContent>
//                     {error && (
//                         <p className="text-red-500 text-sm">{error.message}</p>
//                     )}
//                 </Select>
//             )}
//         />
//     );
// };

// export default CustomSelect;

import React from "react";
import { Controller } from "react-hook-form";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "../ui/select";

type TCustomSelectProps = {
    id: string;
    label: string;
    options: { value: string; label: string }[];
    disabled?: boolean;
    control: any;
    required?: boolean;
};

const CustomSelect: React.FC<TCustomSelectProps> = ({
    id,
    label,
    options,
    control,
    disabled,
    required,
}) => {
    return (
        <Controller
            name={id}
            control={control}
            rules={required ? { required: `${label} is required` } : undefined}
            defaultValue=""
            render={({ field, fieldState: { error } }) => (
                <Select
                    classname="flex flex-col"
                    disabled={disabled}
                    onValueChange={field.onChange}
                    value={field.value}
                >
                    <SelectTrigger id={id}>
                        <SelectLabel>{label ? label : id}</SelectLabel>
                        <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                        {options?.map((option, index) => (
                            <SelectItem
                                className="cursor-pointer"
                                key={index}
                                value={option.value}
                            >
                                {option.label}
                            </SelectItem>
                        ))}
                    </SelectContent>
                    {error && (
                        <p className="text-red-500 text-sm">{error.message}</p>
                    )}
                </Select>
            )}
        />
    );
};

export default CustomSelect;
