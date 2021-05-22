/**@jsx jsx */
import { css, jsx } from '@emotion/react';

import IconBrowser from './components/IconBrowser';

const labIconViewerCss = css`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  max-height: 100%;
  color: var(--jp-ui-font-color0);
`;

export default function LabIconViewer() {
  return (
    <article className="icon-viewer" css={labIconViewerCss}>
      <header>
        <h1
          css={css`
            color: white;
          `}
        >
          Jupyter Lab Icons
        </h1>
        <p>Search and customize your icons for development</p>
      </header>
      <IconBrowser />
    </article>
  );
}
