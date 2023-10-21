import { connectMongoDB } from "@/lib/mongodb";
import Prompt from "@/models/prompt";
import { NextRequest, NextResponse } from "next/server";

// Eliminar prompt por ID

export async function POST(req: NextRequest) {
    try {
        // Conexion a mongoDB
        await connectMongoDB();

        // Extraer ID del request body
        const { id } = await req.json();

        // Usando mongoose se elimina un objeto por el ID
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
