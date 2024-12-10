"use client";

import { createSocio } from "@/utils/api";
import { Socio } from "@prisma/client";
import { redirect } from "next/navigation";
import { useState } from "react";
import { FaSave, FaTimes } from "react-icons/fa";

interface Props {
  socios: Socio[];
}

export const FormCreateSocio = ({ socios }: Props) => {
  const [socioName, setSocioName] = useState("");
  const [socioLastName, setSocioLastName] = useState("");

  const lastSocio =
    socios.length === 0
      ? { SocCod: 0 }
      : socios.reduce((max, current) => {
          return current.SocCod > max.SocCod ? current : max;
        });

  const handleGuardar = async () => {
    if (socioName && socioLastName) {
      const socioToCreate = {
        SocNom: `${socioName.trim()} ${socioLastName.trim()}`,
      };
      const created = await createSocio(socioToCreate);
      return created ? redirect("/socios/") : alert("Falló la creación");
    }
  };

  const handleCancelar = () => {
    redirect("/socios");
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
          value={`SOC-${(lastSocio.SocCod + 1).toString().padStart(4, "0")}`}
          readOnly
          className="w-full border rounded-lg px-3 py-2 bg-gray-100 text-gray-500 text-sm"
        />
      </div>

      {/* Nombres del socio*/}

      <div className="mb-4">
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Nombres
        </label>
        <input
          type="text"
          value={socioName}
          onChange={(e) => setSocioName(e.target.value)}
          placeholder="Nombres..."
          className="w-full border rounded-lg px-3 py-2 text-sm"
          required
        />
      </div>

      {/* Apellidos del socio*/}

      <div className="mb-4">
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Apellidos
        </label>
        <input
          type="text"
          value={socioLastName}
          onChange={(e) => setSocioLastName(e.target.value)}
          placeholder="Apellidos..."
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
