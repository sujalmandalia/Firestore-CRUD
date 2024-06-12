import { Response } from "express";

const sendResponse = (res:Response, statuscode:number, status:string, operation:string, data:object) => {
  return res.status(statuscode).json({ status, operation, data: data });
}

export default sendResponse