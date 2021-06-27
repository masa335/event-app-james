/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import { useCallback, useState } from "react";
import { useHistory } from "react-router-dom";
import { Event } from "../types/event";
import { useMessage } from "./useMessage";

axios.defaults.baseURL = 'http://192.168.10.2:3001';

export const useCreateEvent = () => {
  const history = useHistory();
  const { showMessage } = useMessage();

  const [loading, setLoading] = useState(false);

  axios.defaults.withCredentials = true;

  const createEvent = useCallback((params: Event) => {
    setLoading(true);
    axios
    .post("/api/v1/events",params)
    .then((res) => {
      console.log(res.data);
      showMessage({ title: "イベントを作成しました", status: "success" });
      history.push("/user");
    })
    .catch(() => {
      showMessage({ title: "イベントを作成できませんでした", status: "error" });
    })
    .finally(() => setLoading(false));
  },[]);

  return { createEvent, loading }
};