import * as JupyterUI from '@jupyterlab/ui-components';

const toFriendly = (text: string) =>
  text[0].toUpperCase() + text.slice(1).replace(/([A-Z])/g, ' $1');

const Icons = Object.entries(JupyterUI)
  .filter(
    ([name, component]) =>
      name.endsWith('Icon') && component instanceof JupyterUI.LabIcon
  )
  .map(([name, icon]) => ({
    friendlyName: toFriendly(name),
    name,
    icon: icon as JupyterUI.LabIcon
  }));

export default Icons;
