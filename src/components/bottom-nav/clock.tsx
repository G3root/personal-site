import { useEffect, useState } from "preact/hooks";

export default function Clock() {
  const [lastUpdate, setLastUpdate] = useState(() => Date.now());
  const timeString = Intl.DateTimeFormat("en-US", {
    timeZone: "Asia/Colombo",
    timeStyle: "medium",
  }).format(new Date(lastUpdate));
  useEffect(() => {
    const timer = setInterval(() => {
      setLastUpdate(Date.now());
    }, 1000);
    return () => {
      clearInterval(timer);
    };
  }, [setLastUpdate]);

  return <>{timeString}</>;
}
