import axios from 'axios';

const baseURL = 'https://gotrip-backend.onrender.com/posts';
// const baseURL = 'http://localhost:5000/posts';
// const baseURL = 'http://192.168.0.105:5000/posts';

export const fetchAllPosts = () => {
  return axios.get(baseURL);
};

export const createPosts = (newPost) => {
  // console.log('Sending to server:', newPost);
  return axios.post(baseURL, newPost);
};

export const updatePosts = (id, updatedPost) => {
  return axios.patch(`${baseURL}/${id}`, updatedPost);
};

export const deletePosts = (id) => {
  return axios.delete(`${baseURL}/${id}`);
};

export const fetchPostById = (id) => {
  return axios.get(`${baseURL}/${id}`);
};

export const addComment = (postId, comment) => {
  return axios.post(`${baseURL}/${postId}/comments`, comment);
};

