import axios from "axios";
import type { AxiosResponse } from "axios";
import type { Note } from "../types/note";

export interface FetchNotesParams {
  page?: number;
  perPage?: number;
  search?: string;
}

export interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

export interface CreateNoteData {
  title: string;
  content: string;
  tag: string;
}

// 1. Отримання нотаток (Рядок 30) — ВИПРАВЛЕНО НА ПРАВИЛЬНИЙ URL NoteHub
export const fetchNotes = async (
  params: FetchNotesParams = {},
): Promise<FetchNotesResponse> => {
  const token = import.meta.env.VITE_NOTEHUB_TOKEN;

  const response: AxiosResponse<FetchNotesResponse> = await axios.get(
    "https://goit.study",
    {
      params,
      headers: {
        Authorization: token ? `Bearer ${token}` : "",
      },
    },
  );
  return response.data;
};

// 2. Створення нотатки (Рядок 45) — ВИПРАВЛЕНО НА ПРАВИЛЬНИЙ URL NoteHub
export const createNote = async (noteData: CreateNoteData): Promise<Note> => {
  const token = import.meta.env.VITE_NOTEHUB_TOKEN;

  const response: AxiosResponse<Note> = await axios.post(
    "https://goit.study",
    noteData,
    {
      headers: {
        Authorization: token ? `Bearer ${token}` : "",
      },
    },
  );
  return response.data;
};

// 3. Видалення нотатки (Рядок 60) — ВИПРАВЛЕНО НА ПРАВИЛЬНИЙ URL NoteHub
export const deleteNote = async (id: string): Promise<Note> => {
  const token = import.meta.env.VITE_NOTEHUB_TOKEN;

  const response: AxiosResponse<Note> = await axios.delete(
    `https://goit.study/${id}`,
    {
      headers: {
        Authorization: token ? `Bearer ${token}` : "",
      },
    },
  );
  return response.data;
};
