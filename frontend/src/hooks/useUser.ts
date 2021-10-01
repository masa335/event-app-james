import axiosBaseUrl from "../config/axiosBaseUrl";
import Cookies from "js-cookie";
import { useCallback, useState } from "react";
import { useHistory } from "react-router-dom";
import { Count, User, Users } from "../types/user";
import { useMessage } from "./useMessage";
import { useSetRecoilState } from "recoil";
import { authState } from "../recoil/atoms/Auth";


export const useUser = () => {
  const axios = axiosBaseUrl;
  const [loading, setLoading] = useState(false);
  const [userInfo, setUserInfo] = useState<User>();
  const [following, setFollowing] = useState<Array<Users>>([]);
  const [followers, setFollowers] = useState<Array<Users>>([]);
  const [count, setCount] = useState<Count>();
  const [ isFollowed, setIsFollowed ] = useState<boolean | undefined>(false);
  const setAuth = useSetRecoilState(authState);

  const { showMessage } = useMessage();
  const history = useHistory();

  const getUserInfo = useCallback((userId: string | number | undefined) => {
    setLoading(true);
    axios
    .get<User>(`/api/v1/users/${userId}`, { headers: {
      "access-token": Cookies.get("_access_token"),
      "client": Cookies.get("_client"),
      "uid": Cookies.get("_uid")
    }})
    .then((res) => {
      setUserInfo(res.data);
      setIsFollowed(res.data.is_followed);
    })
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

  const getFollowingOrFllowers = useCallback((userId: string | number | undefined, index: number | undefined) => {
    setLoading(true);
    // index=0はフォロー中、1がフォロワー
    index === 0 ?
      axios
      .get<Array<Users>>(`/api/v1/users/${userId}/follows`)
      .then((res) => setFollowing(res.data))
      .catch(() => {
        console.log("情報の取得に失敗しました。");
      })
      .finally(() => setLoading(false))
    :
      axios
      .get<Array<Users>>(`/api/v1/users/${userId}/followers`)
      .then((res) => setFollowers(res.data))
      .catch(() => {
        console.log("情報の取得に失敗しました。");
      })
      .finally(() => setLoading(false));
  },[]);

  const getFollowsFllowersCount = useCallback((userId: string | number | undefined) => {
    setLoading(true);
      axios
      .get<Count>(`/api/v1/users/${userId}/follows_followers_count`)
      .then((res) => setCount(res.data))
      .catch(() => {
        console.log("情報の取得に失敗しました。");
      })
      .finally(() => setLoading(false))
  },[]);

  const deleteUser = useCallback((userId: string | number | undefined) => {
    setLoading(true);
      axios
      .delete<Users>(`/api/v1/users/${userId}`)
      .then((res) => {
        Cookies.remove("_access_token");
        Cookies.remove("_client");
        Cookies.remove("_uid");
        setAuth({loading: false, isSignedIn: false, currentUser: undefined}); //グローバルステート変更
        console.log(res.data);
        showMessage({ title: "ユーザーを削除しました", status: "success" });
        history.push("/");
      })
      .catch(() => {
        showMessage({ title: "ユーザー削除できませんでした", status: "error" });
      })
      .finally(() => setLoading(false))
  },[]);

  return { 
    getUserInfo, 
    userInfo, 
    updateUserInfo,
    deleteUser,
    getFollowingOrFllowers, 
    getFollowsFllowersCount, 
    following, 
    followers,
    setIsFollowed,
    isFollowed, 
    count,
    loading 
  };
};

