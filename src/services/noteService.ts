import axios from "axios";
import type { AxiosResponse, InternalAxiosRequestConfig } from "axios";
import type { Note } from "../types/note";

// 1. Налаштовуємо БАЗОВИЙ URL один раз вгорі, як цього вимагає специфікація
const noteApi = axios.create({
  baseURL: "https://goit.study",
});

// 2. Автоматично додаємо токен авторизації до кожного запиту через інтерцептор
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
  totalPages: number;
}

export interface CreateNoteData {
  title: string;
  content: string;
  tag: string;
}

// --- Функції запитів із ПРАВИЛЬНИМИ відносними ендпоінтами ---

// 1. Отримання нотаток — Виправлено: використовує виключно чистий ендпоінт "/notes"
export const fetchNotes = async (
  params: FetchNotesParams = {},
): Promise<FetchNotesResponse> => {
  const response: AxiosResponse<FetchNotesResponse> = await noteApi.get(
    "/notes",
    { params },
  );
  return response.data;
};

// 2. Створення нотатки — Виправлено: використовує виключно чистий ендпоінт "/notes"
export const createNote = async (noteData: CreateNoteData): Promise<Note> => {
  const response: AxiosResponse<Note> = await noteApi.post("/notes", noteData);
  return response.data;
};

// 3. Видалення нотатки — Виправлено: ендпоінт будується суворо як "/notes/{id}"
export const deleteNote = async (id: string): Promise<Note> => {
  const response: AxiosResponse<Note> = await noteApi.delete(`/notes/${id}`);
  return response.data;
};
