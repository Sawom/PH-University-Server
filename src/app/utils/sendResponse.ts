import { Response } from 'express';

type TResponse<T> = {
  statusCode: number;
  success: boolean;
  message?: string;
  data: T; // data ary, objt, string ze kono kichu hote pare. tai generic type use korchi
};

const sendResponse = <T>(res: Response, 
  data: TResponse<T>) => {
  res.status(data?.statusCode).json({
    success: data.success,
    message: data.message,
    data: data.data,
  });
};

export default sendResponse;