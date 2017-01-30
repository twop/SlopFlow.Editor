import { Handlers } from './structuredReducer';
import { IFlow, IPort, IFlowElement } from './flow.types';
import { assign } from './store';
import
{
  FlowAction,
  flowActions,
  IDeletePortAction,
  IEditPortAction,
  IMoveElemAction,
  INewElementAction,
  INewFlowPortAction,
  IRenameFlowAction
} from '../actions/flow.actions';

function editPort(flow: IFlow, {payload}: IEditPortAction): IFlow
{
  const updatePort = (port: IPort): IPort =>
  {
    if (port.id != payload.portId)
      return port;

    return assign(
      { ...port },
      {
        name: payload.name,
        dataTypeId: payload.dataTypeId,
        type: payload.portType
      });
  };

  return assign({ ...flow }, { ports: flow.ports.map(updatePort) });
}

const {
  NEW_PORT,
  ADD_ELEMENT,
  DELETE_PORT,
  EDIT_PORT,
  MOVE_ELEMENT,
  RENAME
} = flowActions;

export const flowHandlers: Handlers<IFlow> =
  {
    [NEW_PORT]: (flow, {payload}: INewFlowPortAction) => assign(
      { ...flow },
      { ports: flow.ports.concat(payload.port) }),

    [EDIT_PORT]: (flow, action: IEditPortAction) => editPort(flow, action),

    [ADD_ELEMENT]: (flow, {payload }: INewElementAction) => assign(
      { ...flow },
      { elements: flow.elements.concat(payload.element) }),

    [RENAME]: (flow, {payload }: IRenameFlowAction) => assign(
      { ...flow },
      { name: payload.newName }),

    [DELETE_PORT]: (flow, {payload }: IDeletePortAction) => assign(
      { ...flow },
      { ports: flow.ports.filter(p => p.id != payload.portId) }),

    [MOVE_ELEMENT]: (flow, {payload}: IMoveElemAction) =>
    {
      const {elemId, newPosition} = payload;
      return assign(
        { ...flow },
        {
          elements: flow.elements.map(e => 
          {
            if (e.id != elemId)
              return e;

            return { ...e, position: newPosition };
          })
        });
    }
  };