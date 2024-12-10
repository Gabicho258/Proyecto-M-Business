import { HomeItem } from "@/components/HomeItem";
import React from "react";

export const metadata = {
  title: "Administración de inscripciones de deportes",
  description: "Administración de inscripciones de deportes",
};

const listItems = [
  {
    title: "Fichas de inscripción",
    imageUrl:
      "https://raw.githubusercontent.com/Gabicho258/Proyecto-M-Business/refs/heads/master/src/assets/ficha.png",
    path: "/fichas",
  },
  {
    title: "Socios",
    imageUrl:
      "https://raw.githubusercontent.com/Gabicho258/Proyecto-M-Business/refs/heads/master/src/assets/socio.png",
    path: "/socios",
  },
  {
    title: "Deportes",
    imageUrl:
      "https://raw.githubusercontent.com/Gabicho258/Proyecto-M-Business/refs/heads/master/src/assets/deporte.png",
    path: "/deportes",
  },
];

export default function Home() {
  return (
    <main className="flex flex-col items-center">
      <h1 className="text-xl w-60 text-center mt-20 mb-6 font-semibold">
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
