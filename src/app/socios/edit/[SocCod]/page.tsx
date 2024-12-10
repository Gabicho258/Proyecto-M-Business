import { FormEditSocio } from "@/components/socios/FormEditSocio";
import { getSocioById } from "@/utils/api";

export const metadata = {
  title: "Editar socio",
  description: "Editar socio",
};

interface Segments {
  params: Promise<{
    SocCod: string;
  }>;
}
export default async function EditarDeporte({ params }: Segments) {
  const { SocCod } = await params;
  const socio = await getSocioById(parseInt(SocCod));

  return (
    <main className="flex flex-col items-center">
      <h1 className="text-xl w-64 text-center mt-20 mb-6 font-semibold">
        Editar Socio {`SOC-${SocCod.toString().padStart(4, "0")}`}
      </h1>
      <div className="  border-solid border-black w-72 flex flex-col">
        <FormEditSocio isEditing={true} socio={socio} />
      </div>
    </main>
  );
}
