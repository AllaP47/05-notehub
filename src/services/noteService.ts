import axios from "axios";
import type { AxiosResponse, InternalAxiosRequestConfig } from "axios";
import type { Note } from "../types/note";

const noteApi = axios.create({
  baseURL: "https://notehub-public.goit.study/api",
});

noteApi.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const token = import.meta.env.VITE_NOTEHUB_TOKEN;
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export interface FetchNotesParams {
  page?: number;
  perPage?: number;
  search?: string;
}

export interface FetchNotesResponse {
  notes: Note[];
  totalNotes: number;
  totalPages: number;
  currentPage: number;
}

export interface CreateNoteData {
  title: string;
  text: string;
  tags?: string[];
}

export const fetchNotes = async (
  params: FetchNotesParams = {},
): Promise<FetchNotesResponse> => {
  const response: AxiosResponse<FetchNotesResponse> = await noteApi.get(
    "/notes",
    {
      params,
    },
  );
  return response.data;
};

export const createNote = async (noteData: CreateNoteData): Promise<Note> => {
  const response: AxiosResponse<Note> = await noteApi.post("/notes", noteData);
  return response.data;
};

export const deleteNote = async (id: string): Promise<{ success: boolean }> => {
  const response = await noteApi.delete(`/notes/${id}`);
  return response.data;
};
