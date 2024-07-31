export function CenteredContainer({ children }) {
  return (
    <div className="mx-8">
      <div className="max-w-[1600px] my-8 shadow-[0px_0px_5px_var(--border-and-shadow-color)] rounded-2xl relative mx-auto bg-[var(--main-theme-color)]">
        {children}
      </div>
    </div>
  );
}
