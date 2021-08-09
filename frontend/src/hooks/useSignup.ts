/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import { useCallback, useState } from "react";
import { useHistory } from "react-router-dom";
import { SignupParams } from "../types/signupParams";
import { useMessage } from "./useMessage";

axios.defaults.baseURL = 'http://localhost:3001';

export const useSignup = () => {
  const { showMessage } = useMessage();
  const history = useHistory();

  const [loading, setLoading] = useState(false);

  axios.defaults.withCredentials = true;

  const signup = useCallback((params: SignupParams) => {
    setLoading(true);
    axios
    .post("/api/v1/auth",params)
    .then((res) => {
      console.log(res.data);
      showMessage({ title: "メールを送信しました", status: "success" });
      history.push("/");
    })
    .catch(() => {
      showMessage({ title: "サインアップ中にエラーが発生しました", status: "error" });
    })
    .finally(() => setLoading(false));
  },[]);

  return { signup, loading }
};