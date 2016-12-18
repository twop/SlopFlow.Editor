import { Action } from 'redux';
import { IFlow } from '../store/flow.types';
import { newId } from './idgen';
import { IPort } from '../store/node.types';
import { IPortModel } from '../dialogs/portDialog.component';
import { NgRedux } from 'ng2-redux';
import { IAppState } from '../store/store';

export interface IFlowAction extends Action
{
  flowId: number;
}

export interface INewFlowPortAction extends IFlowAction
{
  port:IPort;
}

export class FlowActions
{
  static readonly NEW_FLOW_PORT = 'NEW_FLOW_PORT';
  static readonly FLOW_UNDO = 'FLOW_UNDO';
  static readonly FLOW_REDO = 'FLOW_REDO';

  // TODO is there a better solution for that?
  private static all = [
    FlowActions.NEW_FLOW_PORT,
    FlowActions.FLOW_REDO,
    FlowActions.FLOW_UNDO,
  ];

  static isFlowAction(action: {type: string}): action is IFlowAction
  {
    return FlowActions.all.findIndex((t) => t === action.type) >= 0;
  }

  constructor(private ngRedux: NgRedux<IAppState>) {}
  
  newPort(portModel: IPortModel, flowId: number): void
  {
    const port: IPort =
            {
              id: newId(),
              name: portModel.name,
              dataTypeId: portModel.dataTypeId,
              type: portModel.portType
            };

    this.ngRedux.dispatch<INewFlowPortAction>(
      {
        type: FlowActions.NEW_FLOW_PORT,
        port,
        flowId
      });
  }  
}