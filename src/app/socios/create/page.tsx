import { FormCreateSocio } from "@/components/socios/FormCreateSocio";
import { getSocios } from "@/utils/api";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Nuevo socio",
  description: "Creación de un nuevo socio",
};

export default async function CreateSocio() {
  const socios = await getSocios();

  return (
    <main className="flex flex-col items-center">
      <h1 className="text-xl w-64 text-center mt-20 mb-6 font-semibold">
        Nuevo socio
      </h1>
      <div className="  border-solid border-black w-72 flex flex-col  ">
        <FormCreateSocio socios={socios} />
      </div>
    </main>
  );
}
