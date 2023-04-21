import { Schema } from "mongoose";
import mongoose from "mongoose";

export interface IRoom {
  _id: string;
  name: string;
  icons: string;
  description: string;
}

export const roomsSchema = new Schema<IRoom>({
  name: { type: String },
  icons: { type: String },
  description: { type: String },
});

export const RoomsModal = mongoose.model<IRoom>("rooms", roomsSchema);
