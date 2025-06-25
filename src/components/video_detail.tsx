import React from "react";
import { Video } from "../types/Video";
import { Comment } from "../types/Comment";

type Props = {
  video: Video | null;
  commentList: Comment[];
};

const VideoDetail: React.FC<Props> = ({ video, commentList }) => {
  if (!video) {
    return <div>Loading...</div>;
  }

  const videoId = video.id.videoId;
  const url = `https://www.youtube.com/embed/${videoId}`;

  return (
    <div className="video-detail col-md-8">
      <div className="embed-responsive embed-responsive-16by9">
        <iframe
          title={video.snippet.title}
          className="embed-responsive-item"
          src={url}
        />
      </div>
      <div className="details">
        <div>{video.snippet.title}</div>
        <div>{video.snippet.description}</div>
      </div>
      <div className="comments-section">
        <h3>Comments: {commentList.length}</h3>
        {commentList.length === 0 ? (
          <p>No comments available.</p>
        ) : (
          <ul style={{ padding: 0, listStyle: "none" }}>
            {commentList.map((comment: any) => (
              <li key={comment.id} className="comment-item">
                <span className="comment-author">
                  {comment.snippet.topLevelComment.snippet.authorDisplayName}
                </span>
                <span className="comment-text">
                  {comment.snippet.topLevelComment.snippet.textDisplay}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default VideoDetail;
