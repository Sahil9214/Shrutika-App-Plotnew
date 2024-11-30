import mongoose from 'mongoose';

const CabinateItemSchema = mongoose.Schema({
    title: { type: String, required: true },
    quantity: { type: String, required: true },
    cabinetId: { type: mongoose.Schema.Types.ObjectId, ref: 'Cabinet', required: true },
    expiryDate: { type: Date },
    cataglogueNumber: { type: String },
    dateOfPurchase: { type: String, required: true },
    brand: { type: String },

    stock: { type: String, required: true },
    damage: { type: String, },

});

export const CabinateItem = mongoose.model("CabinateItem", CabinateItemSchema);