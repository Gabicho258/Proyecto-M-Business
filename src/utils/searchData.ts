export const searchData = <T>(data: T[], searchKey: keyof T, text: string) => {
  if (text.trim().length < 2) return data;

  return data.filter((item) =>
    String(item[searchKey])
      .toLocaleLowerCase()
      .includes(text.toLocaleLowerCase().trim())
  );
};
