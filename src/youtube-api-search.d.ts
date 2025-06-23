declare module "youtube-api-search" {
  interface Video {
    etag: string;
    id: {
      videoId: string;
    };
    snippet: {
      title: string;
      description: string;
      thumbnails: {
        default: { url: string };
        medium?: { url: string };
        high?: { url: string };
      };
    };
  }

  interface Options {
    key: string;
    term: string;
  }

  type Callback = (videos: Video[]) => void;

  const YTSearch: (options: Options, callback: Callback) => void;

  export default YTSearch;
}
