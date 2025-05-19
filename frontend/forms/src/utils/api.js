import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8000',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default {
  post: (url, data) => api.post(url, data).then(res => res.data),
  get: (url) => api.get(url).then(res => res.data),
};