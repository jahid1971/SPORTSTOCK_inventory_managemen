import { BSONError } from "bson";
import { TErrorIssue, TErrorResponse } from "../interface/error";

const handleBSONError = (err: BSONError): TErrorResponse => {
const errorIssues: TErrorIssue[] = [
   {
      path: '', // Access the err.message property instead of err.path
      message: err.message,
   },
];

  return {
    statusCode: 400,
    message: "Invalid BSON data",
    errorMessage: err.message,
    errorDetails: {
      issues: errorIssues,
      name: err.name,
    },
  };
};

export default handleBSONError;
