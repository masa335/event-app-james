import axios from "axios";
import { useCallback, useState } from "react";
import { User } from "../types/user";

axios.defaults.baseURL = 'http://192.168.10.2:3001';

export const useUser = () => {
  const [loading, setLoading] = useState(false);
  const [userInfo, setUserInfo] = useState<User>();

  const getUserInfo = useCallback((userId: string | undefined) => {
    setLoading(true);
    axios
    .get<User>(`/api/v1/users/${userId}`)
    .then((res) => setUserInfo(res.data))
    .catch(() => {
      console.log("ユーザー情報の取得に失敗しました。");
    })
    .finally(() => setLoading(false));
  },[]);

  return { getUserInfo, loading, userInfo }
};