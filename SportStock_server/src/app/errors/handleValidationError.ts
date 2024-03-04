import mongoose from "mongoose";
import { TErrorIssue, TErrorResponse } from "../interface/error";

const handleValidationError = (err: mongoose.Error.ValidationError): TErrorResponse => {
    const errorIssues: TErrorIssue[] = Object.values(err.errors).map((value) => {
        return {
            path: value.path,
            message: value.message,
        };
    });
    return {
        statusCode: 400,
        message: "Validation Error",
        errorMessage: errorIssues.map((value) => value.message).join(" "),
        errorDetails: {
            issues: errorIssues,
            name: err.name,
        },
    };
};

export default handleValidationError;
