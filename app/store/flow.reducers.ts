import { IFlow } from './flow.types';
import { assign } from './store';
import { FlowAction, flowActions, INewFlowPortAction, IRenameFlowAction } from '../actions/flow.actions';

export function flowReducer(state: IFlow , action: FlowAction): IFlow
{
  switch (action.type)
  {
    case flowActions.NEW_PORT:
    {
      return assign({...state}, {ports: [...state.ports, (<INewFlowPortAction>action).payload.port]});
    }

    case flowActions.RENAME:
    {
      return assign({...state}, {name: (<IRenameFlowAction>action).payload.newName});
    }

    default:
      return state;
  }
}