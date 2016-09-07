import {Injectable, EventEmitter} from '@angular/core'

import {Node} from './node'
import {Port} from './port'
import {Logger} from './logger'

import {ICommand} from '../Commands/command'

@Injectable()
export class Scene
{
  public nodes: Node[] = [];

  constructor(private logger:Logger)
  {
    var sum = new Node("Sum");
    sum.addInput(new Port("input1", "int"))
    sum.addInput(new Port("input2", "int"))
    sum.addOutput(new Port("output", "int"))

    var greaterNode = new Node("Greater");
    greaterNode.addInput(new Port("input", "int"))
    greaterNode.addOutput(new Port("output", "int"))

    this.nodes.push(sum, greaterNode);
  }

  selectedNodeChanged = new EventEmitter<Node>();
  selectedNode: Node = null;

  selectNode(node: Node): void
  {
    this.selectedNode = node;
    this.selectedNodeChanged.emit(node);
  }

  executeCommand(command:ICommand):void
  {
    command.Execute(this, this.logger);
  }
}