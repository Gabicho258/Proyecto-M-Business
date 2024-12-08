import { HomeItem } from "@/components/HomeItem";
import React from "react";

const listItems = [
  {
    title: "Fichas de inscripción",
    imageUrl:
      "https://raw.githubusercontent.com/Gabicho258/Proyecto-M-Business/refs/heads/master/src/assets/ficha.png",
  },
  {
    title: "Socios",
    imageUrl:
      "https://raw.githubusercontent.com/Gabicho258/Proyecto-M-Business/refs/heads/master/src/assets/socio.png",
  },
  {
    title: "Deportes",
    imageUrl:
      "https://raw.githubusercontent.com/Gabicho258/Proyecto-M-Business/refs/heads/master/src/assets/deporte.png",
  },
];

export default function Home() {
  return (
    <main className="flex flex-col items-center">
      <h1 className="text-xl w-60 text-center mt-20 mb-6 ">
        Administración de inscripciones de deportes
      </h1>
      <div>
        {listItems.map((item) => (
          <HomeItem key={item.title} {...item} />
        ))}
      </div>
    </main>
  );
}
