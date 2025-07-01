export interface Comment {
  id: string;
  snippet: {
    topLevelComment: {
      id: string;
      snippet: {
        authorDisplayName: string;
        authorProfileImageUrl: string;
        textDisplay: string;
        likeCount: number;
        publishedAt: string;
      };
    };
    totalReplyCount: number;
  };
}

export interface Reply {
  id: string;
  snippet: {
    authorDisplayName: string;
    authorProfileImageUrl: string;
    textDisplay: string;
    likeCount: number;
    publishedAt: string;
  };
}
