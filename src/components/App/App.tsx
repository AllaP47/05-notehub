import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useDebouncedCallback } from 'use-debounce'; 

import { fetchNotes } from '../../services/noteService';
import { NoteList } from '../NoteList/NoteList';
import { SearchBox } from '../SearchBox/SearchBox';
import { Pagination } from '../Pagination/Pagination';
import { Modal } from '../Modal/Modal';
import { NoteForm } from '../NoteForm/NoteForm';
import { Loader } from '../Loader/Loader';
import { ErrorMessage } from '../ErrorMessage/ErrorMessage';
import type { FetchNotesResponse } from '../../services/noteService';

// ВИПРАВЛЕНО: Безпечний імпорт стилів з поточної папки без використання @ts коментарів
import cssStyles from './App.module.css';
const css = (cssStyles || {}) as Record<string, string>;

export default function App() {
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const perPage = 12;

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['notes', page, search],
    queryFn: () => fetchNotes({ page, perPage, search }),
    placeholderData: (previousData: FetchNotesResponse | undefined) => previousData,
  });

  const debouncedSearch = useDebouncedCallback((value: string) => {
    setSearch(value);
    setPage(1); 
  }, 500);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    debouncedSearch(e.target.value);
  };

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox onChange={handleSearchChange} />
        
        {data && data.totalPages > 1 && (
          <Pagination
            currentPage={page}
            totalPages={data.totalPages}
            onPageChange={setPage}
          />
        )}
        
        <button className={css.button} onClick={() => setIsModalOpen(true)}>
          Create note +
        </button>
      </header>

      <main style={{ minHeight: '300px', position: 'relative' }}>
        {isLoading && <Loader />}
        {isError && <ErrorMessage message={error instanceof Error ? error.message : undefined} />}

        {!isLoading && data && data.notes.length > 0 && (
          <NoteList notes={data.notes} />
        )}

        {!isLoading && data && data.notes.length === 0 && (
          <p style={{ textAlign: 'center', marginTop: '40px', color: '#666' }}>
            No notes found. Create a new one or clear your search query.
          </p>
        )}
      </main>

      {isModalOpen && (
        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <NoteForm onClose={() => setIsModalOpen(false)} />
        </Modal>
      )}
    </div>
  );
}



