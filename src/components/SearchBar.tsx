"use client";

import { CiSearch } from "react-icons/ci";

interface SearchProps {
  text: string;
  onChangeInput: (value: string) => void;
}

export const SearchBar = ({ text, onChangeInput }: SearchProps) => {
  return (
    <>
      <div className="flex flex-row rounded-xl bg-white p-1 h-9 my-2 border border-[#333333]">
        <input
          type="text"
          className="w-10/12 border-none outline-none ml-4 "
          value={text}
          placeholder="Buscar..."
          onChange={({ target }) => onChangeInput(target.value)}
        />
        <div className="flex items-center justify-center rounded-tr-[5rem] rounded-br-[5rem]">
          <CiSearch size={18} />
        </div>
      </div>
    </>
  );
};
