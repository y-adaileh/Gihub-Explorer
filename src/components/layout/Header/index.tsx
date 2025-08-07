import styles from './styles.module.scss';

function Header() {
  return (
    <header className={styles['header-container']}>
      <h1>GitHub Explorer</h1>
    </header>
  );
}

export default Header;
