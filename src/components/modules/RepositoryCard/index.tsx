import { RepositoryDetails } from '@/types';
import Image from 'next/image';
import styles from './styles.module.scss';

export interface RepositoryCardProps {
  lastNodeRef: ((node: HTMLDivElement | null) => void) | null;
  repository: RepositoryDetails;
}

const AVAILABLE_ICONS = new Set([
  'typescript',
  'javascript',
  'python',
  'java',
  'ruby',
  'go',
  'php',
  'c++',
  'c#',
  'html',
  'css',
  'shell',
  'json',
  'kotlin',
  'swift',
  'scala',
  'dockerfile',
  'rust',
  'default',
]);

const LanguageIcon = ({ lang }: { lang: string }) => {
  const normalizedLang = lang.toLowerCase();
  const iconName = AVAILABLE_ICONS.has(normalizedLang)
    ? normalizedLang
    : 'default';
  const src = `/icons/${iconName}.svg`;

  return (
    <Image
      src={src}
      alt={lang}
      width={20}
      height={20}
      unoptimized
      className={styles['language-icon']}
    />
  );
};

function RepositoryCard({ repository, lastNodeRef }: RepositoryCardProps) {
  return (
    <div ref={lastNodeRef} className={styles['repository-card']}>
      <div className={styles['repository-header']}>
        <h3>
          <a
            href={repository.url}
            target="_blank"
            rel="noopener noreferrer"
            className={styles['repo-link']}
          >
            {repository.name}
          </a>
        </h3>
        <div className={styles['forks']}>
          <span>Forks:</span> {repository.forksCount}
        </div>
      </div>

      <p className={styles['description']}>
        {repository.description || 'No description available.'}
      </p>

      <div className={styles['languages']}>
        {repository.languages && repository.languages.length > 0 ? (
          repository.languages.map((lang) => (
            <div key={lang} className={styles['language-badge']}>
              <LanguageIcon lang={lang} />
              <span>{lang}</span>
            </div>
          ))
        ) : (
          <div className={styles['language-badge']}>
            <LanguageIcon lang="code" />
            <span>Unknown</span>
          </div>
        )}
      </div>

      {repository.forkUsers && repository.forkUsers.length > 0 && (
        <div className={styles['fork-users']}>
          <span>Forked by:</span>
          <div className={styles['fork-users-list']}>
            {repository.forkUsers.map((user) => (
              <a
                key={user.id}
                href={user.profileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={styles['fork-user']}
                title={user.name}
              >
                <Image
                  src={user.avatarUrl}
                  alt={user.name}
                  width={30}
                  height={30}
                  className={styles['fork-user-avatar']}
                  unoptimized
                />
                <span className={styles['fork-user-name']}>{user.name}</span>
              </a>
            ))}
            {repository.forkUsers.length > 5 && (
              <span className={styles['more-forks']}>
                +{repository.forkUsers.length - 5}
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default RepositoryCard;
