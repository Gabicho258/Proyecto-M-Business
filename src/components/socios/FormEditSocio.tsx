"use client";

import { updateSocio } from "@/utils/api";
import { Socio } from "@prisma/client";
import Link from "next/link";
import { redirect } from "next/navigation";
import { JSX, useEffect, useState } from "react";
import { FaEdit, FaPowerOff, FaSave, FaTimes } from "react-icons/fa";
import { IoMdRemoveCircleOutline } from "react-icons/io";
import { RiProhibitedLine } from "react-icons/ri";
import { TbArrowBack } from "react-icons/tb";

interface Props {
  isEditing: boolean;
  socio: Socio;
}

interface ChangeStateButton {
  label: "Inactivar" | "Eliminar" | "Activar";
  color: "#FFC107" | "#DC3545" | "#10A1B8";
  onClick: () => void;
  icon: JSX.Element;
}

export const FormEditSocio = ({ socio, isEditing }: Props) => {
  const { SocCod, SocEstReg, SocNom } = socio;

  const [socioNom, setSocioNom] = useState(SocNom);

  const [estadoRegistro] = useState(SocEstReg);
  const [buttons, setButtons] = useState<ChangeStateButton[]>();

  const handleGuardar = async () => {
    if (socioNom.trim() !== "") {
      const socioToUpdate = {
        SocNom: socioNom,
      };
      const updated = await updateSocio(SocCod, socioToUpdate);
      return updated
        ? redirect(`/socios/${SocCod}`)
        : alert("Falló la creación");
    }
  };

  const handleActivar = async () => {
    const updated = await updateSocio(SocCod, { SocEstReg: "A" });
    return updated ? redirect(`/socios/${SocCod}`) : alert("Falló la creación");
  };
  const handleInactivar = async () => {
    const updated = await updateSocio(SocCod, { SocEstReg: "I" });
    return updated ? redirect(`/socios/${SocCod}`) : alert("Falló la creación");
  };
  const handleEliminar = async () => {
    const updated = await updateSocio(SocCod, { SocEstReg: "*" });
    return updated ? redirect(`/socios/${SocCod}`) : alert("Falló la creación");
  };

  useEffect(() => {
    let buttonArray: ChangeStateButton[] = [];

    if (SocEstReg === "A") {
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
    } else if (SocEstReg === "*") {
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
    } else if (SocEstReg === "I") {
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
  }, [SocEstReg]);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleGuardar();
      }}
    >
      {/* Nombre del socio */}
      <div className="mb-4">
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Socio
        </label>
        <input
          type="text"
          value={socioNom}
          onChange={(e) => setSocioNom(e.target.value)}
          placeholder="Nombre del socio..."
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
              href={`/socios/${SocCod}`}
              className="flex items-center justify-center bg-[#3473B1] text-white px-4 py-2 rounded-lg hover:bg-[#30669c]  text-sm"
            >
              <FaTimes className="mr-2" /> Cancelar
            </Link>
          </div>
        </div>
      ) : (
        <div className="flex flex-col">
          <Link
            href={`/socios/edit/${SocCod}`}
            className="flex items-center justify-center bg-[#FFC107] text-white px-4 py-2 rounded-lg hover:bg-[#f3c436] text-sm mb-6"
          >
            <FaEdit className="mr-2" /> Editar
          </Link>
          <Link
            href={"/socios"}
            className="flex items-center justify-center bg-[#DC3545] text-white px-4 py-2 rounded-lg hover:bg-[#d13747] text-sm"
          >
            <TbArrowBack className="mr-2" /> Volver
          </Link>
        </div>
      )}
    </form>
  );
};
