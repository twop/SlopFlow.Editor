import { Injectable } from '@angular/core';

import {Node} from '../Scene/node'
import {Port} from '../Scene/port'

@Injectable()
export class DataAccessService 
{
  private nodes: Node[];

  public getNodes(): Promise<Node[]>
  {
    var sum = new Node("Sum");
    sum.add(new Port("input1", "int", true));
    sum.add(new Port("input2", "int", true));
    sum.add(new Port("output", "int", false));

    var greaterNode = new Node("Greater");
    greaterNode.add(new Port("input", "int", true));
    greaterNode.add(new Port("output", "int", false));

    this.nodes = [sum, greaterNode];

    return Promise.resolve(this.nodes);
  }
}