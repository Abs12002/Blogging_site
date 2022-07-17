import express from "express";
const routerblog = express.Router();
import {getAllBlog,addBlog,update,getById,deleteById,getUserById} from "../Controller/blog-controller";

routerblog.get("/",getAllBlog );
routerblog.post("/add",addBlog );
routerblog.put("/update/:id",update);
routerblog.get("/:id",getById);
routerblog.delete("/:id",deleteById);
routerblog.get("/user/:id",getUserById );

export default routerblog;
