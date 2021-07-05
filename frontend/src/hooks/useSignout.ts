/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import Cookies from "js-cookie";
import { useCallback, useState } from "react";
import { useHistory } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { authState } from "../recoil/atoms/Auth";
import { SigninParams } from "../types/signinParams";
import { useMessage } from "./useMessage";

axios.defaults.baseURL = 'http://192.168.10.2:3001';

export const useSignout = () => {
  const { showMessage } = useMessage();
  const history = useHistory();

  const setAuth = useSetRecoilState(authState);

  const [loading, setLoading] = useState(false);

  axios.defaults.withCredentials = true;

  const signout = useCallback(() => {
    setLoading(true);
    axios
    .delete("/api/v1/auth/sign_out", { headers: {
      "access-token": Cookies.get("_access_token"),
      "client": Cookies.get("_client"),
      "uid": Cookies.get("_uid")
    }})
    .then(() => {
      //クッキーの削除
      Cookies.remove("_access_token")
      Cookies.remove("_client")
      Cookies.remove("_uid")

      //グローバルステートを更新
      setAuth({loading: false, isSignedIn: false, currentUser: undefined});

      showMessage({ title: "ログアウトしました", status: "success" });
      history.push("/");
    })
    .catch(() => {
      showMessage({ title: "ログアウト中にエラーが発生しました", status: "error" });
    })
    .finally(() => setLoading(false));
  },[]);

  return { signout, loading }
};