/* eslint-disable react-hooks/exhaustive-deps */
import axiosBaseUrl from "../config/axiosBaseUrl";
import Cookies from "js-cookie";
import { useCallback } from "react";
import { useRecoilState } from "recoil";
import { authState } from "../recoil/atoms/Auth";


//認証済みのユーザーを取得する
export const useCurrentUser = () => {
  const axios = axiosBaseUrl;

  const [auth, setAuth] = useRecoilState(authState);

  const getCurrentUser = useCallback(() => {
    if (Cookies.get("_access_token") && Cookies.get("_client") && Cookies.get("_uid")){
      axios
      .get("/api/v1/auth/sessions", { headers: {
        "access-token": Cookies.get("_access_token"),
        "client": Cookies.get("_client"),
        "uid": Cookies.get("_uid")
      }})
      .then((res) => {
        if (res.data.status === 200) {
          setAuth({loading: false, isSignedIn: true, currentUser: res.data.current_user, memberships: res.data.memberships});
          console.log("recoil set");
          console.log(res.data.current_user);
          console.log(res.data.memberships);
        } else {
          //クッキーの削除
          Cookies.remove("_access_token")
          Cookies.remove("_client")
          Cookies.remove("_uid")
          setAuth({loading: false, isSignedIn: false });
          console.log("ログイン情報が確認できない為、再ログインしてください")
        }
      })
      .catch((err) => {
        console.log(err);
        setAuth({loading: false, isSignedIn: false });
        console.log("recoil set");
      })
    }
  },[]);

  return { getCurrentUser, auth };
};