"use client";

import { useSearch } from "@/hooks/useSearch";
import { Socio } from "@prisma/client";
import { useState } from "react";
import { SearchBar } from "../SearchBar";
import { IoMdAdd } from "react-icons/io";
import { SocioItem } from "./SocioItem";
import Link from "next/link";

interface Props {
  data: Socio[];
}
export const SociosContent = ({ data }: Props) => {
  const [selectedValue, setSelectedValue] = useState("");

  const { result, onChangeInput, text } = useSearch({
    data: data,
    searchKey: "SocCod",
    order: selectedValue,
  });

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedValue(event.target.value);
  };
  return (
    <>
      <div className="flex flex-row items-center">
        <SearchBar onChangeInput={onChangeInput} text={text} />
        <Link
          className="flex flex-row items-center justify-center  w-2/5 text-white bg-[#4CAF50] ml-2 py-1 p-2 rounded-xl h-9"
          href={"/socios/create"}
        >
          <IoMdAdd size={22} />
          <span>Nuevo</span>
        </Link>
      </div>
      <select
        className="w-full border border-black rounded-xl py-1.5 px-2 my-2"
        name="Orden"
        value={selectedValue}
        onChange={handleSelectChange}
      >
        <option value="" disabled hidden>
          Ordenar por...
        </option>
        <option value="asc"> Orden ascendente</option>
        <option value="des"> Orden descendente</option>
      </select>
      <div className="w-full flex flex-col items-center">
        {result?.map((socio) => (
          <SocioItem key={socio.SocCod} socio={socio} />
        ))}
      </div>
    </>
  );
};
