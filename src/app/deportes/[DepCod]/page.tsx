import { FormEditDeporte } from "@/components/deportes/FormEditDeporte";
import { getDeporteById } from "@/utils/api";
import { Metadata } from "next";

interface Segments {
  params: Promise<{
    DepCod: string;
  }>;
}

export const metadata: Metadata = {
  title: "Ver Deporte",
  description: "Ver Deporte",
};

export default async function VerDeporte({ params }: Segments) {
  const { DepCod } = await params;
  const deporte = await getDeporteById(parseInt(DepCod));

  return (
    <main className="flex flex-col items-center">
      <h1 className="text-xl w-64 text-center mt-20 mb-6 font-semibold">
        Ver Deporte {`DEP-${DepCod.toString().padStart(4, "0")}`}
      </h1>
      <div className="  border-solid border-black w-72 flex flex-col">
        <FormEditDeporte isEditing={false} deporte={deporte} />
      </div>
    </main>
  );
}
