import { NextFunction, Request, Response } from "express";
import { db } from "../firebase";
import sendResponse from "../helper/sendResponse";
import ErrorHandler from "../utils/customErrorHandler";


const getUsers = async(req:Request,res:Response,next:NextFunction)=>{
  try {
    const usersSnapshot = await db.collection('users').get()
    const users = usersSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    return sendResponse(res,200,"success","Get All Users",users)
  } catch (error) {
    return next(error)
  }
}

const getSingleUser = async(req:Request,res:Response,next:NextFunction)=>{
  try {
    const {id} = req.params
    const user = await db.collection('users').doc(id).get()
    if(!user.exists){
      return next(new ErrorHandler("No user Found",404)) 
    }
    return sendResponse(res,200,"success","Get Single User",{...user.data()})
  } catch (error) {
    return next(error)
  }
}

const createUser = async(req:Request,res:Response,next:NextFunction)=>{
  try {
    const user = req.body;
    const docRef = await db.collection('users').add(user)
    return sendResponse(res,201,"success","Create User",{data:docRef.id})
  } catch (error) {
   return next(error) 
  }
}

const deleteUser = async(req:Request,res:Response,next:NextFunction)=>{
  try {
    const { id } = req.params;
    const user = await db.collection('users').doc(id).get()
    if(!user.exists){
      return next(new ErrorHandler("No user Found",404)) 
    }
    const data = await db.collection('users').doc(id).delete();4
    console.log(data)
    return sendResponse(res,200,"success","Delete User",{})
  } catch (error) {
    return next(error)
  }
}

const updateUser = async(req:Request,res:Response,next:NextFunction)=>{
  try {
    const { id } = req.params;
    const data = req.body
    const user = await db.collection('users').doc(id).get()
    if(!user.exists){
      return next(new ErrorHandler("No user Found",404)) 
    }
    await db.collection('users').doc(id).set(data, { merge: true });
    return sendResponse(res,200,"success","Update User",{})
  } catch (error) {
    return next(error)
    
  }
}

export default{
  getUsers,
  createUser,
  getSingleUser,
  deleteUser,
  updateUser
}