import { Injectable } from '@angular/core';

import {Node, NodePort} from '../Model/node'
import {DefaultTypes} from '../Model/dataType';

@Injectable()
export class DataAccessService 
{
  private nodes: Node[];

  public getNodes(): Promise<Node[]>
  {
    var intType = DefaultTypes.int;
    var floatType = DefaultTypes.float;

    var sum = new Node("Sum");
    sum.add(new NodePort("input1", intType, true));
    sum.add(new NodePort("input2", intType, true));
    sum.add(new NodePort("output", intType, false));

    var greaterNode = new Node("Greater");
    greaterNode.add(new NodePort("input", floatType, true));
    greaterNode.add(new NodePort("output", floatType, false));

    this.nodes = [sum, greaterNode];

    return Promise.resolve(this.nodes);
  }
}