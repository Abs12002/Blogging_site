import express from 'express';
import {addCmnts,getcomments} from "../Controller/comments-controller";

const cmtrouter=express.Router();

cmtrouter.get("/comments",getcomments);
cmtrouter.post("/add/comments",addCmnts);

export default cmtrouter;