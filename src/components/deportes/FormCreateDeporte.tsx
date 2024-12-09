"use client";

import { createDeporte } from "@/utils/api";
import { Deporte } from "@prisma/client";
import { redirect } from "next/navigation";
import { useState } from "react";
import { FaSave, FaTimes } from "react-icons/fa";

interface Props {
  deportes: Deporte[];
}

export const FormCreateDeporte = ({ deportes }: Props) => {
  const [deporte, setDeporte] = useState("");

  const lastDeporte = deportes.reduce((max, current) => {
    return current.DepCod > max.DepCod ? current : max;
  });

  const handleGuardar = async () => {
    if (deporte) {
      const deporteToCreate = {
        DepNom: deporte,
      };
      const created = await createDeporte(deporteToCreate);
      return created ? redirect("/deportes/") : alert("Falló la creación");
    }
  };

  const handleCancelar = () => {
    redirect("/deportes");
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
          Código de deporte
        </label>
        <input
          type="text"
          value={`DEP-${(lastDeporte.DepCod + 1).toString().padStart(4, "0")}`}
          readOnly
          className="w-full border rounded-lg px-3 py-2 bg-gray-100 text-gray-500 text-sm"
        />
      </div>

      {/* Nombre del deporte*/}
      <div className="mb-4">
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Deporte
        </label>
        <input
          type="text"
          value={deporte}
          onChange={(e) => setDeporte(e.target.value)}
          placeholder="Nombre del deporte..."
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
