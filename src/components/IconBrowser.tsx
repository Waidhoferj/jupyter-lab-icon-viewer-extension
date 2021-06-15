/**@jsx jsx */
import { css, jsx } from '@emotion/react';
import { useState, useMemo } from 'react';
import Icons from '../modules/lab-icons';
import { StringExt } from '@lumino/algorithm';

const iconBrowserCss = css`
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
`;

const iconListCss = css`
  flex: 1;
  list-style: none;
  padding: 10px;
  margin: auto;
  text-align: center;
  height: 100%;
  overflow-y: scroll;
  padding-bottom: 50px;
`;

const iconCardCss = css`
  position: relative;
  display: inline-block;
  margin: 15px;
  width: 150px;
  height: 150px;
  padding: 20px;
  background: var(--jp-layout-color1);
  border-radius: 10px;
  box-shadow: var(--jp-elevation-z2);
  cursor: pointer;
  transition: all 0.5s;

  &:hover {
    box-shadow: var(--jp-elevation-z4);
  }

  > .card-content {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 100%;
    height: 100%;
  }
`;

const searchBarCss = css`
  margin: 20px;
  input {
    width: 80%;
    max-width: 800px;
    font-family: inherit;
    font-size: 20px;
    padding: 15px 20px;
    border: var(--jp-border-width) solid var(--jp-border-color0);
    border-radius: var(--jp-border-radius);
  }
`;

export default function IconBrowser() {
  const [query, setQuery] = useState('');

  const searchResults = useMemo(() => {
    const notAlpha = /[^A-Za-z]/g;
    const normQuery = query.replace(notAlpha, '').toLowerCase();
    const compScore = (name: string) =>
      StringExt.matchSumOfSquares(
        name.replace(notAlpha, '').toLowerCase(),
        normQuery
      )?.score;
    if (query.length === 0) return Icons;
    const results = Icons.filter(({ name }) => {
      return compScore(name) ?? false;
    });

    results.sort((a, b) => compScore(a.name) - compScore(b.name));
    return results;
  }, [query]);

  return (
    <section className="IconBrowser" css={iconBrowserCss}>
      <SearchBar onChange={query => setQuery(query)} />
      <div style={{ height: '100%' }}>
        <ul className="icon-results" css={iconListCss}>
          {searchResults.map(({ friendlyName, icon }) => (
            <li css={iconCardCss} key={friendlyName}>
              <div className="card-content">
                <icon.react width="35px" height="auto" display="block" />
                <p>{friendlyName}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

interface SearchBarProps {
  onChange: (query: string) => void;
}

function SearchBar(props: SearchBarProps) {
  return (
    <div className="SearchBar" css={searchBarCss}>
      <input
        type="search"
        placeholder="Search"
        name="icon-search"
        onChange={e => props.onChange(e.target.value)}
      />
    </div>
  );
}
