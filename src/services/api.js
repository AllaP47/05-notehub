import axios from 'axios';


const noteHubApi = axios.create({
  baseURL: 'https://notehub-public.goit.study/api',
});


noteHubApi.interceptors.request.use((config) => {
  const token = import.meta.env.VITE_NOTEHUB_TOKEN;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});


export const getNotes = async () => {
  const response = await noteHubApi.get('/notes');
  return response.data;
};

export const createNote = async (noteData) => {

  const response = await noteHubApi.post('/notes', noteData);
  return response.data;
};

export const deleteNote = async (noteId) => {
  const response = await noteHubApi.delete(`/notes/${noteId}`);
  return response.data;
};
