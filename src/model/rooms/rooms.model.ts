import { Schema } from "mongoose";
import mongoose from "mongoose";

export interface IRooms{
    name: string;
    icons: string;
    description: string;
}

export const roomsSchema = new Schema<IRooms>({
    name: {type: String},
    icons: {type: String},
    description: {type: String},
})

export const RoomsModal = mongoose.model<IRooms>("rooms", roomsSchema);