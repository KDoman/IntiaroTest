import { getCurrentDate } from "../helpers/getCurrentDate";
import { useGetCurrentTime } from "../hooks/useGetCurrentTime";

export function TopBar() {
  const date = getCurrentDate();
  const time = useGetCurrentTime();
  return (
    <div className="border-b-1 border-[var(--border-and-shadow-color)] col-start-2 row-start-1 flex justify-end items-center text-lg">
      <p className="mr-3">{date}</p>
      <p className="mr-5">{time}</p>
    </div>
  );
}
