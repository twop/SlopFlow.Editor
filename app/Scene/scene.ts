import {Injectable, EventEmitter} from '@angular/core'

import {Node} from './node'
import {Port} from './port'
import {Log} from '../LogComponent/log'

import {ICommand} from './Commands/command'
import {DataAccessService} from '../DataAccess/dataAccess.service'

import {Theme} from "../WorkspaceComponent/theme";
import {Workspace} from './workspace';

@Injectable()
export class Scene
{
  constructor(private log:Log, private dataService:DataAccessService, private theme: Theme)
  {
    this.dataService = dataService;
    this.dataService.getNodes().then(nodes => 
    {
      this.loadNodes(nodes, theme);
    });
  }

  public activeWorkspaceChanged = new EventEmitter<Workspace>();
  public workspaceModified = new EventEmitter<Workspace>();
  public activeWorkspace: Workspace = null;

  private nodes: Node[] = [];
  private workspaces: Workspace[] = [];
  
  public getWorkspaces():Workspace[]
  {
    return this.workspaces;
  }

  private loadNodes(nodes, theme: Theme)
  {
    this.nodes = nodes;
    this.nodes.forEach(node=>
    {
      node.recalculateSize(theme.sizes);
      this.workspaces.push(new Workspace(node));
    })
  }

  public addNewNode(node: Node)
  {
    this.nodes.push(node);
    node.recalculateSize(this.theme.sizes);

    var workspace = new Workspace(node);
    this.workspaces.push(workspace)

    this.activateWorkspace(workspace);
  }
  
  public activateWorkspace(workspace: Workspace): void
  {
    this.activeWorkspace = workspace;
    this.activeWorkspaceChanged.emit();
  }

  public addPortToNode(node:Node, port:Port, isInput:boolean)
  {
    var ports = isInput ? node.inputs : node.outputs;
    ports.push(port);
    node.recalculateSize(this.theme.sizes);

    this.workspaceModified.emit();
  }

  public executeCommand(command:ICommand):void
  {
    command.Execute(this, this.log);
  }
}