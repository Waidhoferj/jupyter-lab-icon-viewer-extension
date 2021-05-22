import * as JupyterUI from '@jupyterlab/ui-components';

const Icons = Object.entries(JupyterUI)
  .filter(
    ([name, component]) =>
      name.endsWith('Icon') && component instanceof JupyterUI.LabIcon
  )
  .map(([name, icon]) => ({
    friendlyName: name,
    name,
    icon: icon as JupyterUI.LabIcon
  }));

export default Icons;
