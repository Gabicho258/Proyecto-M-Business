import { FichaConDeporte } from "@/utils/api";
import React from "react";

interface Props {
  ficha: FichaConDeporte;
}

export const FichaItem = ({ ficha }: Props) => {
  const {
    FicEstReg,
    FicFecAno,
    FicFecDia,
    FicFecMes,
    FicMon,
    FicNum,
    FicSocCod,
    Deporte,
  } = ficha;

  return (
    <div className="w-full flex flex-col text-sm border border-[#003366] rounded-xl my-2 py-4 px-4 text-[#4e4e4e]">
      <div className="flex flex-row w-full ">
        <span className="w-1/2">
          <strong>N° de ficha: </strong>{" "}
          {`FIC-${FicNum.toString().padStart(4, "0")}`}
        </span>
        <span className="w-1/2">
          <strong>Cod. socio: </strong>{" "}
          {`SOC-${FicSocCod.toString().padStart(4, "0")}`}
        </span>
      </div>
      <div className="flex flex-row w-full">
        <span className="w-1/2">
          <strong>Fecha: </strong> {FicFecDia}
          {"/"}
          {FicFecMes}
          {"/"}
          {FicFecAno}
        </span>
        <span className="w-1/2">
          <strong>Deporte:</strong> {Deporte.DepNom}
        </span>
      </div>
      <div className="flex flex-row w-full justify-evenly">
        <div
          className={`
            w-5/12 flex flex-col items-center rounded-lg text-white py-2 mt-2 ${
              FicEstReg === "A" && "bg-[#4caf50]"
            } ${FicEstReg === "I" && "bg-[#FFB84D]"} ${
            FicEstReg === "*" && "bg-[#EAA1A1]"
          }`}
        >
          <strong>Estado</strong>
          <span>
            {FicEstReg === "A" && "Activo"}
            {FicEstReg === "I" && "Inactivo"} {FicEstReg === "*" && "Elimnado"}
          </span>
        </div>
        <div className="w-5/12 flex flex-col items-center bg-[#3473B1] rounded-lg text-white py-2 mt-2 ">
          <strong>Monto</strong>
          <span>S/.{FicMon.toString()}</span>
        </div>
      </div>
    </div>
  );
};
