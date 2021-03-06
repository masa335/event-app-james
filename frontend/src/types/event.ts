export type Event = {
  id: number;
  user_id: number;
  event_name: string;
  event_category: number;
  prefecture_id: number;
  venue: string;
  explanation: string;
  start_date: Date;
  end_date: Date;
  image: {
    url: string
  },
  max_participants: number;
  organizer?: string;
  participants_count: number;
}