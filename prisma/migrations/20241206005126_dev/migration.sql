-- CreateTable
CREATE TABLE "SOCIOS" (
    "SocCod" SERIAL NOT NULL,
    "SocNom" TEXT NOT NULL,
    "SocEstReg" TEXT NOT NULL,

    CONSTRAINT "SOCIOS_pkey" PRIMARY KEY ("SocCod")
);

-- CreateTable
CREATE TABLE "TIPOS_DEPORTE" (
    "DepCod" SERIAL NOT NULL,
    "DepNom" TEXT NOT NULL,
    "DepEstReg" TEXT NOT NULL,

    CONSTRAINT "TIPOS_DEPORTE_pkey" PRIMARY KEY ("DepCod")
);

-- CreateTable
CREATE TABLE "FICHAS_INSCRIPCION" (
    "FicNum" SERIAL NOT NULL,
    "FicSocCod" INTEGER NOT NULL,
    "FicDepCod" INTEGER NOT NULL,
    "FicFecDia" TEXT NOT NULL,
    "FicFecMes" TEXT NOT NULL,
    "FicFecAno" TEXT NOT NULL,
    "FicMon" DECIMAL(65,30) NOT NULL,
    "FicEstReg" TEXT NOT NULL,

    CONSTRAINT "FICHAS_INSCRIPCION_pkey" PRIMARY KEY ("FicNum")
);