import { Injectable } from '@angular/core';

import {Node} from '../Model/node'
import {Port} from '../Model/port'

@Injectable()
export class DataAccessService 
{
  private nodes: Node[];

  public getNodes(): Promise<Node[]>
  {
    var sum = new Node("Sum");
    sum.addInput(new Port("input1", "int"))
    sum.addInput(new Port("input2", "int"))
    sum.addOutput(new Port("output", "int"))

    var greaterNode = new Node("Greater");
    greaterNode.addInput(new Port("input", "int"))
    greaterNode.addOutput(new Port("output", "int"))

    this.nodes = [sum, greaterNode];

    return Promise.resolve(this.nodes);
  }
}