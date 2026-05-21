export interface NoteTag {
  id: string;
  name: string;
}

export interface Note {
  id: string;
  title: string;
  text: string;
  tags: NoteTag[];
  createdAt: string;
}
