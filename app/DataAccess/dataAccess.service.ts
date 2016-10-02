import { Injectable } from '@angular/core';

import {Node} from '../Scene/node'
import {Port} from '../Scene/port'
import {DefaultTypes} from '../Scene/dataType';

@Injectable()
export class DataAccessService 
{
  private nodes: Node[];

  public getNodes(): Promise<Node[]>
  {
    var intType = DefaultTypes.int;
    var floatType = DefaultTypes.float;

    var sum = new Node("Sum");
    sum.add(new Port("input1", intType, true));
    sum.add(new Port("input2", intType, true));
    sum.add(new Port("output", intType, false));

    var greaterNode = new Node("Greater");
    greaterNode.add(new Port("input", floatType, true));
    greaterNode.add(new Port("output", floatType, false));

    this.nodes = [sum, greaterNode];

    return Promise.resolve(this.nodes);
  }
}