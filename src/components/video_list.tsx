import React from "react";
import VideoListItem from "./video_list_item";
import { Video } from "../types/Video";

type Props = {
  videos: Video[];
  onVideoSelect: (video: Video) => void;
};

const VideoList: React.FC<Props> = (props) => {
  const videoItems = props.videos.map((video) => {
    return (
      <VideoListItem
        onVideoSelect={props.onVideoSelect}
        key={video.etag}
        video={video}
      />
    );
  });

  return <ul className="col-md-4 list-group">{videoItems}</ul>;
};

export default VideoList;
