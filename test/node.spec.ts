import {INode, IPort, PortType} from '../app/store/node.types';
import {assign} from '../app/store/store';
import {INewNodePortAction, NodeActions} from '../app/actions/node.actions';
import {nodeReducer} from '../app/store/node.reducers';

import {suite, test} from "mocha-typescript";
import {expect} from "chai"

@suite
class NodeReducerTests
{
  @test command_INewNodePortAction()
  {
    const initialNode: INode = {id: 1, name: 'name', ports: []};

    console.log("initialNode:", initialNode);

    const port = {
          type: PortType.Input,
          id: 100500,
          dataTypeId: 123,
          name: "awesomePort"
        };

    console.log("port:",port);
    const action: INewNodePortAction = {
      nodeId: initialNode.id,
      type:   NodeActions.NEW_NODE_PORT,
      port
    };
    //
//    Object.freeze(initialNode);
//    const expected = assign({...initialNode}, {ports: initialNode.ports.concat(action.port)});
    //    const actual = nodeReducer(initialNode, action);
    //
    //    console.log("expected:", expected, "actual", actual);
    //
    //    expect(actual).to.be.equal(expected);
  }
}
