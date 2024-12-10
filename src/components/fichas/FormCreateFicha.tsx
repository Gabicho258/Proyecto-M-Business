"use client";

import { createFichaInscripcion, FichaConDeporte } from "@/utils/api";
import { Deporte, Prisma, Socio } from "@prisma/client";
import { redirect } from "next/navigation";
import { useState } from "react";
import { FaSave, FaTimes } from "react-icons/fa";

interface Props {
  socios: Socio[];
  deportes: Deporte[];
  fichas: FichaConDeporte[];
}

export const FormCreateFicha = ({ deportes, fichas, socios }: Props) => {
  const [socio, setSocio] = useState("");
  const [deporte, setDeporte] = useState("");
  const [fechaInicio, setFechaInicio] = useState("");
  const [monto, setMonto] = useState("");

  const lastFichaInscripcion = fichas.reduce((max, current) => {
    return current.FicNum > max.FicNum ? current : max;
  });

  const handleGuardar = async () => {
    if (socio && deporte && fechaInicio && monto) {
      const fichaToCreate = {
        FicSocCod: parseInt(socio),
        FicDepCod: parseInt(deporte),
        FicFecAno: fechaInicio.slice(0, 4),
        FicFecMes: fechaInicio.slice(5, 7),
        FicFecDia: fechaInicio.slice(8, 10),
        FicMon: new Prisma.Decimal(monto),
      };
      const created = await createFichaInscripcion(fichaToCreate);
      return created ? redirect("/fichas/") : alert("Falló la creación");
    }
  };

  const handleCancelar = () => {
    // Lógica para cancelar o limpiar el formulario
    redirect("/fichas");
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleGuardar();
      }}
    >
      <div className="mb-4">
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Número de ficha de inscripción
        </label>
        <input
          type="text"
          value={`FIC-${(lastFichaInscripcion.FicNum + 1)
            .toString()
            .padStart(4, "0")}`}
          readOnly
          className="w-full border rounded-lg px-3 py-2 bg-gray-100 text-gray-500 text-sm"
        />
      </div>

      {/* Seleccionar socio */}
      <div className="mb-4">
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Seleccionar socio
        </label>
        <select
          value={socio}
          onChange={(e) => setSocio(e.target.value)}
          className="w-full border rounded-lg px-3 py-2 text-sm"
          required
        >
          <option value="" disabled>
            Selecciona un socio
          </option>
          {socios
            ?.filter((socio) => socio.SocEstReg === "A")
            .map((socio) => {
              return (
                <option key={socio.SocCod} value={socio.SocCod}>
                  {`SOC-${socio.SocCod.toString().padStart(4, "0")} - ${
                    socio.SocNom
                  }`}
                </option>
              );
            })}
        </select>
      </div>

      {/* Seleccionar deporte */}
      <div className="mb-4">
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Seleccionar deporte
        </label>
        <select
          value={deporte}
          onChange={(e) => setDeporte(e.target.value)}
          className="w-full border rounded-lg px-3 py-2 text-sm"
          required
        >
          <option value="" disabled>
            Selecciona un deporte
          </option>
          {deportes
            ?.filter((deporte) => deporte.DepEstReg === "A")
            .map((deporte) => {
              return (
                <option key={deporte.DepCod} value={deporte.DepCod}>
                  {`DEP-${deporte.DepCod.toString().padStart(4, "0")} - ${
                    deporte.DepNom
                  }`}
                </option>
              );
            })}
        </select>
      </div>

      {/* Fecha de inicio */}
      <div className="mb-4">
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Fecha inicio de inscripción
        </label>
        <div className="relative">
          <input
            type="date"
            value={fechaInicio}
            onChange={(e) => setFechaInicio(e.target.value)}
            className="w-full border rounded-lg px-3 py-2 text-sm"
            required
          />
        </div>
      </div>

      {/* Monto */}
      <div className="mb-4">
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Monto (en soles)
        </label>
        <input
          type="number"
          value={monto}
          onChange={(e) => setMonto(e.target.value)}
          placeholder="S/. 0.00"
          className="w-full border rounded-lg px-3 py-2 text-sm"
          required
        />
      </div>

      {/* Botones */}
      <div className="flex justify-between">
        <button
          type="submit"
          className="flex items-center justify-center bg-[#28A745] text-white px-4 py-2 rounded-lg hover:bg-[#469759] text-sm"
        >
          <FaSave className="mr-2" /> Guardar
        </button>
        <button
          onClick={handleCancelar}
          className="flex items-center justify-center bg-[#3473B1] text-white px-4 py-2 rounded-lg hover:bg-[#30669c] text-sm"
        >
          <FaTimes className="mr-2" /> Cancelar
        </button>
      </div>
    </form>
  );
};
