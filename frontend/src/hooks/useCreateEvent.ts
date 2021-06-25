import axios from "axios";
import { useCallback, useState } from "react";
import { useHistory } from "react-router-dom";
import { Event } from "../types/event";

axios.defaults.baseURL = 'http://192.168.10.2:3001';

export const useCreateEvent = () => {
  const history = useHistory();
  const [loading, setLoading] = useState(false);

  axios.defaults.withCredentials = true;

  const createEvent = useCallback((params: Event) => {
    setLoading(true);
    axios
    .post("/api/v1/events",params)
    .then((res) => {
      console.log(res.data);
      history.push("/user");
    })
    .catch(() => {
      alert("イベントを作成できませんでした。");
    })
    .finally(() => setLoading(false));
  },[]);

  return { createEvent, loading }
};