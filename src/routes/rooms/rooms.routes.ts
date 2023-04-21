import express from "express";
import { getAllRooms, joinRoom } from "../../controller/rooms/rooms.controllers";


const router = express.Router();

router.get("/",getAllRooms );
router.post("/:id/join",joinRoom );

export default router;

