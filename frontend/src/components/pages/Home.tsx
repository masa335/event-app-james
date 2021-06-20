import { useEffect } from "react";
import { memo, VFC } from "react";
import { useAllEvents } from "../../hooks/useAllEvents";

export const Home: VFC = memo(() => {
  const {getEvents, events, loading} = useAllEvents();

  //ページを開いた時にだけ実行する
  useEffect(() => getEvents(),[])

  return (
    <div>
      {events.map((event) => (
        <p key={event.id}>{event.event_name}</p>
      ))}
    </div>
  );
});