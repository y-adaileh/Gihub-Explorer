import Image from 'next/image';
import { UserDetails } from '@/types';
import styles from './styles.module.scss';

export interface UserCardProps {
  lastNodeRef: ((node: HTMLDivElement | null) => void) | null;
  user: UserDetails;
}

function UserCard({ user, lastNodeRef }: UserCardProps) {
  return (
    <div ref={lastNodeRef} className={styles['user-card']}>
      <div className={styles['avatar-wrapper']}>
        <Image
          src={user.avatarUrl}
          alt={`${user.name} avatar`}
          width={70}
          height={70}
          className={styles.avatar}
          priority={false}
          unoptimized={false}
        />
      </div>
      <div className={styles['user-info']}>
        <a
          href={user.profileUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={styles['user-name']}
          title={`Visit ${user.name}'s GitHub profile`}
        >
          {user.name}
        </a>
        <p className={styles['user-type']}>{user.type}</p>
        <p className={styles['user-score']}>⭐ Score: {user.score}</p>
        {user.siteAdmin && <span className={styles['admin-badge']}>Admin</span>}
      </div>
    </div>
  );
}

export default UserCard;
