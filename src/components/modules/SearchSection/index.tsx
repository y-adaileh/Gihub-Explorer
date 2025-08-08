import { useState, useEffect } from 'react';
import axios from 'axios';

import config from '@/config';
import {
  Loader,
  SearchField,
  SearchTap,
  NoDataMessage,
  ErrorMessage,
} from '@/components';
import UserCard from '../UserCard';
import RepositoryCard from '../RepositoryCard';
import {
  SearchTap as SearchTapType,
  SearchTapLabel,
  UserDetails,
  RepositoryDetails,
} from '@/types';
import useDebounce from '@/hooks/useDebounce';
import useInfiniteScroll from '@/hooks/useInfiniteScroll';

import styles from './styles.module.scss';

const SEARCH_FIELD_PLACEHOLDERS = {
  [SearchTapLabel.Users]: 'Search for Users',
  [SearchTapLabel.Repositories]: 'Search for Repositories',
};

const PAGE_LIMIT = 10;

function SearchSection() {
  // State
  const [activeTap, setActiveTap] = useState<SearchTapLabel>(
    SearchTapLabel.Users
  );
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [searchUsersResults, setSearchUsersResults] = useState<UserDetails[]>(
    []
  );
  const [searchReposResults, setSearchReposResults] = useState<
    RepositoryDetails[]
  >([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [searchError, setSearchError] = useState<boolean>(false);
  const [hasMoreItems, setHasMoreItems] = useState<boolean>(false);

  const [debounceSearchTerm] = useDebounce(searchTerm);
  const { page, reset, lastNodeRef } = useInfiniteScroll(
    loading,
    hasMoreItems,
    searchError
  );

  // Taps
  const renderSearchTaps = () => {
    const searchTaps: SearchTapType[] = [
      {
        label: SearchTapLabel.Users,
        isActive: activeTap === SearchTapLabel.Users,
      },
      {
        label: SearchTapLabel.Repositories,
        isActive: activeTap === SearchTapLabel.Repositories,
      },
    ];
    return (
      <div className={styles['taps-container']}>
        {searchTaps.map((tap) => (
          <SearchTap key={tap.label} {...tap} onTapSelect={onTapSelect} />
        ))}
      </div>
    );
  };

  const renderTapMessage = () => {
    const TAP_MESSAGES = {
      [SearchTapLabel.Users]: `Browse GitHub’s community of passionate developers. Discover profiles, projects,
         and expertise from across the globe.`,
      [SearchTapLabel.Repositories]: `Explore powerful GitHub repositories. Find open-source projects,
         tools, and libraries to boost your development journey.`,
    };

    return (
      <div className={styles['tap-message']}>
        <p>{TAP_MESSAGES[activeTap]}</p>
      </div>
    );
  };

  const renderResultsUsersCards = () => {
    return (
      <div className={styles['cards-container']}>
        {searchUsersResults.map((user, idx, self) => (
          <UserCard
            key={user.id}
            user={user}
            lastNodeRef={self.length === idx + 1 ? lastNodeRef : null}
          />
        ))}
      </div>
    );
  };

  const renderResultsRepositoryCards = () => {
    return (
      <div className={styles['repositories-container']}>
        {searchReposResults.map((repository, idx, self) => (
          <RepositoryCard
            key={repository.id}
            repository={repository}
            lastNodeRef={self.length === idx + 1 ? lastNodeRef : null}
          />
        ))}
      </div>
    );
  };

  const renderResultsCards = () => {
    if (activeTap === SearchTapLabel.Users) {
      return renderResultsUsersCards();
    }

    if (activeTap === SearchTapLabel.Repositories) {
      return renderResultsRepositoryCards();
    }
  };

  const renderNoDataMessage = () => {
    if (
      searchTerm.length > 3 &&
      !(searchUsersResults.length || searchReposResults.length) &&
      !searchError &&
      !loading
    ) {
      return <NoDataMessage />;
    }
  };

  // Handlers
  const onTapSelect = (tapLabel: SearchTapLabel) => {
    setSearchTerm('');
    reset();
    setHasMoreItems(false);
    setActiveTap(tapLabel);
    setSearchUsersResults([]);
    setSearchReposResults([]);
    setLoading(false);
    setSearchError(false);
  };

  const searchTermChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchUsersResults([]);
    setSearchReposResults([]);
    reset();
    if (e.target.value.length > 3) setLoading(true);
    setSearchTerm(e.target.value);
  };

  const fetchGithubInfo = async () => {
    setSearchError(false);
    try {
      if (debounceSearchTerm.length > 3) {
        if (activeTap === SearchTapLabel.Users) {
          const { data } = await axios.get(
            `${config.api.routes.users}?searchTerm=${debounceSearchTerm}&limit=${PAGE_LIMIT}&page=${page}`
          );
          if (data?.length !== 0) {
            console.log('data?.length', data?.length);

            setHasMoreItems(data?.length === PAGE_LIMIT);
            setSearchUsersResults((prev) => [...prev, ...data]);
          }
        } else {
          const { data } = await axios.get(
            `${config.api.routes.repositories}?searchTerm=${debounceSearchTerm}&limit=${PAGE_LIMIT}&page=${page}`
          );

          if (data?.length !== 0) {
            setHasMoreItems(data?.length === PAGE_LIMIT);
            setSearchReposResults((prev) => [...prev, ...data]);
          }
        }
      }
    } catch (error) {
      console.error(error);
      setSearchError(true);
      setHasMoreItems(false);
    } finally {
      setLoading(false);
    }
  };

  const onRetry = () => {
    setLoading(true);
    fetchGithubInfo();
  };

  // Debounce scrolling
  useEffect(() => {
    if (page > 1) {
      setLoading(true);
      const getScrollableItemsTimer = setTimeout(() => {
        fetchGithubInfo();
      }, 300);

      return () => clearTimeout(getScrollableItemsTimer);
    }
  }, [page]);

  useEffect(() => {
    fetchGithubInfo();
  }, [debounceSearchTerm]);

  return (
    <div className={styles.container}>
      <h2>Find Developers and Projects on GitHub</h2>
      {renderSearchTaps()}
      {renderTapMessage()}
      <SearchField
        placeholder={SEARCH_FIELD_PLACEHOLDERS[activeTap]}
        value={searchTerm}
        type="text"
        onChange={searchTermChangeHandler}
      />
      {renderResultsCards()}
      {loading && <Loader />}
      {searchError && <ErrorMessage onRetry={onRetry} />}
      {renderNoDataMessage()}
    </div>
  );
}

export default SearchSection;
