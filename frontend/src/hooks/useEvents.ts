import axiosBaseUrl from "../config/axiosBaseUrl";
import { useCallback, useState } from "react";
import { useHistory } from "react-router-dom";
import { Event } from "../types/event";
import { useMessage } from "./useMessage";

export const useEvents = () => {
  const axios = axiosBaseUrl;
  const [loading, setLoading] = useState(false);
  const [events, setEvents] = useState<Array<Event>>([]);
  const [event, setEvent] = useState<Event>();

  const { showMessage } = useMessage();
  const history = useHistory();

  const getAllEvents = useCallback(() => {
    setLoading(true);
    axios
    .get<Array<Event>>("/api/v1/events")
    .then((res) => setEvents(res.data))
    .catch((err) => {
      console.log(err);
      alert("イベントの取得に失敗しました。");
    })
    .finally(() => setLoading(false));
  },[]);

  const getEvent = useCallback((id: string) => {
    setLoading(true);
    axios
    .get<Event>(`/api/v1/events/${id}`)
    .then((res) => setEvent(res.data))
    .catch(() => {
      alert("イベントの取得に失敗しました。");
    })
    .finally(() => setLoading(false));
  },[]);

  const searchEvent = useCallback((params) => {
    setLoading(true);
    axios
    .get<Array<Event>>("/api/v1/events/search", {params: params})
    .then((res) => setEvents(res.data))
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

  const deleteEvent = useCallback((eventId: string | undefined, userId: number | undefined) => {
    setLoading(true);
    axios
    .delete<Event>(`/api/v1/events/${eventId}`)
    .then((res) => {
      console.log(res.data);
      showMessage({ title: "イベントを削除しました", status: "success" });
      history.push(`/user/${userId}`)
    })
    .catch(() => {
      showMessage({ title: "イベントを削除できませんでした", status: "error" });
    })
    .finally(() => setLoading(false));
  },[]);

  return { getAllEvents, getEvent, updateEvent, deleteEvent, searchEvent, events, event, loading }
};