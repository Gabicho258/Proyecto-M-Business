import { Socio } from "@prisma/client";
import React from "react";

interface Props {
  socio: Socio;
}

export const SocioItem = ({ socio }: Props) => {
  const { SocCod, SocEstReg, SocNom } = socio;
  return (
    <div className="w-full flex flex-col text-sm border border-[#003366] rounded-xl my-2 py-4 px-4 text-[#4e4e4e]">
      <div className="flex flex-row w-full ">
        <span className="w-full">
          <strong>Código de socio: </strong>{" "}
          {`SOC-${SocCod.toString().padStart(4, "0")}`}
        </span>
      </div>
      <div className="flex flex-row w-full">
        <span className="w-full">
          <strong>Nombre:</strong> {SocNom}
        </span>
      </div>
      <div className="flex flex-row w-full justify-evenly">
        <div
          className={`
            w-full flex flex-col items-center rounded-lg text-white py-2 mt-2 ${
              SocEstReg === "A" && "bg-[#4caf50]"
            } ${SocEstReg === "I" && "bg-[#FFB84D]"} ${
            SocEstReg === "*" && "bg-[#EAA1A1]"
          }`}
        >
          <strong>Estado</strong>
          <span>
            {SocEstReg === "A" && "Activo"}
            {SocEstReg === "I" && "Inactivo"} {SocEstReg === "*" && "Elimnado"}
          </span>
        </div>
      </div>
    </div>
  );
};
