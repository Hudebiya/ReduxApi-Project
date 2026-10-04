import axios from "axios";

const UNSPLASH_KEY = import.meta.env.VITE_UNSPLASH_KEY;
const PIXABAY_KEY = import.meta.env.VITE_PIXABAY_KEY;
const GIPHY_KEY = import.meta.env.VITE_GIPHY_KEY;

export async function fetchPhotos(query, page = 1, per_page = 20) {
  const res = await axios.get("https://api.unsplash.com/search/photos", {
    params: { query, page, per_page },
    headers: { Authorization: `Client-ID ${UNSPLASH_KEY}` },
  });

  return res.data.results.map((item) => ({
    id: item.id,
    type: "photo",
    thumbnail: item.urls.small,
    src: item.urls.regular,
    title: item.alt_description || "Photo",
    url: item.links.html,
    author: item.user.name,
    authorUrl: item.user.links.html,
    source: "Unsplash",
  }));
}

export async function fetchVideos(query, page = 1, per_page = 15) {
  const res = await axios.get("https://pixabay.com/api/videos/", {
    params: { key: PIXABAY_KEY, q: query, page, per_page },
  });

  return res.data.hits.map((item) => ({
    id: item.id,
    type: "video",
    thumbnail: item.videos.medium.thumbnail,
    src: item.videos.medium.url,
    title: item.tags,
    url: item.pageURL,
    author: item.user,
    authorUrl: item.pageURL,
    source: "Pixabay",
  }));
}

export async function fetchGifs(query, offset = 0, limit = 20) {
  const res = await axios.get("https://api.giphy.com/v1/gifs/search", {
    params: { api_key: GIPHY_KEY, q: query, limit, offset },
  });

  return res.data.data.map((item) => ({
    id: item.id,
    type: "gif",
    thumbnail: item.images.fixed_height.url,
    src: item.images.original.url,
    title: item.title || "GIF",
    url: item.url,
    author: item.username || "GIPHY",
    authorUrl: item.url,
    source: "GIPHY",
  }));
}