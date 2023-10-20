import { connectMongoDB } from "@/lib/mongodb";
import Prompt from "@/models/prompt";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        // Connect to MongoDB
        await connectMongoDB();

        // Extract the prompt ID from the request body
        const { id } = await req.json();

        // Use Mongoose to delete the prompt by its ID
        const result = await Prompt.findByIdAndDelete(id);

        if (!result) {
            return NextResponse.json({ message: 'No prompt found with the provided ID.' }, { status: 404 });
        }

        return NextResponse.json({ message: 'Prompt deleted successfully.' }, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: 'An error occurred.' }, { status: 500 });
    }
}
