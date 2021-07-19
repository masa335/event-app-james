import axios from "axios";
import { useCallback, useState } from "react";
import { useHistory } from "react-router-dom";
import { Event } from "../types/event";
import { useMessage } from "./useMessage";

export const useEvents = () => {
  const [loading, setLoading] = useState(false);
  const [events, setEvents] = useState<Array<Event>>([]);
  const [event, setEvent] = useState<Event>();

  const { showMessage } = useMessage();
  const history = useHistory();

  const getAllEvents = useCallback(() => {
    setLoading(true);
    axios
    .get<Array<Event>>("http://192.168.10.2:3001/api/v1/events")
    .then((res) => setEvents(res.data))
    .catch(() => {
      alert("イベントの取得に失敗しました。");
    })
    .finally(() => setLoading(false));
  },[]);

  const getEvent = useCallback((id: string) => {
    setLoading(true);
    axios
    .get<Event>(`http://192.168.10.2:3001/api/v1/events/${id}`)
    .then((res) => setEvent(res.data))
    .catch(() => {
      alert("イベントの取得に失敗しました。");
    })
    .finally(() => setLoading(false));
  },[]);

  const updateEvent = useCallback((eventId: string | undefined, params: FormData) => {
    setLoading(true);
    axios
    .put<Event>(`/api/v1/events/${eventId}`, params, {headers:{ "Content-Type": "multipart/form-data" }})
    .then((res) => {
      console.log(res.data);
      showMessage({ title: "イベントを更新しました", status: "success" });
      history.push(`/user/${params.get("user_id")}`)
    })
    .catch(() => {
      showMessage({ title: "イベントを更新できませんでした", status: "error" });
    })
    .finally(() => setLoading(false));
  },[]);

  return { getAllEvents, getEvent, updateEvent, events, event, loading }
};