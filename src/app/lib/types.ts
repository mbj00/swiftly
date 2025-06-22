export type TweetType = {
    _id: string;
    text: string;
    hashtags: string[];
    author: string; // This is a user ID
    likes: string[];
    bookmarks: string[];
    retweets: string[];
    replies: string[];
    createdAt: string;
    updatedAt: string;
  };

  export type PostType = {
    _id: string;
    text: string;
    hashtags: string[];
    author: string; // This is a user ID
    likes: string[];
    bookmarks: string[];
    retweets: string[];
    replies: string[];
    createdAt: string;
    updatedAt: string;
  };

  export type Profile = {
  _id: string;
  username: string;
  fullName: string;
  email: string;
  password: string;
  tweets: string[]; // or Tweet[] if you have a Tweet type
  likes: string[]; // or Tweet[] if likes refer to tweets
  bookmarks: string[]; // or Tweet[] if bookmarks refer to tweets
  followers: string[]; // or User[] if you populate user info
  following: string[]; // or User[] if you populate user info
  createdAt: string; // or Date if parsed
  updatedAt: string; // or Date if parsed
};
  