/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import Cookies from "js-cookie";
import { useCallback, useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { authState } from "../recoil/atoms/Auth";


axios.defaults.baseURL = 'http://192.168.10.2:3001';

//認証済みのユーザーを取得する
export const useCurrentUser = () => {

  const tasks = useRecoilValue(authState);
  const setAuth = useSetRecoilState(authState);

  const currentUser = useCallback(() => {
    if (Cookies.get("_access_token") && Cookies.get("_client") && Cookies.get("_uid")){
      axios
      .get("/api/v1/auth/sessions", { headers: {
        "access-token": Cookies.get("_access_token"),
        "client": Cookies.get("_client"),
        "uid": Cookies.get("_uid")
      }})
      .then((res) => {
        setAuth({isSignedIn: true, currentUser: res.data.current_user});
      })
      .catch((err) => {
        console.log(err);
      })
    }
  },[]);

  return { currentUser };
};