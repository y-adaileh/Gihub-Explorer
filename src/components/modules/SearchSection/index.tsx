import { useState, useEffect } from 'react';
import axios from 'axios';

import config from '@/config';
import { SearchField, SearchTap } from '@/components';
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
      <div className={styles['tabs-container']}>
        {searchTaps.map((tap) => (
          <SearchTap key={tap.label} {...tap} onTapSelect={onTapSelect} />
        ))}
      </div>
    );
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
            setHasMoreItems(true);
            setSearchUsersResults((prev) => [...prev, ...data]);
          } else {
            setHasMoreItems(false);
          }
        } else {
          const { data } = await axios.get(
            `${config.api.routes.repositories}?searchTerm=${debounceSearchTerm}&limit=${PAGE_LIMIT}&page=${page}`
          );

          if (data?.length !== 0) {
            setHasMoreItems(true);
            setSearchReposResults((prev) => [...prev, ...data]);
          } else {
            setHasMoreItems(false);
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
      <div>
        <SearchField
          placeholder={SEARCH_FIELD_PLACEHOLDERS[activeTap]}
          value={searchTerm}
          type="text"
          onChange={searchTermChangeHandler}
        />
      </div>

      <div>
        {(activeTap === SearchTapLabel.Users
          ? searchUsersResults
          : searchReposResults
        ).map((user, index, self) => (
          <div
            style={{
              height: '50px',
              backgroundColor: 'lightblue',
              color: 'white',
              borderBottom: '1px solid black',
            }}
            key={user.id}
            ref={self.length === index + 1 ? lastNodeRef : null}
          >
            {user.name}
          </div>
        ))}
      </div>
      <div>{loading && 'loading ...'}</div>
      {searchError && (
        <div style={{ color: 'red' }}>
          <p>{'Something went wrong!'}</p>
          <button onClick={fetchGithubInfo}>Retry</button>
        </div>
      )}

      {searchTerm.length > 3 &&
        !(searchUsersResults.length || searchReposResults.length) &&
        !searchError &&
        !loading && <div style={{ backgroundColor: 'gray' }}>No Data!</div>}
    </div>
  );
}

export default SearchSection;
