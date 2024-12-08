import prisma from "@/lib/prisma";
import { Socio } from "@prisma/client";
import { NextResponse } from "next/server";
import * as yup from "yup";

interface Segments {
  params: Promise<{
    id: string;
  }>;
}

const getSocio = async (id: string): Promise<Socio | null> => {
  return await prisma.socio.findFirst({
    where: { SocCod: Number.parseInt(id) },
  });
};

export async function GET(request: Request, { params }: Segments) {
  const { id } = await params;
  const socio = await getSocio(id);
  if (!socio) {
    return NextResponse.json({ message: "Socio not found" }, { status: 404 });
  }

  return NextResponse.json(socio);
}

const updateSchema = yup.object({
  SocNom: yup.string().optional(),
  SocEstReg: yup.string().optional(),
});

export async function PUT(req: Request, { params }: Segments) {
  const { id } = await params;

  try {
    const socio = await getSocio(id);

    if (!socio) {
      return NextResponse.json({ message: "Socio not found" }, { status: 404 });
    }

    const { SocNom, SocEstReg } = await updateSchema.validate(await req.json());

    const socioUpdated = await prisma.socio.update({
      data: { SocNom, SocEstReg },
      where: { SocCod: Number.parseInt(id) },
    });

    return NextResponse.json(socioUpdated);
  } catch (error) {
    return NextResponse.json(error, { status: 400 });
  }
}
