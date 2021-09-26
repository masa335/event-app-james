/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import Cookies from "js-cookie";
import { useCallback, useState } from "react";
import { useMessage } from "./useMessage";

axios.defaults.baseURL = 'http://localhost:3000';

export const useMemberships = () => {
  const { showMessage } = useMessage();

  const [loading, setLoading] = useState(false);

  const createMemberships = useCallback((eventId: number) => {
    setLoading(true);
    axios
    .post(`/api/v1/events/${eventId}/memberships`, "", { headers: {
      "access-token": Cookies.get("_access_token"),
      "client": Cookies.get("_client"),
      "uid": Cookies.get("_uid")
    }})
    .then((res) => {
      console.log(res.data);
      showMessage({ title: "参加しました", status: "success" });
    })
    .catch(() => {
      showMessage({ title: "エラーが発生しました", status: "error" });
    })
    .finally(() => setLoading(false));
  },[]);

  const deleteMemberships = useCallback((eventId: number) => {
    setLoading(true);
    axios
    .delete(`/api/v1/events/${eventId}/memberships`, { headers: {
      "access-token": Cookies.get("_access_token"),
      "client": Cookies.get("_client"),
      "uid": Cookies.get("_uid")
    }})
    .then((res) => {
      console.log(res.data);
      showMessage({ title: "参加を取り消しました", status: "success" });
    })
    .catch(() => {
      showMessage({ title: "エラーが発生しました", status: "error" });
    })
    .finally(() => setLoading(false));
  },[]);

  return { createMemberships, deleteMemberships, loading }
};