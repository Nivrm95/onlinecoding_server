import { Request, Response } from "express";
import { getRooms } from "../../services/rooms/rooms.sevice";
  
  export const getAllRooms = async (req: Request, res: Response) => {
    try {
      const Rooms = await getRooms();
      return res
        .status(200)
        .json(Rooms);
    } catch (err: any) {
      console.log(err);
      throw err;
    }
  };

  export const joinRoom = async (req: Request, res: Response) => {
    try {
      const Rooms = await getRooms();
      return res
        .status(200)
        .json(Rooms);
    } catch (err: any) {
      console.log(err);
      throw err;
    }
  };