import mongoose, { Schema, models } from "mongoose";

const promptSchema = new Schema({
    prompt: {
        type: String,
        required: true,
    },
    palabras: {
        type: [String],
        required: true,
    },
    prioridad: {
        type: Number,
        default: 1,
    }
}, { timestamps: true });

const Prompt = models.Prompt || mongoose.model('Prompt', promptSchema);
export default Prompt;
