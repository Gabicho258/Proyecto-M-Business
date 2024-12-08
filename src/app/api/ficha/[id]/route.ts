import prisma from "@/lib/prisma";
import { FichaInscripcion } from "@prisma/client";
import { NextResponse } from "next/server";
import * as yup from "yup";

interface Segments {
  params: Promise<{
    id: string;
  }>;
}

const getFicha = async (id: string): Promise<FichaInscripcion | null> => {
  return await prisma.fichaInscripcion.findFirst({
    where: { FicNum: Number.parseInt(id) },
  });
};

export async function GET(request: Request, { params }: Segments) {
  const { id } = await params;
  const ficha = await getFicha(id);
  if (!ficha) {
    return NextResponse.json(
      { message: "FichaInscripcion not found" },
      { status: 404 }
    );
  }

  return NextResponse.json(ficha);
}

const updateSchema = yup.object({
  FicSocCod: yup.number().optional(),
  FicDepCod: yup.number().optional(),
  FicFecDia: yup.string().optional(),
  FicFecMes: yup.string().optional(),
  FicFecAno: yup.string().optional(),
  FicMon: yup.number().optional(),
  FicEstReg: yup.string().optional(),
});

export async function PUT(req: Request, { params }: Segments) {
  const { id } = await params;

  try {
    const ficha = await getFicha(id);

    if (!ficha) {
      return NextResponse.json(
        { message: "FichaInscripcion not found" },
        { status: 404 }
      );
    }

    const {
      FicSocCod,
      FicDepCod,
      FicFecDia,
      FicFecMes,
      FicFecAno,
      FicMon,
      FicEstReg,
    } = await updateSchema.validate(await req.json());

    const fichaUpdated = await prisma.fichaInscripcion.update({
      data: {
        FicSocCod,
        FicDepCod,
        FicFecDia,
        FicFecMes,
        FicFecAno,
        FicMon,
        FicEstReg,
      },
      where: { FicNum: Number.parseInt(id) },
    });

    return NextResponse.json(fichaUpdated);
  } catch (error) {
    return NextResponse.json(error, { status: 400 });
  }
}
