import mongoose from 'mongoose';

const CabinetSchema = mongoose.Schema({
    cabinetName: { type: String, required: true },
    room: { type: mongoose.Schema.Types.ObjectId, ref: 'Room', required: true }
})

export const Cabinet = mongoose.model('Cabinet', CabinetSchema)