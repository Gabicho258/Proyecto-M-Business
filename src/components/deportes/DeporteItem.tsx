import { Deporte } from "@prisma/client";
import Link from "next/link";
import React from "react";

interface Props {
  deporte: Deporte;
}

export const DeporteItem = ({ deporte }: Props) => {
  const { DepCod, DepEstReg, DepNom } = deporte;
  return (
    <Link
      className="w-full flex flex-col text-sm border border-[#003366] rounded-xl my-2 py-4 px-4 text-[#4e4e4e]"
      href={`deportes/${DepCod}`}
    >
      <div className="flex flex-row w-full ">
        <span className="w-full">
          <strong>Código de deporte: </strong>{" "}
          {`DEP-${DepCod.toString().padStart(4, "0")}`}
        </span>
      </div>
      <div className="flex flex-row w-full">
        <span className="w-full">
          <strong>Nombre:</strong> {DepNom}
        </span>
      </div>
      <div className="flex flex-row w-full justify-evenly">
        <div
          className={`
            w-full flex flex-col items-center rounded-lg text-white py-2 mt-2 ${
              DepEstReg === "A" && "bg-[#4caf50]"
            } ${DepEstReg === "I" && "bg-[#FFB84D]"} ${
            DepEstReg === "*" && "bg-[#EAA1A1]"
          }`}
        >
          <strong>Estado</strong>
          <span>
            {DepEstReg === "A" && "Activo"}
            {DepEstReg === "I" && "Inactivo"} {DepEstReg === "*" && "Elimnado"}
          </span>
        </div>
      </div>
    </Link>
  );
};
