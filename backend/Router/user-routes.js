import express from "express";
import {getAllUser,signup,login,del} from "../Controller/user-controller"
const router=express.Router();

router.get("/",getAllUser);
router.post("/signup",signup);
router.post("/login",login);
router.delete("/delete/:id",del);


export default router;