import { connectMongoDB } from "@/lib/mongodb";
import Prompt from "@/models/prompt";
import { NextRequest, NextResponse } from "next/server";
export const revalidate = 10;

// Obtener todos los prompts

export async function GET(req: NextRequest) {
  try {
    await connectMongoDB();

    const prompts = await Prompt.find({});

    return NextResponse.json(prompts);
  } catch (error) {
    return NextResponse.json(
      { message: "An error occurred fetching the prompts" },
      { status: 500 }
    );
  }
}
