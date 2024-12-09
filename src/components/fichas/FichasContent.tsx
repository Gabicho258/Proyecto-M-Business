"use client";

import { useState } from "react";
import { SearchBar } from "../SearchBar";
import { IoMdAdd } from "react-icons/io";
import { useSearch } from "@/hooks/useSearch";
import { FichaItem } from "./FichaItem";
import { FichaConDeporte } from "@/utils/api";
import Link from "next/link";

interface Props {
  data: FichaConDeporte[];
}

export const FichasContent = ({ data }: Props) => {
  const [selectedValue, setSelectedValue] = useState("");

  const { result, onChangeInput, text } = useSearch({
    data: data,
    searchKey: "FicNum",
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
          href={"/fichas/create"}
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
        {result?.map((ficha) => (
          <FichaItem key={ficha.FicNum} ficha={ficha} />
        ))}
      </div>
    </>
  );
};
