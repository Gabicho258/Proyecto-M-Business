export const dynamic = "force-dynamic";

import { DeportesContent } from "@/components/deportes/DeportesContent";
import { getDeportes } from "@/utils/api";
import { Metadata } from "next";
import Link from "next/link";
import React from "react";
import { IoMdArrowRoundBack } from "react-icons/io";

export const metadata: Metadata = {
  title: "Deportes",
  description: "Listado de deportes",
};
export default async function Deportes() {
  const data = await getDeportes();

  return (
    <main className="flex flex-col items-center">
      <Link
        className=" flex items-center w-80 mt-10 text-gray-500 hover:text-gray-700 font-semibold "
        href="/home"
      >
        <IoMdArrowRoundBack className="mr-2" />
        Volver a módulos
      </Link>
      <h1 className="text-xl w-60 text-center mt-8 mb-6  font-semibold">
        Deportes
      </h1>
      <div className=" border-solid border-black w-80 flex flex-col items-center ">
        <DeportesContent data={data} />
      </div>
    </main>
  );
}
