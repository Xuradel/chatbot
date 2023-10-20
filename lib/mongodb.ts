import mongoose from "mongoose";

export const connectMongoDB = async () => {
    const uri = process.env.MONGODB_URI;

    if (!uri) {
        console.error('MONGODB_URI is not defined');
        return;
    }

    try {
        await mongoose.connect(uri);
        console.log('Connected to MongoDB')
    } catch (error) {
        console.log('Error connecting to MongoDB: ', error)
    }
}