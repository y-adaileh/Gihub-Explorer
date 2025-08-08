import styles from './styles.module.scss';

export const Loader = () => {
  return (
    <div data-testid="test-loader" className={styles.loaderContainer}>
      <div className={styles.loader}></div>
    </div>
  );
};
