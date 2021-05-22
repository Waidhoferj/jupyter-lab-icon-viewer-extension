import {
  JupyterFrontEnd,
  JupyterFrontEndPlugin,
  ILayoutRestorer
} from '@jupyterlab/application';
import { Widget } from '@lumino/widgets';
import LabIconViewer from './LabIconViewer';

import {
  ReactWidget,
  MainAreaWidget,
  ICommandPalette,
  WidgetTracker
} from '@jupyterlab/apputils';

/**
 * Initialization data for the labiconviewer extension.
 */
const extension: JupyterFrontEndPlugin<void> = {
  id: 'labiconviewer:plugin',
  autoStart: true,
  requires: [ICommandPalette, ILayoutRestorer],
  activate
};

async function activate(
  app: JupyterFrontEnd,
  pallette: ICommandPalette,
  restorer: ILayoutRestorer
) {
  const openCommand = 'labiconviewer:open';
  let widget: MainAreaWidget<Widget>;
  let tracker = new WidgetTracker<MainAreaWidget<Widget>>({
    namespace: 'labiconviewer'
  });

  app.commands.addCommand(openCommand, {
    label: 'Browse Jupyter Lab Icons',
    execute() {
      if (!widget || widget.isDisposed) {
        const content = ReactWidget.create(LabIconViewer());
        widget = new MainAreaWidget({ content });
        widget.title.label = 'Jupyter Lab Icon Browser';
      }

      if (!tracker.has(widget)) {
        tracker.add(widget);
      }

      if (!widget.isAttached) {
        app.shell.add(widget, 'main');
      }
    }
  });

  pallette.addItem({ command: openCommand, category: 'Reference' });

  restorer.restore(tracker, {
    command: openCommand,
    name: () => 'labiconviewer'
  });
}

export default extension;
