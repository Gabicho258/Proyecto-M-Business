import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import * as yup from "yup";

export async function GET() {
  const deportes = await prisma.deporte.findMany();

  return NextResponse.json(deportes);
}

const postSchema = yup.object({
  DepNom: yup.string().required(),
});

export async function POST(req: Request) {
  try {
    const { DepNom } = await postSchema.validate(await req.json());
    const newDeporte = await prisma.deporte.create({
      data: {
        DepNom,
      },
    });
    return NextResponse.json(newDeporte, { status: 201 });
  } catch (error) {
    return NextResponse.json(error, { status: 400 });
  }
}
