import { Deporte, FichaInscripcion, Socio } from "@prisma/client";

const API_URL = "https://proyecto-m-business.vercel.app";

// const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

// Socios Endpoints

export const getSocios = async (): Promise<Socio[]> => {
  const data: Socio[] = await fetch(`${API_URL}/api/socio`)
    .then((response) => response.json())
    .catch((error) => console.log(error));
  return data;
};

export const createSocio = async (socio: Partial<Socio>): Promise<Socio> => {
  const socioCreated: Socio = await fetch(`${API_URL}/api/socio`, {
    method: "POST",
    body: JSON.stringify(socio),
  })
    .then((response) => response.json())
    .catch((error) => console.log(error));

  return socioCreated;
};

export const getSocioById = async (id: number): Promise<Socio> => {
  const data: Socio = await fetch(`${API_URL}/api/socio/${id}`)
    .then((response) => response.json())
    .catch((error) => error.json());
  return data;
};

export const updateSocio = async (
  id: number,
  socio: Partial<Socio>
): Promise<Socio> => {
  const socioUpdated: Socio = await fetch(`${API_URL}/api/socio/${id}`, {
    method: "PUT",
    body: JSON.stringify(socio),
  })
    .then((response) => response.json())
    .catch((error) => console.log(error));

  return socioUpdated;
};

// Deportes Endpoints

export const getDeportes = async (): Promise<Deporte[]> => {
  const data: Deporte[] = await fetch(`${API_URL}/api/deporte`)
    .then((response) => response.json())
    .catch((error) => console.log(error));
  return data;
};

export const getDeporteById = async (id: number): Promise<Deporte> => {
  const data: Deporte = await fetch(`${API_URL}/api/deporte/${id}`)
    .then((response) => response.json())
    .catch((error) => console.log(error));
  return data;
};

export const createDeporte = async (
  deporte: Partial<Deporte>
): Promise<Deporte> => {
  const deporteCreated: Deporte = await fetch(`${API_URL}/api/deporte`, {
    method: "POST",
    body: JSON.stringify(deporte),
  })
    .then((response) => response.json())
    .catch((error) => console.log(error));

  return deporteCreated;
};

export const updateDeporte = async (
  id: number,
  deporte: Partial<Deporte>
): Promise<Deporte> => {
  const deporteUpdated: Deporte = await fetch(`${API_URL}/api/deporte/${id}`, {
    method: "PUT",
    body: JSON.stringify(deporte),
  })
    .then((response) => response.json())
    .catch((error) => console.log(error));

  return deporteUpdated;
};

// Fichas de inscripción Endpoints

export interface FichaConDeporte extends FichaInscripcion {
  Deporte: Deporte;
}

export const getFichasIncripcion = async (): Promise<FichaConDeporte[]> => {
  const data: FichaConDeporte[] = await fetch(`${API_URL}/api/ficha`)
    .then((response) => response.json())
    .catch((error) => console.log(error));
  return data;
};

export const getFichaInscripcionById = async (
  id: number
): Promise<FichaInscripcion> => {
  const data: FichaInscripcion = await fetch(`${API_URL}/api/ficha/${id}`)
    .then((response) => response.json())
    .catch((error) => console.log(error));
  return data;
};

export const createFichaInscripcion = async (
  fichaIncripcion: Partial<FichaInscripcion>
): Promise<FichaInscripcion> => {
  const fichaCreated: FichaInscripcion = await fetch(`${API_URL}/api/ficha`, {
    method: "POST",
    body: JSON.stringify(fichaIncripcion),
  })
    .then((response) => response.json())
    .catch((error) => console.log(error));

  return fichaCreated;
};

export const updateFichaInscripcion = async (
  id: number,
  fichaIncripcion: Partial<FichaInscripcion>
): Promise<FichaInscripcion> => {
  const fichaUpdated: FichaInscripcion = await fetch(
    `${API_URL}/api/ficha/${id}`,
    {
      method: "PUT",
      body: JSON.stringify(fichaIncripcion),
    }
  )
    .then((response) => response.json())
    .catch((error) => console.log(error));

  return fichaUpdated;
};
