import React, { useCallback, useEffect, useMemo } from "react";
import _ from "lodash";
import YTSearch from "youtube-api-search";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "./store";
import { setSelectedVideo, setVideos } from "./store/videoSlice";
import { setComments, setReplies } from "./store/commentSlice";
import SearchBar from "./components/search_bar";
import VideoList from "./components/video_list";
import VideoDetail from "./components/video_detail";
import { Video } from "./types/Video";
import "./App.css";

const API_KEY = "AIzaSyB-4dLf3A0iDeQBmWdLM1PGlHwgdL1zeMc";

const App: React.FC = () => {
  const dispatch = useDispatch();
  // Redux state selectors
  const videos = useSelector((state: RootState) => state.video.videos);
  const selectedVideo = useSelector(
    (state: RootState) => state.video.selectedVideo
  );
  const comments = useSelector((state: RootState) => state.comments.comments);
  const replies = useSelector((state: RootState) => state.comments.replies);

  // Fetch videos based on search term
  const fetchVideos = useCallback(
    (term: string) => {
      YTSearch({ key: API_KEY, term }, (videos: Video[]) => {
        dispatch(setVideos(videos));
        if (videos.length > 0) {
          dispatch(setSelectedVideo(videos[0]));
        } else {
          dispatch(setSelectedVideo(null));
        }
      });
    },
    [dispatch]
  );

  // Fetch comments for the selected video
  const fetchComments = useCallback(
    async (videoId: string) => {
      try {
        const response = await fetch(
          `https://www.googleapis.com/youtube/v3/commentThreads?part=snippet&videoId=${videoId}&key=${API_KEY}`
        );
        const data = await response.json();
        dispatch(setComments(data.items || []));
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
    },
    [dispatch]
  );

  // Fetch replies for a given comment
  const fetchReplies = async (parentId: string) => {
    try {
      if (replies[parentId]) return;
      const response = await fetch(
        `https://www.googleapis.com/youtube/v3/comments?part=snippet&parentId=${parentId}&key=${API_KEY}`
      );
      const data = await response.json();
      dispatch(setReplies({ parentId, replies: data.items || [] }));
    } catch (error) {
      console.error("Error fetching replies:", error);
    }
  };

  /// Debounced video search (300ms)
  const videoSearch = useMemo(
    () =>
      _.debounce((term: string) => {
        fetchVideos(term);
      }, 300),
    [fetchVideos]
  );

  // Initial video load
  useEffect(() => {
    videoSearch("liverpool");
  }, [videoSearch]);

  // Fetch comments when selected video changes
  useEffect(() => {
    if (selectedVideo) {
      fetchComments(selectedVideo.id.videoId);
    }
  }, [selectedVideo, fetchComments]);

  return (
    <div>
      {/* Search bar */}
      <SearchBar onSearchTermChange={videoSearch} />

      {/* Video detail with comments and replies */}
      <VideoDetail
        video={selectedVideo}
        commentList={comments}
        replies={replies}
        fetchReplies={fetchReplies}
      />

      {/* Video list */}
      <VideoList
        videos={videos}
        onVideoSelect={(video: Video) => dispatch(setSelectedVideo(video))}
      />
    </div>
  );
};

export default App;
