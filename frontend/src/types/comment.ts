export type Comment = {
  event_id: string;
  comment: string;
}

export type Comments = {
  comment_id: number;
  name: string;
  image: {
    url: string;
  };
  event_id: number;
  user_id: number;
  comment: string;
}