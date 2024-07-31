import CSS_Logo from "../assets/ccs-tools.png";
import { ListComponentSideBar } from "./ListComponentSideBar";

export function SideBar() {
  return (
    <div className=" border-r-1 border-solid border-[var(--border-and-shadow-color)] row-span-full w-full">
      <div className=" sticky top-[20px]">
        <img
          src={CSS_Logo}
          alt="CSS Tools logo"
          className="max-w-[150px] mx-auto"
        />
        <ListComponentSideBar />
      </div>
    </div>
  );
}
