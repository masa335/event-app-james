/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import Cookies from "js-cookie";
import { useCallback, useState } from "react";
import { useHistory } from "react-router-dom";
import { SigninParams } from "../types/signinParams";
import { useCurrentUser } from "./useCurrentUser";
import { useMessage } from "./useMessage";

axios.defaults.baseURL = 'http://192.168.10.2:3001';

export const useSignin = () => {
  const { showMessage } = useMessage();
  const history = useHistory();
  const { currentUser } = useCurrentUser();

  const [loading, setLoading] = useState(false);

  axios.defaults.withCredentials = true;

  const signin = useCallback((params: SigninParams) => {
    setLoading(true);
    axios
    .post("/api/v1/auth/sign_in",params)
    .then((res) => {
      Cookies.set("_access_token", res.headers["access-token"]);
      Cookies.set("_client", res.headers["client"]);
      Cookies.set("_uid", res.headers["uid"]);

      //グローバルステートを更新
      currentUser();

      showMessage({ title: "ログインしました", status: "success" });
      history.push("/")
    })
    .catch(() => {
      showMessage({ title: "ログイン中にエラーが発生しました", status: "error" });
    })
    .finally(() => setLoading(false));
  },[]);

  return { signin, loading }
};