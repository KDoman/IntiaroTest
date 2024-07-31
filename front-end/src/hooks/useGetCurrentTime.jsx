import { useEffect, useState } from "react";

export function useGetCurrentTime() {
  const [time, setTime] = useState(null);
  useEffect(() => {
    const updateCurrentTime = () => {
      const currentDate = new Date();
      setTime(currentDate.toString().slice(16, 24));
    };
    updateCurrentTime();
    const intervalID = setInterval(updateCurrentTime, 1000);

    return () => clearInterval(intervalID);
  }, []);
  return time;
}
