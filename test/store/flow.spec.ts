import {suite, test} from "mocha-typescript";
import {expect} from "chai"

import {assign} from '../../app/store/store';

import { flowReducer } from '../../app/store/flow.reducers';
import { INewFlowPortAction, FlowActionCreators, IRenameFlowAction } from '../../app/actions/flow.actions';
import { IFlow, PortType, IPort, ElementType } from '../../app/store/flow.types';
import { IPortModel } from '../../app/dialogs/portDialog.component';

const actions = new FlowActionCreators();

@suite
class FlowReducerTests
{
  @test command_INewFlowPortAction()
  {
    const flow: IFlow = this.createEmptyFlow();

    const portModel: IPortModel = {
      portType: PortType.Input,
      isEditMode: true,
      dataTypeId: 123,
      name: "awesomePort"
    };

    const action = actions.newPort(portModel, flow.id);

    Object.freeze(flow);
    const expected = assign({...flow}, {ports: flow.ports.concat(action.payload.port)});
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

    const flow: IFlow = this.createEmptyFlow();
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

    const flow: IFlow = this.createEmptyFlow();
    flow.ports.push(port);
    Object.freeze(flow);

    const newFlow = flowReducer(flow, actions.deletePort(port.id, flow.id));

    expect(newFlow.ports).to.have.length(0);
  }

  @test command_IRenameFlowAction()
  {
    const flow: IFlow = this.createEmptyFlow();
    Object.freeze(flow);

    const action = actions.rename(flow.id, "new name")
    const expected = assign({...flow}, {name: action.payload.newName});
    const actual = flowReducer(flow, action);

    expect(actual).to.deep.equal(expected);
  }

  private createEmptyFlow(): IFlow
  {
    return {
      type: ElementType.Flow,
      id: 1,
      name: 'name',
      ports: [],
      elementLinks: [],
      elements: [],
      portLinks: []
    };
  }
}
