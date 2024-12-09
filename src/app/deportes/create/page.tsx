import { FormCreateDeporte } from "@/components/deportes/FormCreateDeporte";
import { getDeportes } from "@/utils/api";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Nuevo deporte",
  description: "Creación de un nuevo deporte",
};

export default async function CreateDeporte() {
  const deportes = await getDeportes();

  return (
    <main className="flex flex-col items-center">
      <h1 className="text-xl w-64 text-center mt-20 mb-6 font-semibold">
        Nuevo deporte
      </h1>
      <div className="  border-solid border-black w-72 flex flex-col  ">
        <FormCreateDeporte deportes={deportes} />
      </div>
    </main>
  );
}
