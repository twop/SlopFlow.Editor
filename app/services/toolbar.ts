import { IFlow } from '../store/flow.types';
import { FlowAction, flowActionCreators } from '../actions/flow.actions';
import { IPortModel } from '../dialogs/portDialog.component';
import { History } from '../store/undoable';
import { DialogService } from './dialog.service';

export interface ToolbarItem
{
  readonly name: string,
  readonly action: () => void,
  readonly icon?: string,
  readonly disabled?: boolean
}

export class Toolbar
{
  constructor(readonly name: string, readonly items: ToolbarItem[])
  {}
}

export class ToolbarIcons
{
  static readonly edit = "edit";
  static readonly delete = "trash";
  static readonly redo = "repeat";
  static readonly undo = "undo";
  static readonly addNew = "plus-circle";
}

export function buildFlowToolbar(
  flow: History<IFlow>,
  dialogs: DialogService,
  dispatch: (action: FlowAction) => void): Toolbar
{

  const actions = flowActionCreators;

  const flowId = flow.present.id;
  const flowName = flow.present.name;

  const newPort: ToolbarItem = {
    name: 'port',
    action: () => dialogs.createPort((model: IPortModel) => dispatch(actions.newPort(model, flowId))),
    icon: ToolbarIcons.addNew
  }

  const rename: ToolbarItem = {
    name: 'rename',
    action: () => dialogs.renameFlow(flowName, (newName: string) => dispatch(actions.rename(flowId, newName))),
    icon: ToolbarIcons.edit
  };

  const undo: ToolbarItem = {
    name: 'undo',
    action: () => dispatch(actions.undo(flowId)),
    icon: ToolbarIcons.undo,
    disabled: flow.past.length === 0
  };

  const redo: ToolbarItem = {
    name: 'redo',
    action: () => dispatch(actions.redo(flowId)),
    icon: ToolbarIcons.redo,
    disabled: flow.future.length === 0
  };

  return new Toolbar(flowName, [newPort, rename, undo, redo]);
}