import React from 'react';
import styles from './styles.module.scss';

interface ErrorMessageProps {
  onRetry: () => void;
  message?: string;
}

export const ErrorMessage = ({ onRetry, message }: ErrorMessageProps) => {
  return (
    <div className={styles.errorContainer}>
      <p className={styles.errorMessage}>
        {message || 'Something went wrong!'}
      </p>
      <button className={styles.retryButton} onClick={onRetry}>
        Retry
      </button>
    </div>
  );
};
