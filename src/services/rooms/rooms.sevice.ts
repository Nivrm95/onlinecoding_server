import { RoomsModal } from "../../model/rooms/rooms.model";

export const getRooms = async () => {
  try {
    const rooms = await RoomsModal.find();
    return rooms;
  } catch (err) {
    console.log(err);
    throw err;
  }
};