export function H1Component({ children, icon, customIconWidht = "4" }) {
  return (
    <div className="flex items-center justify-center my-10">
      <img
        src={icon}
        style={{ maxWidth: `${customIconWidht}rem`, marginRight: "0.5rem" }}
      />
      <h1 className="text-3xl text-center">{children}</h1>
    </div>
  );
}
