import { IFlow, IPort, IFlowElement } from './flow.types';
import { assign } from './store';
import { INewElementAction } from '../actions/flow.actions';
import
{
  FlowAction,
  flowActions,
  IDeletePortAction,
  IEditPortAction,
  INewFlowPortAction,
  IRenameFlowAction
} from '../actions/flow.actions';

function editPort(state: IFlow, action: IEditPortAction): IFlow
{
  const updatePort = (port: IPort): IPort =>
  {
    if (port.id != action.payload.portId)
      return port;

    return assign(
      { ...port },
      {
        name: action.payload.name,
        dataTypeId: action.payload.dataTypeId,
        type: action.payload.portType
      });
  };

  return assign({ ...state }, { ports: state.ports.map(updatePort) });
}

export function flowReducer(state: IFlow, action: FlowAction): IFlow
{
  switch (action.type)
  {
    case flowActions.NEW_PORT:
      {
        return assign({ ...state }, { ports: [...state.ports, (<INewFlowPortAction>action).payload.port] });
      }

    case flowActions.EDIT_PORT:
      {
        return editPort(state, <IEditPortAction>action);
      }

    case flowActions.ADD_ELEMENT:
      {
        const element:IFlowElement = (<INewElementAction>action).payload.element;
        return assign({...state}, {elements: state.elements.concat(element)});
      }

    case flowActions.RENAME:
      {
        return assign({ ...state }, { name: (<IRenameFlowAction>action).payload.newName });
      }

    case flowActions.DELETE_PORT:
      {
        return assign({ ...state }, { ports: state.ports.filter(p => p.id != (<IDeletePortAction>action).payload.portId) });
      }

    default:
      return state;
  }
}