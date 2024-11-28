import mongoose from 'mongoose';

export const connection = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log('MongoDB connection successful');
    } catch (error) {
        console.error('MongoDB connection error:', error);
        process.exit(1);
    }
};