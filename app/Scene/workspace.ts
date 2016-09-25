import {Node} from "./node";
import {ViewInstance} from "./viewInstance";

export class Workspace
{
  constructor(public node: Node)
  {
    this.name = node.name;
    this.viewNode = new ViewInstance(node);

    //TODO: calculate that dynamically?
    this.viewNode.position.moveBy(20,20);
  }

  public viewNode: ViewInstance
  public name: string;
}