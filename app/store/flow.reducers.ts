import { IFlow } from './flow.types';
import { IFlowAction, FlowActions, INewFlowPortAction, IRenameFlowAction } from '../actions/flow.actions';
import { assign } from './store';

export function flowReducer(state: IFlow , action: IFlowAction): IFlow
{
  switch (action.type)
  {
    case FlowActions.NEW_FLOW_PORT:
    {
      return assign({...state}, {ports: [...state.ports, (<INewFlowPortAction>action).port]});
    }

    case FlowActions.RENAME_FLOW:
    {
      return assign({...state}, {name: (<IRenameFlowAction>action).newName});
    }

    default:
      return state;
  }
}