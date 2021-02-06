import axios from "axios";

const API_KEY = "AIzaSyBKx9SFGUzz1uUtGkDyjFiL3zF0skagBIQ";

export const youtubeRequest = axios.create({
  baseURL: "https://www.googleapis.com/youtube/v3/",
  params: {
    part: "snippet",
    maxResults: 5,
    key: API_KEY,
  },
  headers: {},
});

export const ytVideoRequest = axios.create({
  baseURL: "https://www.googleapis.com/youtube/v3/",
  params: {
    part: "contentDetails",
    key: API_KEY,
  },
  headers: {},
});
