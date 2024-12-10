import { FormEditSocio } from "@/components/socios/FormEditSocio";
import { getSocioById } from "@/utils/api";
import { Metadata } from "next";

interface Segments {
  params: Promise<{
    SocCod: string;
  }>;
}

export const metadata: Metadata = {
  title: "Ver Socio",
  description: "Ver Socio",
};

export default async function VerSocio({ params }: Segments) {
  const { SocCod } = await params;
  const socio = await getSocioById(parseInt(SocCod));

  return (
    <main className="flex flex-col items-center">
      <h1 className="text-xl w-64 text-center mt-20 mb-6 font-semibold">
        Ver Socio {`SOC-${SocCod.toString().padStart(4, "0")}`}
      </h1>
      <div className="  border-solid border-black w-72 flex flex-col">
        <FormEditSocio isEditing={false} socio={socio} />
      </div>
    </main>
  );
}
