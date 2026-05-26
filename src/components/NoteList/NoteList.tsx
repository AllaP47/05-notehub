import React from 'react';
import type { Note } from '../../types/note';

import cssStyles from './NoteList.module.css';
const css = cssStyles as Record<string, string>;

interface NoteListProps {
  notes: Note[];
  onDelete: (id: string) => void;
}

export const NoteList: React.FC<NoteListProps> = ({ notes, onDelete }) => {
  if (notes.length === 0) return null;

  // Резервний список для старих тестових 40 нотаток
  const defaultTags = ['Work', 'Todo', 'Personal', 'Meeting', 'Shopping'];

  return (
    <ul className={css.list}>
      {notes.map(({ id, title, text, tags }, index) => {
        let cleanText = text || '';
        let displayTag = defaultTags[index % defaultTags.length];

        // 1. Якщо у тексті є наш маркер — витягуємо обраний користувачем тег
        if (text && text.includes('[tag:')) {
          const match = text.match(/\[tag:(.+?)\]/);
          if (match) {
            displayTag = match[1]; // Отримуємо "Work", "Todo" тощо
            cleanText = text.replace(/\[tag:.+?\]/, '').trim(); // Очищаємо текст від маркеру
          }
        } else if (tags && tags.length > 0) {
          // 2. Якщо сервер повернув свій об'єкт для тестових нотаток
          const firstTag = tags[0] as unknown as { name?: string } | string;
          if (typeof firstTag === 'object' && firstTag !== null && 'name' in firstTag) {
            displayTag = firstTag.name || 'Note';
          } else {
            displayTag = String(firstTag);
          }
        }

        return (
          <li key={id} className={css.listItem}>
            <h2 className={css.title}>{title}</h2>
            <p className={css.content}>{cleanText}</p>
            <div className={css.footer}>
              {/* Ліва кнопка з точною назвою картки */}
              <button className={css.tagButton} type="button">
                {displayTag}
              </button>
             
              {/* Права кнопка видалення */}
              <button className={css.button} onClick={() => onDelete(id)}>
                Delete
              </button>
            </div>
          </li>
        );
      })}
    </ul>
  );
};




