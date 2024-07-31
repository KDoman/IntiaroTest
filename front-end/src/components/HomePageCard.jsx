export function HopePageCard({ children, imgSrc }) {
  return (
    <div
      className={`w-[300px] h-[150px] flex flex-col justify-center items-center  p-8 rounded-lg shadow-[0_0_5px_var(--border-and-shadow-color)] hover:shadow-[0_0_15px_var(--border-and-shadow-color)]  hover:scale-105 transition-all`}
    >
      <img src={imgSrc} className="mb-4 max-w-12" />
      {children}
    </div>
  );
}
