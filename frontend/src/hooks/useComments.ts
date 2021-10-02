import axiosBaseUrl from "../config/axiosBaseUrl";
import { useCallback, useState } from "react";
import { useMessage } from "./useMessage";
import Cookies from "js-cookie";
import { Comment, Comments } from "../types/comment";

export const useComments = () => {
  const axios = axiosBaseUrl;
  const [loadingComment, setLoading] = useState(false);
  const [comments, setComments] = useState<Array<Comments>>();
  const [ isCommented, setIsCommented ] = useState<boolean>(false);

  const { showMessage } = useMessage();

  const getComments = useCallback((event_id:number | undefined) => {
    setLoading(true);
    axios
    .get<Array<Comments>>(`/api/v1/events/${event_id}/comments`)
    .then((res) => {
      console.log(res.data);
      setComments(res.data);
      setIsCommented(false);
    })
    .catch(() => {
      console.log("コメントを取得できませんでした");
    })
    .finally(() => setLoading(false));
  },[]);


  const createComments = useCallback((params:Comment) => {
    setLoading(true);
    axios
    .post<Comment>(`/api/v1/events/${params.event_id}/comments`, { comment: params.comment }, { headers: {
      "access-token": Cookies.get("_access_token"),
      "client": Cookies.get("_client"),
      "uid": Cookies.get("_uid")
    }})
    .then((res) => {
      console.log(res.data);
      setIsCommented(true);
    })
    .catch(() => {
      showMessage({ title: "エラーが発生しました", status: "error" });
    })
    .finally(() => setLoading(false));
  },[]);

  return { createComments, getComments, setIsCommented, isCommented, comments, loadingComment }
};