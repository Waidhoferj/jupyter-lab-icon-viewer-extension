/**@jsx jsx */
import { css, jsx } from '@emotion/react';
import { useState, useMemo } from 'react';
import Icons from '../modules/lab-icons';

const iconBrowserCss = css`
  position: relative;

  width: 100%;
  height: calc(100vh - 200px);
`;

const iconListCss = css`
  flex: 1;
  list-style: none;
  padding: 10px;
  margin: auto;
  text-align: center;
  height: 100%;
  overflow-y: scroll;
  padding-bottom: 30px;
`;

const iconCardCss = css`
  position: relative;
  display: inline-block;
  margin: 15px;
  width: 150px;
  height: 150px;
  padding: 20px;
  background: var(--jp-layout-color2);
  border-radius: 10px;
  box-shadow: var(--jp-elevation-z4);
  cursor: pointer;
  transition: all 0.5s;

  &:hover {
    background: var(--jp-layout-color3);
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

export default function IconBrowser() {
  const [query, setQuery] = useState('');

  const searchResults = useMemo(() => {
    const normalizedQuery = query.toLowerCase().replace(/ /g, '');
    return Icons.filter(({ name }) => {
      const normalizedName = name.toLowerCase().replace(/ /g, '');
      return normalizedName.includes(normalizedQuery);
    });
  }, [query]);

  return (
    <section className="IconBrowser" css={iconBrowserCss}>
      <SearchBar onChange={query => setQuery(query)} />
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
    </section>
  );
}

interface SearchBarProps {
  onChange: (query: string) => void;
}

function SearchBar(props: SearchBarProps) {
  return (
    <div className="SearchBar">
      JUI
      <input
        type="search"
        name="icon-search"
        onChange={e => props.onChange(e.target.value)}
      />
    </div>
  );
}
