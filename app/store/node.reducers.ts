import { INode, IPort } from './node.types';
import { assign } from './store';

import {
  INewNodePortAction,
  NodeActions,
  INodeAction,
  IRenameNodeAction,
  IEditPortAction,
  IDeletePortAction
} from '../actions/node.actions';


function editPort(state: INode, action: IEditPortAction): INode
{
  const updatePort = (port: IPort):IPort =>
  {
    if (port.id != action.portId)
      return port;

    return assign(
      {...port},
      {
        name: action.name,
        dataTypeId: action.dataTypeId,
        type: action.portType
      });
  };

  return assign({...state}, {ports: state.ports.map(updatePort)});
}

const renameNode = (state: INode, action: IRenameNodeAction): INode => assign({...state}, {name: action.newName});

const defaultNode: INode =
        {
          name: "newNode",
          id: 0,
          ports: [],
        };

export function nodeReducer(state: INode = defaultNode, action: INodeAction): INode
{
  switch (action.type)
  {
    case NodeActions.NEW_NODE_PORT:
    {
      return assign({...state}, {ports: [...state.ports, (<INewNodePortAction>action).port]});
    }

    case NodeActions.EDIT_PORT:
    {
      return editPort(state, <IEditPortAction>action);
    }

    case NodeActions.DELETE_PORT:
    {
      return assign({...state}, {ports: state.ports.filter(p => p.id != (<IDeletePortAction>action).portId)});
    }

    case NodeActions.RENAME_NODE:
    {
      return renameNode(state, <IRenameNodeAction>action);
    }

    default:
      return state;
  }
}
