import { NodeAction, NodeActionCreators } from '../actions/node.actions';
import { IFlow } from '../store/flow.types';
import { FlowAction, FlowActionCreators } from '../actions/flow.actions';
import { IPortModel } from '../dialogs/portDialog.component';
import { rename } from 'fs';
import { History } from '../store/undoable';
import { DialogService } from './dialog.service';
import { INode } from '../store/node.types';
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
      () => dialogs.renameNode(flowName, (newName: string) => dispatch(actions.rename(flowId, newName))),
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

 export function buildNodeToolbar(
    node: History<INode>,
    dialogs: DialogService,
    dispatch:(action: NodeAction)=> void,
    actions: NodeActionCreators): Toolbar
  {
    const nodeId = node.present.id;
    const nodeName = node.present.name;

    const newPort = new ToolbarItem(
      'port',
      () => dialogs.createPort((model: IPortModel) => dispatch(actions.newPort(model, nodeId))),
      ToolbarIcons.addNew);

    const rename = new ToolbarItem(
      'rename',
      () => dialogs.renameNode(nodeName, (newName: string) => dispatch(actions.rename(nodeId, newName))),
      ToolbarIcons.edit);

    const undo = new ToolbarItem(
      'undo',
      () => dispatch(actions.undo(nodeId)),
      ToolbarIcons.undo,
      () => node.past.length > 0);

      const redo = new ToolbarItem(
      'redo',
      () => dispatch(actions.redo(nodeId)),
      ToolbarIcons.redo,
      () => node.future.length > 0);

    return new Toolbar(node.present.name, newPort, rename, undo, redo);
  }  