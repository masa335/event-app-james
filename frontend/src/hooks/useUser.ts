import axios from "axios";
import { useCallback, useState } from "react";
import { useHistory } from "react-router-dom";
import { User } from "../types/user";
import { useMessage } from "./useMessage";

axios.defaults.baseURL = 'http://192.168.10.2:3001';

export const useUser = () => {
  const [loading, setLoading] = useState(false);
  const [userInfo, setUserInfo] = useState<User>();

  const { showMessage } = useMessage();
  const history = useHistory();

  const getUserInfo = useCallback((userId: string | number | undefined) => {
    setLoading(true);
    axios
    .get<User>(`/api/v1/users/${userId}`)
    .then((res) => setUserInfo(res.data))
    .catch(() => {
      console.log("ユーザー情報の取得に失敗しました。");
    })
    .finally(() => setLoading(false));
  },[]);

  const updateUserInfo = useCallback((userId: number | undefined, params: FormData) => {
    setLoading(true);
    axios
    .put<User>(`/api/v1/users/${userId}`, params, {headers:{ "Content-Type": "multipart/form-data" }})
    .then((res) => {
      setUserInfo(res.data);
      showMessage({ title: "プロフィールを更新しました", status: "success" });
      history.push(`/user/${userId}`)
    })
    .catch(() => {
      showMessage({ title: "プロフィールを更新できませんでした", status: "error" });
    })
    .finally(() => setLoading(false));
  },[]);

  return { getUserInfo, userInfo, updateUserInfo, loading, }
};
