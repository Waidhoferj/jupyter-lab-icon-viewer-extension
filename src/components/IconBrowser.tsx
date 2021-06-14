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

const searchBarCss = css`
  input {
    font-family: inherit;
    font-size: 20px;
    padding: 15px 20px;
    border: var(--jp-border-width) solid var(--jp-border-color0);
    border-radius: var(--jp-border-radius);
  }
`;

export default function IconBrowser() {
  const [query, setQuery] = useState('');
  const [iconColor, setIconColor] = useState('--jp-layout-color1');

  const iconCss = css`
    & * {
      stroke: var(${iconColor}) !important;
      fill: var(${iconColor}) !important;
    }
  `;

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
      <ColorPicker onChange={e => setIconColor(e.target.value)} />
      <ul className="icon-results" css={iconListCss}>
        {searchResults.map(({ friendlyName, icon }) => (
          <li css={iconCardCss} key={friendlyName}>
            <div className="card-content">
              <icon.react
                css={iconCss}
                width="35px"
                height="auto"
                display="block"
              />
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
    <div className="SearchBar" css={searchBarCss}>
      <input
        type="search"
        name="icon-search"
        onChange={e => props.onChange(e.target.value)}
      />
    </div>
  );
}

interface ColorPickerProps {
  onChange: React.ChangeEventHandler<HTMLSelectElement>;
}

const colorPickerCss = css`
  .color-label {
    display: inline-block;
  }

  .color-swatch {
    display: inline-block;
    width: 150px;
    height: 150px;
    margin-right: 20px;
  }
`;

function ColorPicker(props: ColorPickerProps) {
  function createColorVariables(prefix: string, number: number) {
    return new Array(number).fill('').map((_, i) => prefix + i);
  }

  const colorGroups = [
    {
      title: 'Layout Colors',
      colors: createColorVariables('--jp-layout-color', 5)
    },
    {
      title: 'Inverse Layout Colors',
      colors: createColorVariables('--jp-inverse-layout-color', 5)
    },
    {
      title: 'Brand Colors',
      colors: createColorVariables('--jp-brand-color', 4)
    },
    {
      title: 'Brand Accent Colors',
      colors: createColorVariables('--jp-accent-color', 4)
    },

    {
      title: 'Warning Colors',
      colors: createColorVariables('--jp-warn-color', 4)
    },
    {
      title: 'Error Colors',
      colors: createColorVariables('--jp-error-color', 4)
    },
    {
      title: 'Success Colors',
      colors: createColorVariables('--jp-success-color', 4)
    },
    {
      title: 'Info Colors',
      colors: createColorVariables('--jp-info-color', 4)
    }
  ];

  return (
    <select name="color-picker" css={colorPickerCss} onChange={props.onChange}>
      {colorGroups.map(group => (
        <optgroup label={group.title}>
          {group.colors.map(color => {
            return <option value={color}>{color}</option>;
          })}
        </optgroup>
      ))}
    </select>
  );
}
