import { connectMongoDB } from "@/lib/mongodb";
import Prompt from "@/models/prompt";
import { NextRequest, NextResponse } from "next/server";

// Actualizar prompt

export async function PUT(req: NextRequest) {
    try {
        await connectMongoDB();

        const { id, prompt, palabras, prioridad } = await req.json();

        const result = await Prompt.findByIdAndUpdate(id, {
            prompt: prompt,
            palabras: palabras,
            prioridad: prioridad
        }, { new: true });  // se utiliza true para retornar el actualizado

        if (!result) {
            return NextResponse.json({ message: 'No prompt found with the provided ID.' }, { status: 404 });
        }

        return NextResponse.json({ message: 'Prompt updated successfully.', updatedPrompt: result }, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: 'An error occurred.' }, { status: 500 });
    }
}
