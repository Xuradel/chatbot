import { connectMongoDB } from "@/lib/mongodb";
import Prompt from "@/models/prompt";
import { NextRequest, NextResponse } from "next/server";

// Devuelve un prompt por ID

export async function GET(req: NextRequest) {
    try {
        await connectMongoDB();

        const id = req.url.split('/').pop();

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
