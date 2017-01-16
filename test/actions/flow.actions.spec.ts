import { suite, test } from "mocha-typescript";
import { assert } from "chai"

import { flowActionCreators, INewElementAction, flowActions } from '../../app/actions/flow.actions';
import { ElementType, IElementPort, IFlow, IFlowElement, IPort, PortType } from '../../app/store/flow.types';
import { Point } from '../../app/geometry/point';
import { createFlow } from '../utils';

const actions = flowActionCreators;

@suite
class FlowActionCreatorsTests
{
  @test addElement_takesOriginProps()
  {
    const originId = 100500;
    const origin: IFlow = createFlow({ id: originId });

    const flowId = 333;
    const elemName = "instance name";

    const position = new Point(1, 2);

    const action: INewElementAction = actions.addElement(flowId, elemName, origin, position);

    const element: IFlowElement = action.payload.element;
    assert.equal(action.type, flowActions.ADD_ELEMENT);
    assert.equal(action.payload.flowId, flowId);
    assert.notEqual(element.id, originId);

    const expectedElement: IFlowElement =
      {
        id: element.id, //don't care about actual value
        originId,
        type: origin.type,
        name: elemName,
        position,
        ports: []
      }

    assert.deepEqual(element, expectedElement);
  }

  @test addElement_wrapsPorts()
  {
    const port: IPort =
      {
        id: 333,
        name: "port name",
        dataTypeId: 100333,
        type: PortType.Input
      };

    const origin: IFlow = createFlow({ ports: [port] });
    
    const action: INewElementAction = actions.addElement(22, "elem name", origin, new Point(0, 0));
    const elemPorts: IElementPort[] = action.payload.element.ports;

    assert.lengthOf(elemPorts, 1);
    const resultPort = elemPorts[0];

    assert.notEqual(resultPort.id, port.id);
    const expectedPort: IElementPort = {...port, originPortId: port.id, id: resultPort.id};
    assert.deepEqual(resultPort, expectedPort)
  }
}
