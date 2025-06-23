import React, { useState, useEffect, useMemo } from "react";
import _ from "lodash";
import YTSearch from "youtube-api-search";
import SearchBar from "./components/search_bar";
import VideoList from "./components/video_list";
import VideoDetail from "./components/video_detail";
import { Video } from "./types/Video";

const API_KEY = "AIzaSyB-4dLf3A0iDeQBmWdLM1PGlHwgdL1zeMc";

const App: React.FC = () => {
  // Initializes component state
  const [videos, setVideos] = useState<Video[]>([]);
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);

  // Function that gets the search-term and fetches videos
  const fetchVideos = (term: string) => {
    YTSearch({ key: API_KEY, term }, (videos: Video[]) => {
      console.log("videos", videos);
      setVideos(videos);
      setSelectedVideo(videos[0]);
    });
  };

  // Debounced video search (waits 300ms after typing stops)
  const videoSearch = useMemo(
    () =>
      _.debounce((term: string) => {
        fetchVideos(term);
      }, 300),
    []
  );

  // Effect hook that runs once on mount (like componentDidMount)
  useEffect(() => {
    videoSearch("liverpool");
  }, [videoSearch]);

  // Rendering the components
  return (
    <div>
      <SearchBar onSearchTermChange={videoSearch} />
      <VideoDetail video={selectedVideo} />
      <VideoList
        onVideoSelect={(video: Video) => setSelectedVideo(video)}
        videos={videos}
      />
    </div>
  );
};

export default App;
