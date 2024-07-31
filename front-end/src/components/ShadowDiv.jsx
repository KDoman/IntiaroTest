export function ShadowDiv({ children, className }) {
  return (
    <div
      className={`rounded-lg shadow-[0_0_5px_var(--border-and-shadow-color)] ${className}`}
    >
      {children}
    </div>
  );
}
