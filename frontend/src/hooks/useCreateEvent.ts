/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import { useCallback, useState } from "react";
import { useHistory } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { authState } from "../recoil/atoms/Auth";
import { useMessage } from "./useMessage";

axios.defaults.baseURL = 'http://192.168.10.2:3001';

export const useCreateEvent = () => {
  const history = useHistory();
  const { showMessage } = useMessage();
  const auth = useRecoilValue(authState);

  const userId = auth.currentUser?.id

  const [loading, setLoading] = useState(false);

  const createEvent = useCallback((params: FormData) => {
    setLoading(true);
    axios
    .post("/api/v1/events",params)
    .then((res) => {
      console.log(res.data);
      showMessage({ title: "イベントを作成しました", status: "success" });
      history.push(`/user/${userId}`);
    })
    .catch(() => {
      showMessage({ title: "イベントを作成できませんでした", status: "error" });
    })
    .finally(() => setLoading(false));
  },[]);

  return { createEvent, loading }
};