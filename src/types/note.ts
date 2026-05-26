// export interface NoteTag {
//   id: string;
//   name: string;
// }

// export interface Note {
//   id: string;
//   title: string;
//   text: string;
//   tags: NoteTag[];
//   createdAt: string;
// }
export type NoteTagType = "Todo" | "Work" | "Personal" | "Meeting" | "Shopping";

export interface Note {
  id: string;
  title: string;
  content: string; // Обов'язково контент замість text
  tag: NoteTagType; // Обов'язково один рядок замість масиву tags
  createdAt: string;
  updatedAt: string;
}
