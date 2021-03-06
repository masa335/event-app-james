/* eslint-disable react-hooks/exhaustive-deps */
import axiosBaseUrl from "../config/axiosBaseUrl";
import Cookies from "js-cookie";
import { useCallback, useState } from "react";
import { useMessage } from "./useMessage";


export const useRelationships = () => {
  const axios = axiosBaseUrl;
  const { showMessage } = useMessage();

  const [loading, setLoading] = useState(false);

  const createRelationships = useCallback((userId: number | string) => {
    setLoading(true);
    axios
    .post(`/api/v1/users/${userId}/relationships`, "", { headers: {
      "access-token": Cookies.get("_access_token"),
      "client": Cookies.get("_client"),
      "uid": Cookies.get("_uid")
    }})
    .then((res) => {
      console.log(res.data);
     })
    .catch(() => {
      showMessage({ title: "エラーが発生しました", status: "error" });
    })
    .finally(() => setLoading(false));
  },[]);

  const deleteRelationships = useCallback((userId: number | string) => {
    setLoading(true);
    axios
    .delete(`/api/v1/users/${userId}/relationships`, { headers: {
      "access-token": Cookies.get("_access_token"),
      "client": Cookies.get("_client"),
      "uid": Cookies.get("_uid")
    }})
    .then((res) => {
      console.log(res.data);
    })
    .catch(() => {
      showMessage({ title: "エラーが発生しました", status: "error" });
    })
    .finally(() => setLoading(false));
  },[]);

  return { createRelationships, deleteRelationships, loading }
};