import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useDebouncedCallback } from 'use-debounce'; 
import { fetchNotes, deleteNote, createNote } from '../../services/noteService';
import { NoteList } from '../NoteList/NoteList';
import { SearchBox } from '../SearchBox/SearchBox';
import { Pagination } from '../Pagination/Pagination';
import { Modal } from '../Modal/Modal';
import { NoteForm } from '../NoteForm/NoteForm';
import { Loader } from '../Loader/Loader';
import { ErrorMessage } from '../ErrorMessage/ErrorMessage';
import type { FetchNotesResponse } from '../../services/noteService';

import cssStyles from './App.module.css';

const css = (cssStyles || {}) as Record<string, string>;

export default function App() {
  const queryClient = useQueryClient();
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


  const createMutation = useMutation({
  mutationFn: (newNote: { title: string; text: string; tags: string[] }) =>
    createNote(newNote), 
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ['notes'] });
    setIsModalOpen(false);
  },
});

  
  const deleteMutation = useMutation({
    mutationFn: (id: string) => deleteNote(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] });
    },
  });

const handleCreateSubmit = (values: { title: string; content: string; tag: string }) => {
  createMutation.mutate({
    title: values.title, 
    
    
    text: values.content, 

    tags: [values.tag.toLowerCase()], 
  });
};




  return (
    <div className={css.app}>
      <header className={css.toolbar}>
     
        <SearchBox onChange={handleSearchChange} />
        
     
        <Pagination
          currentPage={page}
          totalPages={data?.totalPages || 1}
          onPageChange={setPage}
        />
        
      
        <button className={css.button} onClick={() => setIsModalOpen(true)}>
          Create note +
        </button>
      </header>

      <main style={{ minHeight: '300px', position: 'relative' }}>
     
        {isLoading && <Loader />}

       
        {isError && <ErrorMessage message={error instanceof Error ? error.message : undefined} />}

        {!isLoading && data && data.notes.length > 0 && (
          <NoteList notes={data.notes} onDelete={(id) => deleteMutation.mutate(id)} />
        )}

     
        {!isLoading && data && data.notes.length === 0 && (
          <p style={{ textAlign: 'center', marginTop: '40px', color: '#666' }}>
            No notes found. Create a new one or clear your search query.
          </p>
        )}
      </main>

  
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <NoteForm
          onSubmit={handleCreateSubmit}
          onCancel={() => setIsModalOpen(false)}
        />
      </Modal>
    </div>
  );
}


