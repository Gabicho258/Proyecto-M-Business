import { DeportesContent } from "@/components/deportes/DeportesContent";
import { getDeportes } from "@/utils/api";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Deportes",
  description: "Listado de deportes",
};
export default async function Deportes() {
  const data = await getDeportes();

  return (
    <main className="flex flex-col items-center">
      <h1 className="text-xl w-60 text-center mt-20 mb-6  font-semibold">
        Deportes
      </h1>
      <div className=" border-solid border-black w-74 flex flex-col items-center ">
        <DeportesContent data={data} />
      </div>
    </main>
  );
}
