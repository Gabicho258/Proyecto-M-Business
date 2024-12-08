import { HomeItem } from "@/components/HomeItem";
import React from "react";

export default function Home() {
  return (
    <main className="flex flex-col items-center">
      <h1 className="text-xl w-60 text-center ">
        Administración de inscripciones de deportes
      </h1>
      <div>
        <HomeItem title="Hola" imageUrl="asdasd" />
      </div>
    </main>
  );
}
