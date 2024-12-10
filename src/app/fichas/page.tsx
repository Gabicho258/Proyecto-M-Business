import { FichasContent } from "@/components/fichas/FichasContent";
import { getFichasIncripcion } from "@/utils/api";
import { Metadata } from "next";
import Link from "next/link";
import React from "react";
import { IoMdArrowRoundBack } from "react-icons/io";

export const metadata: Metadata = {
  title: "Fichas de inscripción",
  description: "Fichas de incripción de los socios",
};

export default async function Fichas() {
  const data = await getFichasIncripcion();

  return (
    <main className="flex flex-col items-center">
      <Link
        className=" flex items-center w-80 mt-10 text-gray-500 hover:text-gray-700 font-semibold "
        href="/home"
      >
        <IoMdArrowRoundBack className="mr-2" />
        Volver a módulos
      </Link>
      <h1 className="text-xl w-60 text-center mt-8 mb-6 font-semibold ">
        Fichas de inscripción
      </h1>
      <div className=" border-solid border-black w-74 flex flex-col items-center ">
        <FichasContent data={data} />
      </div>
    </main>
  );
}
