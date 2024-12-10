import { FormEditFicha } from "@/components/fichas/FormEditFicha";
import { getDeportes, getFichaInscripcionById, getSocios } from "@/utils/api";

export const metadata = {
  title: "Editar ficha de inscripción",
  description: "Editar ficha de inscripción",
};

interface Segments {
  params: Promise<{
    FicNum: string;
  }>;
}
export default async function EditarFicha({ params }: Segments) {
  const { FicNum } = await params;
  const ficha = await getFichaInscripcionById(parseInt(FicNum));
  const socios = await getSocios();
  const deportes = await getDeportes();

  return (
    <main className="flex flex-col items-center">
      <h1 className="text-xl w-64 text-center mt-20 mb-6 font-semibold">
        Editar Ficha {`FIC-${FicNum.toString().padStart(4, "0")}`}
      </h1>
      <div className="  border-solid border-black w-72 flex flex-col">
        <FormEditFicha
          isEditing={true}
          socios={socios}
          deportes={deportes}
          ficha={ficha}
        />
      </div>
    </main>
  );
}
