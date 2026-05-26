import React from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteNote } from '../../services/noteService';
import type { Note } from '../../types/note';

import cssStyles from './NoteList.module.css';
const css = cssStyles as Record<string, string>;

interface NoteListProps {
  notes: Note[];
}

export const NoteList: React.FC<NoteListProps> = ({ notes }) => {
  const queryClient = useQueryClient();

  // ВИПРАВЛЕНО: Мутація перенесена на самий початок компонента (ДО умови return null)
  const deleteMutation = useMutation({
    mutationFn: (id: string) => deleteNote(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] });
    },
  });

  // Умова йде ТІЛЬКИ після опису всіх хуків
  if (notes.length === 0) return null;

  return (
    <ul className={css.list}>
      {notes.map(({ id, title, content, tag }) => (
        <li key={id} className={css.listItem}>
          <h2 className={css.title}>{title}</h2>
          
          {/* Використовуємо content за новими вимогами API */}
          <p className={css.content}>{content}</p>
          
          <div className={css.footer}>
            {/* Використовуємо tag як рядок за новими вимогами API */}
            <button className={css.tagButton} type="button">
              {tag || 'Note'}
            </button>
           
            <button 
              className={css.button} 
              onClick={() => deleteMutation.mutate(id)}
              disabled={deleteMutation.isPending}
            >
              {deleteMutation.isPending ? 'Deleting...' : 'Delete'}
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
};






