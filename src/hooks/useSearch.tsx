"use client";

import { useState } from "react";

interface useSearchParams<T> {
  data: T[] | undefined;
  searchKey: keyof T;
  order?: string;
}

export const useSearch = <T,>({
  data,
  searchKey,
  order,
}: useSearchParams<T>) => {
  const [text, setText] = useState("");

  const onChangeInput = (value: string) => {
    setText(value);
  };

  const result =
    text.toLocaleLowerCase().trim().length >= 1
      ? data?.filter((item) =>
          String(item[searchKey])
            .toLocaleLowerCase()
            .trim()
            .includes(text.toLocaleLowerCase().trim())
        )
      : data;

  if (order) {
    result?.sort((a, b) => {
      if (order === "asc") {
        return (
          Number.parseInt(String(a[searchKey])) -
          Number.parseInt(String(b[searchKey]))
        );
      } else {
        return (
          Number.parseInt(String(b[searchKey])) -
          Number.parseInt(String(a[searchKey]))
        );
      }
    });
  }

  return { text, onChangeInput, result };
};
