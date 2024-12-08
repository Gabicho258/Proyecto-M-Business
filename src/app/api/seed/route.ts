import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  // Limpiar las tablas

  await prisma.fichaInscripcion.deleteMany();
  await prisma.socio.deleteMany();
  await prisma.deporte.deleteMany();

  await prisma.$queryRaw`TRUNCATE TABLE "FICHAS_INSCRIPCION", "SOCIOS", "TIPOS_DEPORTE" RESTART IDENTITY CASCADE`;

  // Crear socios
  const socio1 = await prisma.socio.create({
    data: {
      SocNom: "Juan Pérez",
      SocEstReg: "A",
    },
  });
  const socio2 = await prisma.socio.create({
    data: {
      SocNom: "María González",
      SocEstReg: "I",
    },
  });
  const socio3 = await prisma.socio.create({
    data: {
      SocNom: "Carlos Rodríguez",
      SocEstReg: "*",
    },
  });

  const socio4 = await prisma.socio.create({
    data: {
      SocNom: "Harry Potter",
      SocEstReg: "A",
    },
  });

  // Crear deportes
  const deporte1 = await prisma.deporte.create({
    data: {
      DepNom: "Fútbol",
      DepEstReg: "A",
    },
  });
  const deporte2 = await prisma.deporte.create({
    data: {
      DepNom: "Baloncesto",
      DepEstReg: "I",
    },
  });
  const deporte3 = await prisma.deporte.create({
    data: {
      DepNom: "Tenis",
      DepEstReg: "*",
    },
  });

  // Crear fichas de inscripción
  await prisma.fichaInscripcion.create({
    data: {
      FicSocCod: socio1.SocCod,
      FicDepCod: deporte1.DepCod,
      FicFecDia: "15",
      FicFecMes: "03",
      FicFecAno: "2023",
      FicMon: 150.0,
      FicEstReg: "A",
    },
  });

  await prisma.fichaInscripcion.create({
    data: {
      FicSocCod: socio2.SocCod,
      FicDepCod: deporte2.DepCod,
      FicFecDia: "22",
      FicFecMes: "04",
      FicFecAno: "2023",
      FicMon: 200.0,
      FicEstReg: "I",
    },
  });

  await prisma.fichaInscripcion.create({
    data: {
      FicSocCod: socio3.SocCod,
      FicDepCod: deporte3.DepCod,
      FicFecDia: "30",
      FicFecMes: "05",
      FicFecAno: "2023",
      FicMon: 100.0,
      FicEstReg: "*",
    },
  });

  await prisma.fichaInscripcion.create({
    data: {
      FicSocCod: socio4.SocCod,
      FicDepCod: deporte1.DepCod,
      FicFecDia: "02",
      FicFecMes: "08",
      FicFecAno: "2021",
      FicMon: 129.9,
      FicEstReg: "A",
    },
  });

  return NextResponse.json(
    {
      message:
        "Seed de: socios, deportes y fichas de inscripción creado con éxito",
    },
    { status: 201 }
  );
}
