interface Params {
  title: string;
  imageUrl: string;
}

export const HomeItem = ({ title, imageUrl }: Params) => {
  return (
    <div className="w-80 h-24 bg-[#003366] rounded-[14px] m-6">
      <img
        className="w-full h-full object-cover rounded-[14px]"
        src={imageUrl}
        alt={title}
      />
      <h2 className="text-white text-center text-sm font-[family-name:var(--font-geist-mono)]">
        {title}
      </h2>
    </div>
  );
};
