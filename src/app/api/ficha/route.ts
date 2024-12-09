import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import * as yup from "yup";

export async function GET() {
  const fichasInscripcion = await prisma.fichaInscripcion.findMany({
    include: { Deporte: true },
  });

  return NextResponse.json(fichasInscripcion);
}

const postSchema = yup.object({
  FicSocCod: yup.number().required(),
  FicDepCod: yup.number().required(),
  FicFecDia: yup.string().required(),
  FicFecMes: yup.string().required(),
  FicFecAno: yup.string().required(),
  FicMon: yup.number().required(),
});

export async function POST(req: Request) {
  try {
    const { FicDepCod, FicFecAno, FicFecDia, FicFecMes, FicSocCod, FicMon } =
      await postSchema.validate(await req.json());
    const newFichaInscripcion = await prisma.fichaInscripcion.create({
      data: {
        FicSocCod,
        FicDepCod,
        FicFecAno,
        FicFecDia,
        FicFecMes,
        FicMon,
      },
    });
    return NextResponse.json(newFichaInscripcion, { status: 201 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(error, { status: 400 });
  }
}
