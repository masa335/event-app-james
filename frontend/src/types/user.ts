export type User = {
  user: {
    id: number;
    provider: string;
    uid: string;
    allow_password_change: boolean;
    name: string;
    image: {
      url: string;
    }
    email: string;
    gender: number;
    age: number;
    self_introduction: string;
    admin: boolean;
  };
  participating_events: [{
    id: number;
    user_id: number;
    event_name: string;
    event_category: string;
    prefecture_id: number;
    venue: string;
    explanation: string;
    start_date: Date;
    end_date: Date;
    max_participants: number;
    image: {
      url: string
    }
  }];
  organized_events: [{
    id: number;
    user_id: number;
    event_name: string;
    event_category: string;
    prefecture_id: number;
    venue: string;
    explanation: string;
    start_date: Date;
    end_date: Date;
    max_participants: number;
    image: {
      url: string
    }
  }];
  is_followed: boolean;
};

export type Users = {
    id: number;
    provider: string;
    uid: string;
    allow_password_change: boolean;
    name: string;
    image: {
      url: string;
    }
    email: string;
    gender: number;
    age: number;
    self_introduction: string;
    admin: boolean;
  };

  export type Count = {
    follows: number;
    followers: number;
  };