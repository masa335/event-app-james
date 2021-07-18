import axios from "axios";
import { useCallback, useState } from "react";
import { Event } from "../types/event";

export const useEvents = () => {
  const [loading, setLoading] = useState(false);
  const [events, setEvents] = useState<Array<Event>>([]);
  const [event, setEvent] = useState<Event>();

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

  // const updateEvent = useCallback((userId: number | undefined, params: FormData) => {
  //   setLoading(true);
  //   axios
  //   .put<User>(`/api/v1/users/${userId}`, params, {headers:{ "Content-Type": "multipart/form-data" }})
  //   .then((res) => {
  //     setUserInfo(res.data);
  //     showMessage({ title: "プロフィールを更新しました", status: "success" });
  //     history.push(`/user/${userId}`)
  //   })
  //   .catch(() => {
  //     showMessage({ title: "プロフィールを更新できませんでした", status: "error" });
  //   })
  //   .finally(() => setLoading(false));
  // },[]);

  return { getAllEvents, getEvent, events, event, loading }
};