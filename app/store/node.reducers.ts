import { INode, IPort, ElementType } from './node.types';
import { assign } from './store';
import
{
  IEditPortAction,
  NodeAction,
  nodeActions,
  INewNodePortAction,
  IDeletePortAction,
  IRenameNodeAction
} from '../actions/node.actions';

function editPort(state: INode, action: IEditPortAction): INode
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

const defaultNode: INode =
  {
    type: ElementType.Node,
    name: "newNode",
    id: 0,
    ports: [],
  };

export function nodeReducer(state: INode = defaultNode, action: NodeAction): INode
{
  switch (action.type)
  {
    case nodeActions.NEW_PORT:
      {
        return assign({ ...state }, { ports: [...state.ports, (<INewNodePortAction>action).payload.port] });
      }

    case nodeActions.EDIT_PORT:
      {
        return editPort(state, <IEditPortAction>action);
      }

    case nodeActions.DELETE_PORT:
      {
        return assign({ ...state }, { ports: state.ports.filter(p => p.id != (<IDeletePortAction>action).payload.portId) });
      }

    case nodeActions.RENAME:
      {
        return assign({ ...state }, { name: (<IRenameNodeAction>action).payload.newName });
      }

    default:
      return state;
  }
}
