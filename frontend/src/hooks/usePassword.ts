import axios from "axios";
import Cookies from "js-cookie";
import { useCallback, useState } from "react";
import { useHistory } from "react-router-dom";
import { User } from "../types/user";
import { useMessage } from "./useMessage";

axios.defaults.baseURL = 'http://localhost:3000';

export const usePassword = () => {
  const { showMessage } = useMessage();
  const history = useHistory();
  const [loading, setLoading] = useState(false);

  const updatePassword = useCallback((userId: number | undefined, params) => {
    setLoading(true);
    axios
    .put<User>(`/api/v1/auth`, params, {headers:{ 
      "access-token": Cookies.get("_access_token"),
      "client": Cookies.get("_client"),
      "uid": Cookies.get("_uid")
    }})
    .then((res) => {
      console.log(res.data);
      showMessage({ title: "パスワードを更新しました", status: "success" });
      history.push(`/user/${userId}`)
    })
    .catch(() => {
      showMessage({ title: "パスワードを更新できませんでした", status: "error" });
    })
    .finally(() => setLoading(false));
  },[]);

  return { updatePassword, loading }
};

