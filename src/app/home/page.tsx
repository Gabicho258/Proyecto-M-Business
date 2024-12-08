import { HomeItem } from "@/components/HomeItem";
import React from "react";

export default function Home() {
  return (
    <main className="flex flex-col items-center">
      <h1 className="text-xl w-60 text-center ">
        Administración de inscripciones de deportes
      </h1>
      <div>
        <HomeItem
          title="Fichas de inscripción"
          imageUrl="https://raw.githubusercontent.com/Gabicho258/Proyecto-M-Business/refs/heads/master/src/assets/ficha.png"
        />
      </div>
    </main>
  );
}
