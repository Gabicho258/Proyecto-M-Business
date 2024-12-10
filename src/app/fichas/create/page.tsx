export const dynamic = "force-dynamic";

import { FormCreateFicha } from "@/components/fichas/FormCreateFicha";
import { getDeportes, getFichasIncripcion, getSocios } from "@/utils/api";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Nueva ficha de inscripción",
  description: "Creación de una nueva ficha de inscripción",
};

export default async function CreateFicha() {
  const socios = await getSocios();
  const deportes = await getDeportes();
  const fichas = await getFichasIncripcion();

  return (
    <main className="flex flex-col items-center">
      <h1 className="text-xl w-64 text-center mt-20 mb-6 font-semibold">
        Nueva ficha de inscripción
      </h1>
      <div className="  border-solid border-black w-72 flex flex-col  ">
        <FormCreateFicha socios={socios} deportes={deportes} fichas={fichas} />
      </div>
    </main>
  );
}
