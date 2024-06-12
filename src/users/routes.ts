import express from "express"
import userController from "./controller"
const router = express.Router()

router.get("/",userController.getUsers)
router.post("/",userController.createUser)
router.get("/:id",userController.getSingleUser)
router.delete("/:id",userController.deleteUser)
router.put("/:id",userController.updateUser)



export default router