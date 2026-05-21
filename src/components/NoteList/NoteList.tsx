import React from 'react';
import type { Note } from '../../types/note';
import css from './NoteList.module.css';

interface NoteListProps {
  notes: Note[];
  onDelete: (id: string) => void;
}

export const NoteList: React.FC<NoteListProps> = ({ notes, onDelete }) => {
  if (notes.length === 0) return null;

  return (
    <ul className={css.list}>
      {notes.map(({ id, title, text, tags }) => (
        <li key={id} className={css.listItem}>
          <h2 className={css.title}>{title}</h2>
          <p className={css.content}>{text}</p>
          <div className={css.footer}>
         
            {tags && tags.map((tag) => (
              <span key={tag.id} className={css.tag}>
                {tag.name}
              </span>
            ))}
            <button className={css.button} onClick={() => onDelete(id)}>
              Delete
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
};
