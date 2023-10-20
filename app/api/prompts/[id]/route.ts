import { connectMongoDB } from "@/lib/mongodb";
import Prompt from "@/models/prompt";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    try {
        // Connect to MongoDB
        await connectMongoDB();

        // Extract the prompt ID from the request URL
        const id = req.url.split('/').pop();

        // Use Mongoose to fetch the prompt by its ID
        const prompt = await Prompt.findById(id);

        if (!prompt) {
            return NextResponse.json({ message: 'No prompt found with the provided ID.' }, { status: 404 });
        }

        return NextResponse.json(prompt, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: 'An error occurred.' }, { status: 500 });
    }
}
