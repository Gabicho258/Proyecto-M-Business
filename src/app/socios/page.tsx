export const dynamic = "force-dynamic";

import { SociosContent } from "@/components/socios/SociosContent";
import { getSocios } from "@/utils/api";
import { Metadata } from "next";
import Link from "next/link";
import React from "react";
import { IoMdArrowRoundBack } from "react-icons/io";

export const metadata: Metadata = {
  title: "Socios",
  description: "Listado de socios",
};

export default async function Socios() {
  const data = await getSocios();
  return (
    <main className="flex flex-col items-center">
      <Link
        className=" flex items-center w-80 mt-10 text-gray-500 hover:text-gray-700 font-semibold "
        href="/home"
      >
        <IoMdArrowRoundBack className="mr-2" />
        Volver a módulos
      </Link>
      <h1 className="text-xl w-60 text-center mt-8 mb-6 font-semibold">
        Socios
      </h1>
      <div className=" border-solid border-black w-80 flex flex-col items-center ">
        <SociosContent data={data} />
      </div>
    </main>
  );
}
