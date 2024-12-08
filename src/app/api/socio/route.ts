import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import * as yup from "yup";

export async function GET() {
  const socios = await prisma.socio.findMany();

  return NextResponse.json(socios);
}

const postSchema = yup.object({
  SocNom: yup.string().required(),
});

export async function POST(req: Request) {
  try {
    const { SocNom } = await postSchema.validate(await req.json());
    const newSocio = await prisma.socio.create({
      data: {
        SocNom,
      },
    });
    return NextResponse.json(newSocio, { status: 201 });
  } catch (error) {
    return NextResponse.json(error, { status: 400 });
  }
}
