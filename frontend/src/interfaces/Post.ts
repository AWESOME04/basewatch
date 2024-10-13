export interface Author {
    name: string;
    username: string;
    avatar: string;
  }
  
  export interface Post {
    author: Author;
    content: string;
    image?: string;
    timestamp: string;
    comments: number;
    retweets: number;
    likes: number;
  }