import React, { useState, useEffect, useMemo } from "react";
import _ from "lodash";
import YTSearch from "youtube-api-search";
import SearchBar from "./components/search_bar";
import VideoList from "./components/video_list";
import VideoDetail from "./components/video_detail";
import { Video } from "./types/Video";
import { Comment } from "./types/Comment";
import "./App.css";

const API_KEY = "AIzaSyB-4dLf3A0iDeQBmWdLM1PGlHwgdL1zeMc";

const App: React.FC = () => {
  // Initializes component state
  const [videos, setVideos] = useState<Video[]>([]);
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);

  // Function that gets the search-term and fetches videos
  const fetchVideos = (term: string) => {
    YTSearch({ key: API_KEY, term }, (videos: Video[]) => {
      console.log("videos", videos);
      setVideos(videos);
      if (videos.length > 0) {
        setSelectedVideo(videos[0]);
      } else {
        setSelectedVideo(null); // Clear selectedVideo if no results
      }
    });
  };

  // Fetches the list of comments for a given YouTube video ID using
  const fetchComments = async (videoId: string) => {
    try {
      const response = await fetch(
        `https://www.googleapis.com/youtube/v3/commentThreads?part=snippet&videoId=${videoId}&key=${API_KEY}`
      );
      const data = await response.json();
      setComments(data.items || []);
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };

  // Debounced search function to avoid too many requests on fast typing
  const videoSearch = useMemo(
    () =>
      _.debounce((term: string) => {
        fetchVideos(term);
      }, 300),
    []
  );

  // Initial search when component mounts
  useEffect(() => {
    videoSearch("liverpool");
  }, [videoSearch]);

  // Fetch comments whenever selected video changes
  useEffect(() => {
    if (selectedVideo) {
      fetchComments(selectedVideo.id.videoId);
    }
  }, [selectedVideo]);

  return (
    <div>
      <SearchBar onSearchTermChange={videoSearch} />
      <VideoDetail video={selectedVideo} commentList={comments} />
      <VideoList
        videos={videos}
        onVideoSelect={(video: Video) => setSelectedVideo(video)}
      />
    </div>
  );
};

export default App;
