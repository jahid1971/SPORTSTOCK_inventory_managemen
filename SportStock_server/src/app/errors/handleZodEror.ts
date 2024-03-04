/* eslint-disable @typescript-eslint/no-explicit-any */
import { ZodError } from "zod";
import { TErrorIssue, TErrorResponse } from "../interface/error";

const handlerZodError = (err: ZodError): TErrorResponse => {
   const errorIssues: TErrorIssue[] = err.issues.map((issue:any) => {
        return {
            path: issue.path[issue.path.length - 1],
            message: issue.message,
            code: issue.code,
            expected: issue.expected,
            received: issue.received,
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

export default handlerZodError;
