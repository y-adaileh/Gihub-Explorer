import styles from './styles.module.scss';

export const NoDataMessage = () => {
  return (
    <div>
      <p className={styles.message}>
        Sorry, no results found! Try adjusting your search or check back later.
      </p>
    </div>
  );
};
