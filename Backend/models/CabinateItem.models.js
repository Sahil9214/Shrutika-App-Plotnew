import mongoose from 'mongoose';

const CabinateItemSchema = mongoose.Schema({
    title: { type: String, required: true },
    quantity: { type: String, required: true },
    cabinetId: { type: mongoose.Schema.Types.ObjectId, ref: 'Cabinet', required: true },
    // room: { type: mongoose.Schema.Types.ObjectId, ref: 'Room', required: true }
});

export const CabinateItem = mongoose.model("CabinateItem", CabinateItemSchema);