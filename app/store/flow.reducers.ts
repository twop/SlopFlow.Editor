import { IFlow } from './flow.types';
import { IFlowAction, FlowActions, INewFlowPortAction } from '../actions/flow.actions';
import { assign } from './store';

export function flowReducer(state: IFlow , action: IFlowAction): IFlow
{
  switch (action.type)
  {
    case FlowActions.NEW_FLOW_PORT:
    {
      return assign({...state}, {ports: [...state.ports, (<INewFlowPortAction>action).port]});
    }

    // case NodeActions.EDIT_PORT:
    // {
    //   return editPort(state, <IEditPortAction>action);
    // }

    // case NodeActions.DELETE_PORT:
    // {
    //   return assign({...state}, {ports: state.ports.filter(p => p.id != (<IDeletePortAction>action).portId)});
    // }

    // case NodeActions.RENAME_NODE:
    // {
    //   return renameNode(state, <IRenameNodeAction>action);
    // }

    default:
      return state;
  }
}