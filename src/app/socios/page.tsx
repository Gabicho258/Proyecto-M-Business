import { SociosContent } from "@/components/socios/SociosContent";
import { getSocios } from "@/utils/api";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Socios",
  description: "Listado de socios",
};

export default async function Socios() {
  const data = await getSocios();
  return (
    <main className="flex flex-col items-center">
      <h1 className="text-xl w-60 text-center mt-20 mb-6 font-semibold">
        Socios
      </h1>
      <div className=" border-solid border-black w-74 flex flex-col items-center ">
        <SociosContent data={data} />
      </div>
    </main>
  );
}
