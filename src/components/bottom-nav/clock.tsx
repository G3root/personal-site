import { createSignal, onMount, onCleanup } from "solid-js";

export default function Clock() {
  const [lastUpdate, setLastUpdate] = createSignal(Date.now());

  onMount(() => {
    const timer = setInterval(() => {
      setLastUpdate(Date.now());
    }, 1000);
    onCleanup(() => {
      clearInterval(timer);
    });
  });

  const timeString = () =>
    Intl.DateTimeFormat("en-US", {
      timeZone: "Asia/Colombo",
      timeStyle: "medium",
    }).format(new Date(lastUpdate()));

  return <>{timeString()}</>;
}
