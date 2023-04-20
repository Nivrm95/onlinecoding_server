import express from "express";
import { getAllRooms } from "../../controller/rooms/rooms.controllers";


const router = express.Router();

router.get("/",getAllRooms );


export default router;

