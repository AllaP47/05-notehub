import React from 'react';

interface ErrorMessageProps {
  message?: string;
}


export const ErrorMessage: React.FC<ErrorMessageProps> = ({ message = 'Something went wrong.' }) => {
  return (
    <div style={{ textAlign: 'center', padding: '20px', color: 'red' }}>
      <p>⚠️ {message}</p>
    </div>
  );
};

