import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createNote } from '../../services/noteService';
import type { NoteTagType } from '../../types/note';

import cssStyles from './NoteForm.module.css';
const css = cssStyles as Record<string, string>;

const NoteSchema = Yup.object().shape({
  title: Yup.string()
    .min(3, 'Title is too short (min 3 characters)')
    .max(50, 'Title is too long (max 50 characters)')
    .required('Title is required'),
  content: Yup.string()
    .max(500, 'Content is too long (max 500 characters)'),
  tag: Yup.string()
    .oneOf(['Todo', 'Work', 'Personal', 'Meeting', 'Shopping'], 'Invalid tag selection')
    .required('Tag is required'),
});

interface NoteFormValues {
  title: string;
  content: string;
  tag: string;
}

// ВИПРАВЛЕНО: Інтерфейс тепер чітко очікує onClose відповідно до App.tsx
interface NoteFormProps {
  onClose: () => void;
}

export const NoteForm: React.FC<NoteFormProps> = ({ onClose }) => {
  const queryClient = useQueryClient();

  const createMutation = useMutation({
    mutationFn: (newNote: { title: string; content: string; tag: NoteTagType }) =>
      createNote(newNote),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] });
      onClose(); // Закриваємо модалку після успішного створення
    },
  });

  const initialValues: NoteFormValues = {
    title: '',
    content: '',
    tag: 'Todo',
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={NoteSchema}
      onSubmit={(values) => {
        createMutation.mutate({
          title: values.title,
          content: values.content,
          tag: values.tag as NoteTagType,
        });
      }}
    >
      {({ isSubmitting }) => (
        <Form className={css.form}>
          <div className={css.formGroup}>
            <label htmlFor="title">Title</label>
            <Field id="title" type="text" name="title" className={css.input} />
            <ErrorMessage name="title" component="span" className={css.error} />
          </div>

          <div className={css.formGroup}>
            <label htmlFor="content">Content</label>
            <Field
              id="content"
              name="content"
              as="textarea"
              rows={8}
              className={css.textarea}
            />
            <ErrorMessage name="content" component="span" className={css.error} />
          </div>

          <div className={css.formGroup}>
            <label htmlFor="tag">Tag</label>
            <Field id="tag" name="tag" as="select" className={css.select}>
              <option value="Todo">Todo</option>
              <option value="Work">Work</option>
              <option value="Personal">Personal</option>
              <option value="Meeting">Meeting</option>
              <option value="Shopping">Shopping</option>
            </Field>
            <ErrorMessage name="tag" component="span" className={css.error} />
          </div>

          <div className={css.actions}>
            {/* Кнопка Cancel тепер також тригерить onClose для безпечного закриття */}
            <button type="button" className={css.cancelButton} onClick={onClose}>
              Cancel
            </button>
            <button
              type="submit"
              className={css.submitButton}
              disabled={isSubmitting || createMutation.isPending}
            >
              {createMutation.isPending ? 'Creating...' : 'Create note'}
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

