import { INode, IPort, PortType, ElementType } from '../../app/store/node.types';
import { assign } from '../../app/store/store';
import
{
  INewNodePortAction,
  IEditPortAction,
  IDeletePortAction,
  IRenameNodeAction,
  NodeActionCreators
} from '../../app/actions/node.actions';
import { nodeReducer } from '../../app/store/node.reducers';
import { IPortModel } from '../../app/dialogs/portDialog.component';

import { suite, test } from "mocha-typescript";
import { expect } from "chai"


const actions = new NodeActionCreators();

@suite
class NodeReducerTests
{
  @test command_INewNodePortAction()
  {
    const node: INode = this.createEmptyNode();
    Object.freeze(node);

    const portModel: IPortModel = {
      portType: PortType.Input,
      isEditMode: true,
      dataTypeId: 123,
      name: "awesomePort"
    };

    const action = actions.newPort(portModel, node.id);
    const expected = assign({ ...node }, { ports: node.ports.concat(action.payload.port) });
    const actual = nodeReducer(node, action);

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

    const node: INode = this.createEmptyNode();
    node.ports.push(port);

    Object.freeze(node);

    const portModel: IPortModel = {
      portType: PortType.Output,
      isEditMode: true,
      dataTypeId: 22,
      name: "new name"
    };

    const newNode = nodeReducer(node, actions.editPort(portModel, port.id, node.id));
    expect(newNode.ports).to.have.length(1);

    const expectedPort = {
      type: portModel.portType,
      id: port.id,
      dataTypeId: portModel.dataTypeId,
      name: portModel.name
    };
    expect(newNode.ports[0]).to.deep.equal(expectedPort);
  }

  @test command_IDeletePortAction()
  {
    const port: IPort = {
      type: PortType.Input,
      id: 100500,
      dataTypeId: 123,
      name: "awesomePort"
    };

    const node: INode = this.createEmptyNode();
    node.ports.push(port);
    Object.freeze(node);

    const newNode = nodeReducer(node, actions.deletePort(port.id, node.id));

    expect(newNode.ports).to.have.length(0);
  }

  @test command_IRenameNodeAction()
  {
    const node: INode = this.createEmptyNode();
    Object.freeze(node);

    const action = actions.rename(node.id, "new name");

    const newNode = nodeReducer(node, action);
    expect(newNode.name).to.be.equal(action.payload.newName);
  }

  private createEmptyNode(): INode
  {
    return {
      type: ElementType.Node,
      id: 1,
      name: 'name',
      ports: []
    };
  }
}
