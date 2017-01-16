import { suite, test } from "mocha-typescript";
import { expect, assert } from "chai"

import { assign } from '../../app/store/store';

import { flowReducer } from '../../app/store/flow.reducers';
import {
  flowActionCreators,
  INewElementAction,
  INewFlowPortAction,
  IRenameFlowAction
} from '../../app/actions/flow.actions';
import { IFlow, PortType, IPort, ElementType, IFlowElement } from '../../app/store/flow.types';
import { IPortModel } from '../../app/dialogs/portDialog.component';
import { createFlow } from '../utils';
import { Point } from '../../app/geometry/point';

const actions = flowActionCreators;

@suite
class FlowReducerTests
{
  @test command_INewFlowPortAction()
  {
    const flow: IFlow = createFlow();

    const portModel: IPortModel = {
      portType: PortType.Input,
      isEditMode: true,
      dataTypeId: 123,
      name: "awesomePort"
    };

    const action = actions.newPort(portModel, flow.id);

    Object.freeze(flow);
    const expected = assign({ ...flow }, { ports: flow.ports.concat(action.payload.port) });
    const actual = flowReducer(flow, action);

    expect(actual).to.deep.equal(expected);
  }

  @test command_IEditPortAction()
  {
    const port: IPort = {
      type: PortType.Input,
      id: 100500,
      dataTypeId: 123,
      name: "awesomePort"
    };

    const flow: IFlow = createFlow();
    flow.ports.push(port);

    Object.freeze(flow);

    const portModel: IPortModel = {
      portType: PortType.Output,
      isEditMode: true,
      dataTypeId: 22,
      name: "new name"
    };

    const newFlow = flowReducer(flow, actions.editPort(portModel, port.id, flow.id));
    expect(newFlow.ports).to.have.length(1);

    const expectedPort = {
      type: portModel.portType,
      id: port.id,
      dataTypeId: portModel.dataTypeId,
      name: portModel.name
    };
    expect(newFlow.ports[0]).to.deep.equal(expectedPort);
  }

  @test command_IDeletePortAction()
  {
    const port: IPort = {
      type: PortType.Input,
      id: 100500,
      dataTypeId: 123,
      name: "awesomePort"
    };

    const flow: IFlow = createFlow();
    flow.ports.push(port);
    Object.freeze(flow);

    const newFlow = flowReducer(flow, actions.deletePort(port.id, flow.id));

    expect(newFlow.ports).to.have.length(0);
  }

  @test command_IRenameFlowAction()
  {
    const flow: IFlow = createFlow();
    Object.freeze(flow);

    const action: IRenameFlowAction = actions.rename(flow.id, "new name")
    const expected = assign({ ...flow }, { name: action.payload.newName });
    const actual = flowReducer(flow, action);

    expect(actual).to.deep.equal(expected);
  }

  @test command_INewElementAction()
  {
    const flowId = 333;
    const flow: IFlow = createFlow({ id: flowId });
    Object.freeze(flow);

    const originId = 100500;
    const origin: IFlow = createFlow({ id: originId });
    Object.freeze(origin);

    const action: INewElementAction = actions.addElement(flow.id, "new elem", origin, new Point(0,9))
    const element: IFlowElement = action.payload.element;
    const expected = assign({ ...flow }, { elements: [element] });
    const actual = flowReducer(flow, action);

    assert.deepEqual(actual, expected);
  }
}
