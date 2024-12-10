import { FormEditDeporte } from "@/components/deportes/FormEditDeporte";
import { getDeporteById } from "@/utils/api";

export const metadata = {
  title: "Editar deporte",
  description: "Editar deporte",
};

interface Segments {
  params: Promise<{
    DepCod: string;
  }>;
}
export default async function EditarDeporte({ params }: Segments) {
  const { DepCod } = await params;
  const deporte = await getDeporteById(parseInt(DepCod));

  return (
    <main className="flex flex-col items-center">
      <h1 className="text-xl w-64 text-center mt-20 mb-6 font-semibold">
        Editar Deporte {`DEP-${DepCod.toString().padStart(4, "0")}`}
      </h1>
      <div className="  border-solid border-black w-72 flex flex-col">
        <FormEditDeporte isEditing={true} deporte={deporte} />
      </div>
    </main>
  );
}
