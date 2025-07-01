import React, { useEffect, useState } from "react";
import { Video } from "../types/Video";
import { Comment, Reply } from "../types/Comment";

type Props = {
  video: Video | null;
  commentList: Comment[];
  replies: { [parentId: string]: Reply[] };
  fetchReplies: (parentId: string) => void;
};

const VideoDetail: React.FC<Props> = ({
  video,
  commentList,
  replies,
  fetchReplies,
}) => {
  // Track which replies are expanded
  const [expandedReplies, setExpandedReplies] = useState<{
    [parentId: string]: boolean;
  }>({});

  // Manage sorting option
  const [sortOption, setSortOption] = useState<"top" | "newest">("top");

  // Store sorted comments
  const [sortedComments, setSortedComments] = useState<Comment[]>([]);

  // Toggle replies expand/collapse
  const toggleReplies = (parentId: string, totalReplies: number) => {
    if (!replies[parentId]) {
      fetchReplies(parentId);
      setExpandedReplies((prev) => ({ ...prev, [parentId]: true }));
    } else {
      setExpandedReplies((prev) => ({
        ...prev,
        [parentId]: !prev[parentId],
      }));
    }
  };

  // Sort comments based on sortOption
  useEffect(() => {
    if (!commentList) return;

    const sorted = [...commentList].sort((a, b) => {
      const aSnippet = a.snippet.topLevelComment.snippet;
      const bSnippet = b.snippet.topLevelComment.snippet;

      if (sortOption === "top") {
        return (bSnippet.likeCount || 0) - (aSnippet.likeCount || 0);
      } else {
        return (
          new Date(bSnippet.publishedAt).getTime() -
          new Date(aSnippet.publishedAt).getTime()
        );
      }
    });

    setSortedComments(sorted);
  }, [commentList, sortOption]);

  // Show loading if no video selected
  if (!video) {
    return <div>Loading...</div>;
  }

  const videoId = video.id.videoId;
  const url = `https://www.youtube.com/embed/${videoId}`;

  return (
    <div className="video-detail col-md-8">
      {/* Video player */}
      <div className="embed-responsive embed-responsive-16by9">
        <iframe
          title={video.snippet.title}
          className="embed-responsive-item"
          src={url}
        />
      </div>

      {/* Video title and description */}
      <div className="details">
        <div>{video.snippet.title}</div>
        <div>{video.snippet.description}</div>
      </div>

      {/* Comments section */}
      <section className="comments-section">
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <b>
            <h4>{commentList.length} Comments</h4>
          </b>

          {/* Sorting dropdown */}
          <select
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value as "top" | "newest")}
            style={{
              padding: "6px 10px",
              borderRadius: "4px",
              border: "1px solid #ccc",
            }}
          >
            <option value="top">Top Comments</option>
            <option value="newest">Newest First</option>
          </select>
        </div>

        {/* No comments message */}
        {commentList.length === 0 ? (
          <p>No comments available.</p>
        ) : (
          // Render comments
          <ul className="comment-list">
            {sortedComments.map((comment) => {
              const topComment = comment.snippet.topLevelComment.snippet;
              const totalReplies = comment.snippet.totalReplyCount;
              const parentId = comment.id;
              const isExpanded = expandedReplies[parentId];

              return (
                <li key={parentId} className="comment-item">
                  {/* Comment header */}
                  <div className="comment-header">
                    <img
                      src={topComment.authorProfileImageUrl}
                      alt="avatar"
                      className="avatar"
                    />
                    <div>
                      <span className="comment-author">
                        {topComment.authorDisplayName}
                      </span>
                      <span className="comment-text">
                        {topComment.textDisplay}
                      </span>
                    </div>
                  </div>

                  {/* Replies Button */}
                  {totalReplies > 0 && (
                    <button
                      className="replies-button"
                      onClick={() => toggleReplies(parentId, totalReplies)}
                    >
                      {isExpanded ? "▲" : "▼"}{" "}
                      {totalReplies === 1
                        ? `${isExpanded ? "Hide" : "View"} 1 Reply`
                        : `${
                            isExpanded ? "Hide" : "View"
                          } ${totalReplies} Replies`}
                    </button>
                  )}

                  {/* Render Replies */}
                  {isExpanded && replies[parentId] && (
                    <ul className="replies-list">
                      {replies[parentId].map((reply) => (
                        <li key={reply.id} className="reply-item">
                          <div className="reply-header">
                            <img
                              src={reply.snippet.authorProfileImageUrl}
                              alt="avatar"
                              className="avatar"
                            />
                            <div>
                              <span className="reply-author">
                                {reply.snippet.authorDisplayName}
                              </span>
                              <span className="reply-text">
                                {reply.snippet.textDisplay}
                              </span>
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              );
            })}
          </ul>
        )}
      </section>
    </div>
  );
};

export default VideoDetail;
