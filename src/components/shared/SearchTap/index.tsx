import cx from 'classnames';
import { SearchTapLabel } from '@/types';
import styles from './styles.module.scss';

export interface SearchTapProps {
  label: SearchTapLabel;
  isActive: boolean;
  onTapSelect: (tapLabel: SearchTapLabel) => void;
}

export const SearchTap = ({ label, isActive, onTapSelect }: SearchTapProps) => {
  return (
    <div
      className={cx(styles['tap-container'], { [styles['active']]: isActive })}
    >
      <button onClick={() => onTapSelect(label)}> {label} </button>
    </div>
  );
};
