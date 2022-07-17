import express from "express";
import mongoose from "mongoose";
import router from "./Router/user-routes"
import routerblog from "./Router/blog-routes"
import cmtrouter from "./Router/comments-routes"
import cors from "cors"


const app = express();
app.use(cors());
app.use(express.json());
app.use("/api/user",router);
app.use("/api/blog",routerblog);
app.use("/api/comments",cmtrouter);
mongoose.connect("mongodb+srv://Abs1_2002:JAIramSINGH8601@cluster0.krllx.mongodb.net/Blog?retryWrites=true&w=majority"
).then(()=>app.listen(5000)).then(()=>console.log("connection have been created with database")).catch((err)=>console.log("unable to connect with database"))

// app.use("/",(req,res,next) => {
//     res.send("hi i am abhi singh");
// })
 