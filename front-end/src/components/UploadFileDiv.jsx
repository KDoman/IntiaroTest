export function UploadFileDiv({ onChange, isDisabled }) {
  return (
    <>
      <div className="w-1/2 mx-auto">
        <div className={`border-dashed border-5 rounded-3xl cursor-pointer`}>
          <input
            type="file"
            id="file_input"
            onChange={onChange}
            disabled={isDisabled}
            className={`file:mr-4 file:py-2 file:px-4 min-w-full cursor-pointer border-2 p-3 rounded-xl file:hover:cursor-pointer border-none file:border-none file:rounded-lg file:bg-zinc-200 hover:file:bg-zinc-300 file:transition-colors max-w-full ${
              isDisabled ? "pointer-events-none cursor-not-allowed" : ""
            }`}
          />
        </div>
      </div>
    </>
  );
}
