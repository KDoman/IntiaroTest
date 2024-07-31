import ERROR_LOGO from "../assets/error.svg";

export function ErrorMessage({ children }) {
  return (
    <div className="px-8 py-4 border-red-400 border-4 rounded-xl bg-red-100 flex items-center">
      <img src={ERROR_LOGO} alt="" className="max-w-8 mr-5" />
      <p>{children}</p>
    </div>
  );
}
