
import { NextFunction, Request, Response } from "express";
import config from "../config";

const globalErrorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // setting default values
  const statusCode = err.statusCode || 500;
  const message = err.message || "something went wrong!";

  // error pattern custom
  type TErrorSource = {
    path: string | number;
    message: string;
  }[];

  const errorSource: TErrorSource = [
    {
      path: '',
      message: 'something went wrong!'
    }
  ];
  // end

  // ultimate return ekhan theke zacche
  return res.status(statusCode).json({
    success: false,
    message,
    // error: err,
    errorSource,
    err,
    stack: config.NODE_ENV === 'development' ? err?.stack : null,
  });
};

export default globalErrorHandler;

//error pattern
/*
success
message
errorSources:[
  path:'',
  message:''
]
**development hole stack thakbe 
stack
*/