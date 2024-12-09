import Image from "next/image";
import Link from "next/link";

interface Params {
  title: string;
  imageUrl: string;
  path: string;
}

export const HomeItem = ({ title, imageUrl, path }: Params) => {
  return (
    <Link href={path}>
      <div className="w-80 h-24 bg-[#003366] rounded-[14px] m-6 flex flex-row justify-center p-4 items-center">
        <Image
          className="object-contain "
          src={imageUrl}
          alt={title}
          width={63}
          height={63}
        />
        <span className="text-white text-lg w-3/5 p-2 pl-10 leading-6 text-left">
          {title}
        </span>
      </div>
    </Link>
  );
};
