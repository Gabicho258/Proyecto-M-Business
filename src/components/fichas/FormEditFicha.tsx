"use client";

import { updateFichaInscripcion } from "@/utils/api";
import { Deporte, FichaInscripcion, Prisma, Socio } from "@prisma/client";
import Link from "next/link";
import { redirect } from "next/navigation";
import { JSX, useEffect, useState } from "react";
import { FaEdit, FaPowerOff, FaSave, FaTimes } from "react-icons/fa";
import { IoMdRemoveCircleOutline } from "react-icons/io";
import { RiProhibitedLine } from "react-icons/ri";
import { TbArrowBack } from "react-icons/tb";

interface Props {
  isEditing: boolean;
  socios: Socio[];
  deportes: Deporte[];
  ficha: FichaInscripcion;
}

interface ChangeStateButton {
  label: "Inactivar" | "Eliminar" | "Activar";
  color: "#FFC107" | "#DC3545" | "#10A1B8";
  onClick: () => void;
  icon: JSX.Element;
}

export const FormEditFicha = ({
  deportes,
  ficha,
  socios,
  isEditing,
}: Props) => {
  const {
    FicDepCod,
    FicEstReg,
    FicFecAno,
    FicFecDia,
    FicFecMes,
    FicMon,
    FicNum,
    FicSocCod,
  } = ficha;
  const [socio, setSocio] = useState(FicSocCod);
  const [deporte, setDeporte] = useState(FicDepCod);
  const [fechaInicio, setFechaInicio] = useState(
    `${FicFecAno}-${FicFecMes}-${FicFecDia}`
  );
  const [monto, setMonto] = useState(`${new Number(FicMon)}`);
  const [estadoRegistro] = useState(FicEstReg);
  const [buttons, setButtons] = useState<ChangeStateButton[]>();

  const handleGuardar = async () => {
    if (socio && deporte && fechaInicio && monto) {
      const fichaToUpdate = {
        FicSocCod: socio,
        FicDepCod: deporte,
        FicFecAno: fechaInicio.slice(0, 4),
        FicFecMes: fechaInicio.slice(5, 7),
        FicFecDia: fechaInicio.slice(8, 10),
        FicMon: new Prisma.Decimal(monto),
      };
      const updated = await updateFichaInscripcion(FicNum, fichaToUpdate);
      return updated
        ? redirect(`/fichas/${FicNum}`)
        : alert("Falló la creación");
    }
  };

  const handleActivar = async () => {
    const updated = await updateFichaInscripcion(FicNum, { FicEstReg: "A" });
    return updated ? redirect(`/fichas/${FicNum}`) : alert("Falló la creación");
  };
  const handleInactivar = async () => {
    const updated = await updateFichaInscripcion(FicNum, { FicEstReg: "I" });
    return updated ? redirect(`/fichas/${FicNum}`) : alert("Falló la creación");
  };
  const handleEliminar = async () => {
    const updated = await updateFichaInscripcion(FicNum, { FicEstReg: "*" });
    return updated ? redirect(`/fichas/${FicNum}`) : alert("Falló la creación");
  };

  useEffect(() => {
    let buttonArray: ChangeStateButton[] = [];

    if (FicEstReg === "A") {
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
    } else if (FicEstReg === "*") {
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
    } else if (FicEstReg === "I") {
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
  }, [FicEstReg]);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleGuardar();
      }}
    >
      {/* Seleccionar socio */}
      <div className="mb-4">
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Seleccionar socio
        </label>
        <select
          value={socio}
          onChange={(e) => setSocio(parseInt(e.target.value))}
          className="w-full border rounded-lg px-3 py-2 text-sm"
          required
          disabled={!isEditing}
        >
          <option value="" disabled>
            Selecciona un socio
          </option>
          {socios
            ?.filter(
              (socio) => socio.SocEstReg === "A" || socio.SocCod === FicSocCod
            )
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
          onChange={(e) => setDeporte(parseInt(e.target.value))}
          className="w-full border rounded-lg px-3 py-2 text-sm"
          required
          disabled={!isEditing}
        >
          <option value="" disabled>
            Selecciona un deporte
          </option>
          {deportes
            ?.filter(
              (deporte) =>
                deporte.DepEstReg === "A" || deporte.DepCod === FicDepCod
            )
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
            readOnly={!isEditing}
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
          min={0}
          onChange={(e) => setMonto(e.target.value)}
          placeholder="S/. 0.00"
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
              href={`/fichas/${FicNum}`}
              className="flex items-center justify-center bg-[#3473B1] text-white px-4 py-2 rounded-lg hover:bg-[#30669c]  text-sm"
            >
              <FaTimes className="mr-2" /> Cancelar
            </Link>
          </div>
        </div>
      ) : (
        <div className="flex flex-col">
          <Link
            href={`/fichas/edit/${FicNum}`}
            className="flex items-center justify-center bg-[#FFC107] text-white px-4 py-2 rounded-lg hover:bg-[#f3c436] text-sm mb-6"
          >
            <FaEdit className="mr-2" /> Editar
          </Link>
          <Link
            href={"/fichas"}
            className="flex items-center justify-center bg-[#DC3545] text-white px-4 py-2 rounded-lg hover:bg-[#d13747] text-sm"
          >
            <TbArrowBack className="mr-2" /> Volver
          </Link>
        </div>
      )}
    </form>
  );
};
