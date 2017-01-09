import {suite, test} from "mocha-typescript";
import {expect} from "chai"

import {IPort, PortType, ElementType} from '../../app/store/node.types';
import {assign} from '../../app/store/store';

import {flowReducer} from '../../app/store/flow.reducers';
import { INewFlowPortAction, FlowActionCreators, IRenameFlowAction } from '../../app/actions/flow.actions';
import {IFlow} from '../../app/store/flow.types';
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
