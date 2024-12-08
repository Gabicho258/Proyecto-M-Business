import prisma from "@/lib/prisma";
import { Deporte } from "@prisma/client";
import { NextResponse } from "next/server";
import * as yup from "yup";

interface Segments {
  params: Promise<{
    id: string;
  }>;
}

const getDeporte = async (id: string): Promise<Deporte | null> => {
  return await prisma.deporte.findFirst({
    where: { DepCod: Number.parseInt(id) },
  });
};

export async function GET(request: Request, { params }: Segments) {
  const { id } = await params;
  const deporte = await getDeporte(id);
  if (!deporte) {
    return NextResponse.json({ message: "Deporte not found" }, { status: 404 });
  }

  return NextResponse.json(deporte);
}

const updateSchema = yup.object({
  DepNom: yup.string().optional(),
  DepEstReg: yup.string().optional(),
});

export async function PUT(req: Request, { params }: Segments) {
  const { id } = await params;

  try {
    const deporte = await getDeporte(id);

    if (!deporte) {
      return NextResponse.json(
        { message: "Deporte not found" },
        { status: 404 }
      );
    }

    const { DepEstReg, DepNom } = await updateSchema.validate(await req.json());

    const deporteUpdated = await prisma.deporte.update({
      data: { DepNom, DepEstReg },
      where: { DepCod: Number.parseInt(id) },
    });

    return NextResponse.json(deporteUpdated);
  } catch (error) {
    return NextResponse.json(error, { status: 400 });
  }
}
