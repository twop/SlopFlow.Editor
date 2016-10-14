import { Injectable } from '@angular/core';

import {Node, NodePort} from '../Model/node'
import {DefaultTypes} from '../Model/dataType';
import {Flow, PortLink, FlowPort} from '../Model/flow';
import {NodeInstance} from '../Model/nodeInstance';

@Injectable()
export class DataAccessService 
{
  private nodes: Node[];
  private flows:Flow[];

  public getAppData(): Promise<AppData>
  {
    const intType = DefaultTypes.int;
    const floatType = DefaultTypes.float;

    const sum = new Node("Sum");
    sum.add(new NodePort("input1", intType, true));
    sum.add(new NodePort("input2", intType, true));
    sum.add(new NodePort("output", intType, false));

    const greaterNode = new Node("Greater");
    greaterNode.add(new NodePort("input", floatType, true));
    greaterNode.add(new NodePort("output", floatType, false));

    const sum4 = new Flow('Sum4');

    const firstNode = new NodeInstance("firstNode", sum);
    const secondNode = new NodeInstance("secondNode", sum);
    const resultNode = new NodeInstance("resultNode", sum);

    const linkFirstToResult = new PortLink(firstNode, firstNode.outputs[0], resultNode, resultNode.inputs[0]);
    const linkSecondToResult = new PortLink(secondNode, secondNode.outputs[0], resultNode, resultNode.inputs[1]);
    sum4.links.push(linkFirstToResult, linkSecondToResult);

    sum4.nodes.push(firstNode, secondNode, resultNode);

    sum4.outputs.push(new FlowPort(firstNode.inputs[0], "input1"))
    sum4.outputs.push(new FlowPort(firstNode.inputs[1], "input2"))
    sum4.outputs.push(new FlowPort(secondNode.inputs[0], "input3"))
    sum4.outputs.push(new FlowPort(secondNode.inputs[1], "input4"))
    sum4.outputs.push(new FlowPort(resultNode.outputs[0], "output"))

    this.nodes = [sum, greaterNode];
    this.flows = [sum4];

    return Promise.resolve( { nodes: this.nodes, flows: this.flows});
  }
}

export interface AppData
{
  nodes:Node[];
  flows:Flow[];
}