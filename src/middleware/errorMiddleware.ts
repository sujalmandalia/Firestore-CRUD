import { NextFunction, Request , Response} from "express";

export const errorMiddleware = (err:any, req:Request, res:Response, next:NextFunction) => {
  err.message = err.message || "Internal Server error";
  err.statusCode = err.statusCode || 500;

  return res.status(err.statusCode).json({
    status: "error",
    message: err.message
  })
}