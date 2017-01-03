import {suite, test} from "mocha-typescript";
import {expect} from "chai"

import {IPort, PortType, ElementType} from '../../app/store/node.types';
import {assign} from '../../app/store/store';

import {flowReducer} from '../../app/store/flow.reducers';
import {INewFlowPortAction, FlowActions, IRenameFlowAction} from '../../app/actions/flow.actions';
import {IFlow} from '../../app/store/flow.types';

@suite
class FlowReducerTests
{
  @test command_INewFlowPortAction()
  {
    const flow: IFlow = this.createEmptyFlow();

    const port: IPort = {
      type: PortType.Input,
      id: 100500,
      dataTypeId: 123,
      name: "awesomePort"
    };

    const action: INewFlowPortAction = {
      flowId: flow.id,
      type: FlowActions.NEW_FLOW_PORT,
      port
    };

    Object.freeze(flow);
    const expected = assign({...flow}, {ports: flow.ports.concat(action.port)});
    const actual = flowReducer(flow, action);

    expect(actual).to.deep.equal(expected);
  }

  @test command_IRenameFlowAction()
  {
    const flow: IFlow = this.createEmptyFlow();
    Object.freeze(flow);

    const action: IRenameFlowAction = {
      flowId: flow.id,
      type: FlowActions.RENAME_FLOW,
      newName: "new flow name"
    };

    const expected = assign({...flow}, {name: action.newName});
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
