import styles from './styles.module.scss';
export interface SearchFieldProps {
  placeholder: string;
  value: string;
  type: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const SearchField = (props: SearchFieldProps) => {
  return (
    <div data-testid="search-input">
      <input className={styles.input} {...props} />
    </div>
  );
};
