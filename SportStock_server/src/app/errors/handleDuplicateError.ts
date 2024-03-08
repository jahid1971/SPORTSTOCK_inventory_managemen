/* eslint-disable @typescript-eslint/no-explicit-any */
import { TErrorIssue, TErrorResponse} from "../interface/error";

const handleDuplicateError = (err: any): TErrorResponse => {
    //  using regex

    const match = err.message.match(/"([^"]*)"/);

    const extractedMessage = match && match[1];

    const errorIssues: TErrorIssue[] = [
        {
            path: "",
            message: `${extractedMessage} is already exists`,
        },
    ];
    return {
        statusCode: 400,
        message: "Duplicate Entry",
        errorMessage: errorIssues.map((value) => value.message).join(" "),
        errorDetails: {
            issues: errorIssues,
            name: err.name,
        },
    };
};

export default handleDuplicateError;
