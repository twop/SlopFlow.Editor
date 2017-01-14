import { IFlow } from '../store/flow.types';
import { FlowAction, FlowActionCreators } from '../actions/flow.actions';
import { IPortModel } from '../dialogs/portDialog.component';
import { rename } from 'fs';
import { History } from '../store/undoable';
import { DialogService } from './dialog.service';
export class ToolbarItem
{
  constructor(
    public actionName: string,
    public action: Function,
    public icon: string = null,
    public isEnabled: ()=>boolean = ()=> true)
    {}
}

export class Toolbar
{
  constructor(public name:string = null, ...toolbarItems: ToolbarItem[])
  {
    this.items.push(...toolbarItems);
  }

  public readonly items: Array<ToolbarItem> = [];
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
    dispatch:(action: FlowAction)=> void,
    actions: FlowActionCreators): Toolbar
  {
    const flowId = flow.present.id;
    const flowName = flow.present.name;

    const newPort = new ToolbarItem(
      'port',
      () => dialogs.createPort((model: IPortModel) => dispatch(actions.newPort(model, flowId))),
      ToolbarIcons.addNew);

    const rename = new ToolbarItem(
      'rename',
      () => dialogs.renameFlow(flowName, (newName: string) => dispatch(actions.rename(flowId, newName))),
      ToolbarIcons.edit);

    const undo = new ToolbarItem(
      'undo',
      () => dispatch(actions.undo(flowId)),
      ToolbarIcons.undo,
      () => flow.past.length > 0);

    const redo = new ToolbarItem(
      'redo',
      () => dispatch(actions.redo(flowId)),
      ToolbarIcons.redo,
      () => flow.future.length > 0);

    return new Toolbar(flowName, newPort, rename, undo, redo);
  }