import { FormEditFicha } from "@/components/fichas/FormEditFicha";
import { getDeportes, getFichaInscripcionById, getSocios } from "@/utils/api";
import { Metadata } from "next";

interface Segments {
  params: Promise<{
    FicNum: string;
  }>;
}

export const metadata: Metadata = {
  title: "Ver Ficha de inscripción",
  description: "Ver Ficha de inscripción",
};

export default async function VerFicha({ params }: Segments) {
  const { FicNum } = await params;
  const ficha = await getFichaInscripcionById(parseInt(FicNum));
  const socios = await getSocios();
  const deportes = await getDeportes();

  return (
    <main className="flex flex-col items-center">
      <h1 className="text-xl w-64 text-center mt-20 mb-6 font-semibold">
        Ver Ficha {`FIC-${FicNum.toString().padStart(4, "0")}`}
      </h1>
      <div className="  border-solid border-black w-72 flex flex-col">
        <FormEditFicha
          isEditing={false}
          socios={socios}
          deportes={deportes}
          ficha={ficha}
        />
      </div>
    </main>
  );
}
