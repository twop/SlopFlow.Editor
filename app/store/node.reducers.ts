import {INewPortAction, NodeActions, INodeAction, IRenameNodeAction, IEditPortAction} from '../actions/node.actions';
import {NodeFactory, INodeRecord, PortFactory, IPortRecord} from './node.types';
import {List} from 'immutable';

function addPort(state: INodeRecord, action: INewPortAction): INodeRecord
{
  const port = PortFactory(action.port);
  return state.set('ports', state.ports.push(port));
}

function editPort(state: INodeRecord, action: IEditPortAction): INodeRecord
{
  const updatePort = (portRecord:IPortRecord) =>
  {
    let mutablePort = portRecord.asMutable();
    mutablePort.name = action.name;
    mutablePort.dataTypeId = action.dataTypeId;
    mutablePort.type = action.portType;
    return mutablePort.asImmutable();
  };

  const index = state.ports.findIndex((p) => p.id == action.portId);
  return state.set('ports', state.ports.update(index, updatePort));
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

    case NodeActions.RENAME_NODE:
    {
      return renameNode(state, <IRenameNodeAction>action);
    }

    default:
      return state;
  }
}
