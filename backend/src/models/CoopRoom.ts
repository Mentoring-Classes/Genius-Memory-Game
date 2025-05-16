import mongoose, { Schema, Document } from "mongoose";

interface ICoopRoom extends Document {
    roomName: string;
    player1: string;
    player2: string;
    currentPlayer: string;
    gameSequence: string[];
    playersSequence: string[];
    round: number;
    _id: string;
}

const CoopSchema = new Schema<ICoopRoom>({
    roomName: { type: String, required: true},
    player1: { type: String, required: true},
    player2: { type: String },
    currentPlayer: { type: String, required: true},
    gameSequence: { type: [String]},
    playersSequence: { type: [String]},
    round: { type: Number, default: 1 },
}, { timestamps: true });

export default mongoose.model<ICoopRoom>('CoopRoom', CoopSchema);