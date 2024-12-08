import mongoose from 'mongoose';

const roomSchema = mongoose.Schema({
    title: { type: String, required: true }
});

export const Room = mongoose.model("room", roomSchema)