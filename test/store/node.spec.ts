import {INode, IPort, PortType} from '../../app/store/node.types';
import {assign} from '../../app/store/store';
import {
  INewNodePortAction,
  IEditPortAction,
  IDeletePortAction,
  IRenameNodeAction,
  NodeActions
} from '../../app/actions/node.actions';
import {nodeReducer} from '../../app/store/node.reducers';

import {suite, test} from "mocha-typescript";
import {expect} from "chai"

@suite class NodeReducerTests
{
  @test command_INewNodePortAction()
  {
    const initialNode: INode = {id: 1, name: 'name', ports: []};

    const port: IPort = {
      type: PortType.Input,
      id: 100500,
      dataTypeId: 123,
      name: "awesomePort"
    };

    const action: INewNodePortAction = {
      nodeId: initialNode.id,
      type: NodeActions.NEW_NODE_PORT,
      port
    };

    Object.freeze(initialNode);
    const expected = assign({...initialNode}, {ports: initialNode.ports.concat(action.port)});
    const actual = nodeReducer(initialNode, action);

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

    const initialNode: INode = {id: 1, name: 'name', ports: [port]};

    const action: IEditPortAction = {
      nodeId: initialNode.id,
      type: NodeActions.EDIT_PORT,
      dataTypeId: 22,
      name: "new name",
      portId: port.id,
      portType: PortType.Output
    };

    Object.freeze(initialNode);
    const newNode = nodeReducer(initialNode, action);

    expect(newNode.ports).to.have.length(1);

    const expectedPort = {
      type: action.portType,
      id: port.id,
      dataTypeId: action.dataTypeId,
      name: action.name
    };
    expect(newNode.ports[0]).to.deep.equal( expectedPort);
  }

  @test command_IDeletePortAction()
  {
    const port: IPort = {
      type: PortType.Input,
      id: 100500,
      dataTypeId: 123,
      name: "awesomePort"
    };

    const initialNode: INode = {id: 1, name: 'name', ports: [port]};

    const action: IDeletePortAction = {
      nodeId: initialNode.id,
      type: NodeActions.DELETE_PORT,
      portId: port.id,
    };

    Object.freeze(initialNode);
    const newNode = nodeReducer(initialNode, action);

    expect(newNode.ports).to.have.length(0);
  }

  @test command_IRenameNodeAction()
  {
    const initialNode: INode = {id: 1, name: 'name', ports: []};

    const action: IRenameNodeAction= {
      nodeId: initialNode.id,
      type: NodeActions.RENAME_NODE,
      newName: "new node name"
    };

    Object.freeze(initialNode);
    const newNode = nodeReducer(initialNode, action);

    expect(newNode.name).to.be.equal(action.newName);
  }
}
