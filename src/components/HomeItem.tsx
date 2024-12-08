import Image from "next/image";

interface Params {
  title: string;
  imageUrl: string;
}

export const HomeItem = ({ title, imageUrl }: Params) => {
  return (
    <div className="w-80 h-24 bg-[#003366] rounded-[14px] m-6 flex flex-row justify-center p-4 items-center">
      <Image
        className="object-contain "
        src={imageUrl}
        alt={title}
        layout="intrinsic" // Esto ajusta la imagen a sus dimensiones originales
        width={63}
        height={63}
      />
      <span className="text-white text-lg w-3/5 p-2 pl-10 leading-6 text-left">
        {title}
      </span>
    </div>
  );
};
