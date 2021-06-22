export type Event = {
  id: number;
  user_id: number;
  event_name: string;
  event_category: string;
  event_date: Date;
  prefecture_id: number;
  venue: string;
  explanation: string;
}