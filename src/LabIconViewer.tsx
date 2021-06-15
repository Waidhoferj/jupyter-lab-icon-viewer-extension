/**@jsx jsx */
import { css, jsx } from '@emotion/react';
import { jupyterIcon } from '@jupyterlab/ui-components';
import IconBrowser from './components/IconBrowser';

const labIconViewerCss = css`
  position: absolute;
  display: flex;
  flex-direction: column;
  top: 0;
  left: 0;
  width: 100%;
  max-height: 100%;
  color: var(--jp-ui-font-color0);
  text-align: center;

  header .title {
    font-size: 44px;
    margin: 10px auto;
  }

  .jupyter-logo svg {
    width: 100px;
    height: 100px;
    margin: 50px auto 0 auto;
  }
`;

export default function LabIconViewer() {
  return (
    <article className="icon-viewer" css={labIconViewerCss}>
      <header>
        <jupyterIcon.react className="jupyter-logo" />
        <h1 className="title">Jupyter Lab Icons</h1>
        <p className="description">
          Search and customize your icons for development
        </p>
      </header>
      <IconBrowser />
    </article>
  );
}
