import axios from "axios";
import { useCallback, useState } from "react";
import { Event } from "../types/event";

export const useAllEvents = () => {
  const [loading, setLoading] = useState(false);
  const [events, setEvents] = useState<Array<Event>>([]);

  const getEvents = useCallback((userId: string | undefined) => {
    setLoading(true);
    axios
    .get<Array<Event>>("http://192.168.10.2:3001/api/v1/events" + (userId ? `?user_id=${userId}` : ""))
    .then((res) => setEvents(res.data))
    .catch(() => {
      alert("イベントの取得に失敗しました。");
    })
    .finally(() => setLoading(false));
  },[]);

  return { getEvents, loading, events }
};