"use client";

import { updateDeporte } from "@/utils/api";
import { Deporte } from "@prisma/client";
import Link from "next/link";
import { redirect } from "next/navigation";
import { JSX, useEffect, useState } from "react";
import { FaEdit, FaPowerOff, FaSave, FaTimes } from "react-icons/fa";
import { IoMdRemoveCircleOutline } from "react-icons/io";
import { RiProhibitedLine } from "react-icons/ri";
import { TbArrowBack } from "react-icons/tb";

interface Props {
  isEditing: boolean;
  deporte: Deporte;
}

interface ChangeStateButton {
  label: "Inactivar" | "Eliminar" | "Activar";
  color: "#FFC107" | "#DC3545" | "#10A1B8";
  onClick: () => void;
  icon: JSX.Element;
}

export const FormEditDeporte = ({ deporte, isEditing }: Props) => {
  const { DepCod, DepEstReg, DepNom } = deporte;

  const [deporteNom, setDeporteNom] = useState(DepNom);

  const [estadoRegistro] = useState(DepEstReg);
  const [buttons, setButtons] = useState<ChangeStateButton[]>();

  const handleGuardar = async () => {
    if (deporteNom) {
      const deporteToUpdate = {
        DepNom: deporteNom,
      };
      const updated = await updateDeporte(DepCod, deporteToUpdate);
      return updated
        ? redirect(`/deportes/${DepCod}`)
        : alert("Falló la creación");
    }
  };

  const handleActivar = async () => {
    const updated = await updateDeporte(DepCod, { DepEstReg: "A" });
    return updated
      ? redirect(`/deportes/${DepCod}`)
      : alert("Falló la creación");
  };
  const handleInactivar = async () => {
    const updated = await updateDeporte(DepCod, { DepEstReg: "I" });
    return updated
      ? redirect(`/deportes/${DepCod}`)
      : alert("Falló la creación");
  };
  const handleEliminar = async () => {
    const updated = await updateDeporte(DepCod, { DepEstReg: "*" });
    return updated
      ? redirect(`/deportes/${DepCod}`)
      : alert("Falló la creación");
  };

  useEffect(() => {
    let buttonArray: ChangeStateButton[] = [];

    if (DepEstReg === "A") {
      buttonArray = [
        {
          label: "Inactivar",
          color: "#FFC107",
          icon: <IoMdRemoveCircleOutline className="mr-2" />,
          onClick: handleInactivar,
        },
        {
          label: "Eliminar",
          color: "#DC3545",
          icon: <RiProhibitedLine className="mr-2" />,
          onClick: handleEliminar,
        },
      ];
    } else if (DepEstReg === "*") {
      buttonArray = [
        {
          label: "Inactivar",
          color: "#FFC107",
          icon: <IoMdRemoveCircleOutline className="mr-2" />,
          onClick: handleInactivar,
        },
        {
          label: "Activar",
          color: "#10A1B8",
          icon: <FaPowerOff className="mr-2" />,
          onClick: handleActivar,
        },
      ];
    } else if (DepEstReg === "I") {
      buttonArray = [
        {
          label: "Eliminar",
          color: "#DC3545",
          icon: <RiProhibitedLine className="mr-2" />,
          onClick: handleEliminar,
        },
        {
          label: "Activar",
          color: "#10A1B8",
          icon: <FaPowerOff className="mr-2" />,
          onClick: handleActivar,
        },
      ];
    }
    setButtons(buttonArray);
  }, [DepEstReg]);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleGuardar();
      }}
    >
      {/* Nombre del deporte */}
      <div className="mb-4">
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Deporte
        </label>
        <input
          type="text"
          value={deporteNom}
          onChange={(e) => setDeporteNom(e.target.value)}
          placeholder="Nombre del deporte..."
          className="w-full border rounded-lg px-3 py-2 text-sm"
          required
          readOnly={!isEditing}
        />
      </div>

      {/* Estado */}
      <div className="mb-4">
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Estado de registro
        </label>
        <input
          type="text"
          value={estadoRegistro}
          readOnly={true}
          className="w-full border rounded-lg px-3 py-2 bg-gray-100 text-gray-500 text-sm"
        />
      </div>

      {/* Botones */}
      {isEditing ? (
        <div className="flex justify-around flex-wrap">
          <div className="flex justify-around mb-6 w-full">
            {buttons?.map((button, index) => {
              console.log(buttons);

              return (
                <button
                  key={index}
                  style={{ backgroundColor: `${button.color}` }}
                  className={`flex items-center justify-center  text-white px-4 py-2 rounded-lg text-sm `}
                  onClick={button.onClick}
                >
                  {button.icon}
                  {button.label}
                </button>
              );
            })}
          </div>
          <div className="flex w-full justify-around">
            <button
              type="submit"
              className="flex items-center justify-center bg-[#28A745] text-white px-4 py-2 rounded-lg hover:bg-[#469759] text-sm "
            >
              <FaSave className="mr-2" /> Guardar
            </button>
            <Link
              href={`/deportes/${DepCod}`}
              className="flex items-center justify-center bg-[#3473B1] text-white px-4 py-2 rounded-lg hover:bg-[#30669c]  text-sm"
            >
              <FaTimes className="mr-2" /> Cancelar
            </Link>
          </div>
        </div>
      ) : (
        <div className="flex flex-col">
          <Link
            href={`/deportes/edit/${DepCod}`}
            className="flex items-center justify-center bg-[#FFC107] text-white px-4 py-2 rounded-lg hover:bg-[#f3c436] text-sm mb-6"
          >
            <FaEdit className="mr-2" /> Editar
          </Link>
          <Link
            href={"/deportes"}
            className="flex items-center justify-center bg-[#DC3545] text-white px-4 py-2 rounded-lg hover:bg-[#d13747] text-sm"
          >
            <TbArrowBack className="mr-2" /> Volver
          </Link>
        </div>
      )}
    </form>
  );
};
