import {Injectable, EventEmitter} from '@angular/core'

import {Node} from './node'
import {Port} from './port'
import {Log} from '../LogComponent/log'

import {ICommand} from './Commands/command'
import {DataAccessService} from '../DataAccess/dataAccess.service'

import {Theme} from "../WorkspaceComponent/theme";

@Injectable()
export class Scene
{
  constructor(private log:Log, private dataService:DataAccessService, private theme: Theme)
  {
    this.dataService = dataService;
    this.dataService.getNodes().then(nodes => 
    {
      this.nodes = nodes;
      this.nodes.forEach(node=>node.recalculateSize(theme.sizes))
    });
  }

  public updated = new EventEmitter<any>();
  public selectedNode: Node = null;
  public isInNodeEditMode = true;

  private nodes: Node[] = [];
  
  public getNodes():Node[] 
  {
    return this.nodes;
  }

  public addNewNode(node: Node)
  {
    this.nodes.push(node);
    this.selectNode(node);
    node.recalculateSize(this.theme.sizes);

    this.updated.emit();
  }
  
  public selectNode(node: Node): void
  {
    this.selectedNode = node;

    this.updated.emit();
  }

  public addPortToNode(node:Node, port:Port, isInput:boolean)
  {
    var ports = isInput ? node.inputs : node.outputs;
    ports.push(port);
    node.recalculateSize(this.theme.sizes);

    this.updated.emit();
  }

  public executeCommand(command:ICommand):void
  {
    command.Execute(this, this.log);
  }
}