import {INewPortAction, NodeActions, INodeAction, IRenameNodeAction} from '../actions/node.actions';
import {NodeFactory, INodeRecord, PortFactory, IPortRecord} from './node.types';
import {List} from 'immutable';


function addPort(state: INodeRecord, action: INewPortAction): INodeRecord
{
  const port = PortFactory(action.port);
  const destination = action.isInput ? 'inputs' : 'outputs';
  const destList:List<IPortRecord>= state.get(destination);
  return state.set(destination, destList.push(port));
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

    case NodeActions.RENAME_NODE:
    {
      return renameNode(state, <IRenameNodeAction>action);
    }

    default:
      return state;
  }
}
