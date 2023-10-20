import { connectMongoDB } from "@/lib/mongodb";
import Prompt from "@/models/prompt";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(req: NextRequest) {
    try {
        // Connect to MongoDB
        await connectMongoDB();

        // Extract the prompt data from the request body
        const { id, prompt, palabras, prioridad } = await req.json();

        // Use Mongoose to find the prompt by its ID and update it
        const result = await Prompt.findByIdAndUpdate(id, {
            prompt: prompt,
            palabras: palabras,
            prioridad: prioridad
        }, { new: true });  // { new: true } returns the modified document rather than the original

        if (!result) {
            return NextResponse.json({ message: 'No prompt found with the provided ID.' }, { status: 404 });
        }

        return NextResponse.json({ message: 'Prompt updated successfully.', updatedPrompt: result }, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: 'An error occurred.' }, { status: 500 });
    }
}
