import { connectMongoDB } from "@/lib/mongodb";
import Prompt from "@/models/prompt";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest){
    try {
        const {prompt, palabras, prioridad} = await req.json();

        await connectMongoDB();
        await Prompt.create({prompt, palabras, prioridad});
        return NextResponse.json({message: 'Prompt Created.'}, {status: 201});
    } catch (error) {
        return NextResponse.json({message: 'An error occurred'}, {status: 500});
    }
}
