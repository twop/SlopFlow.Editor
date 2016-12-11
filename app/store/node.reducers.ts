import {
  INewPortAction, NodeActions, INodeAction, IRenameNodeAction, IEditPortAction,
  IDeletePortAction
} from '../actions/node.actions';
import {NodeFactory, INodeRecord, PortFactory, IPortRecord} from './node.types';
import {List} from 'immutable';

function addPort(state: INodeRecord, action: INewPortAction): INodeRecord
{
  const port = PortFactory(action.port);
  return state.withMutations(node => node.ports = node.ports.push(port));
}

function deletePort(state: INodeRecord, action: IDeletePortAction): INodeRecord
{
  const index = state.ports.findIndex((p) => p.id == action.portId);
  return state.withMutations(node => node.ports = node.ports.delete(index));
}

function editPort(state: INodeRecord, action: IEditPortAction): INodeRecord
{
  const updatePort = (portRecord: IPortRecord) =>
  {
    let mutablePort = portRecord.asMutable();
    mutablePort.name = action.name;
    mutablePort.dataTypeId = action.dataTypeId;
    mutablePort.type = action.portType;
    return mutablePort.asImmutable();
  };

  const index = state.ports.findIndex((p) => p.id == action.portId);
  return state.withMutations(node => node.ports = node.ports.update(index, updatePort));
}

const renameNode = (state: INodeRecord, action: IRenameNodeAction): INodeRecord => state.set('name', action.newName);


export function nodeReducer(state: INodeRecord = NodeFactory(), action: INodeAction): INodeRecord
{
  switch (action.type)
  {
    case NodeActions.NEW_PORT:
    {
      return addPort(state, <INewPortAction>action);
    }

    case NodeActions.EDIT_PORT:
    {
      return editPort(state, <IEditPortAction>action);
    }

    case NodeActions.DELETE_PORT:
    {
      return deletePort(state, <IDeletePortAction>action);
    }

    case NodeActions.RENAME_NODE:
    {
      return renameNode(state, <IRenameNodeAction>action);
    }

    default:
      return state;
  }
}
