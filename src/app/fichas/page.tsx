import { FichasContent } from "@/components/fichas/FichasContent";
import { getFichasIncripcion } from "@/utils/api";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Fichas de inscripción",
  description: "Fichas de incripción de los socios",
};

export default async function Fichas() {
  const data = await getFichasIncripcion();

  return (
    <main className="flex flex-col items-center">
      <h1 className="text-xl w-60 text-center mt-20 mb-6 font-semibold ">
        Fichas de inscripción
      </h1>
      <div className=" border-solid border-black w-74 flex flex-col items-center ">
        <FichasContent data={data} />
      </div>
    </main>
  );
}
