import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    food: [
        {
            foodId: { type: mongoose.Schema.Types.ObjectId, ref: 'Food', required: true },
            quantity: { type: Number, required: true, default: 1 }, 
        }
    ],
    status: { type: String, enum: ['Pending', 'Success'], default: 'Pending' },
});

export default mongoose.model('Order', orderSchema);