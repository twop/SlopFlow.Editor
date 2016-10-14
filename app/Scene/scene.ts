import {Injectable, EventEmitter} from '@angular/core'

import {Node} from '../Model/node'
import {Log} from '../LogComponent/log'

import {ISceneCommand} from './Commands/sceneCommand'
import {DataAccessService} from '../DataAccess/dataAccess.service'

import {Theme} from "../Common/theme";
import {NodeWorkspace} from './nodeWorkspace';
import {Workspace} from './workspace';
import {Flow} from '../Model/flow';

@Injectable()
export class Scene
{
  constructor(private log:Log, private dataService:DataAccessService, private theme: Theme)
  {
    this.dataService = dataService;
    this.dataService.getAppData().then(appData =>
    {
      this.loadNodes(appData.nodes);
      this.loadFlows(appData.flows);
    });
  }

  public activeWorkspaceChanged = new EventEmitter<Workspace>();
  public workspaceModified = new EventEmitter<Workspace>();
  public activeWorkspace: Workspace = null;

  private flows:Flow[] = [];

  private nodes: Node[] = [];
  private nodeWorkspaces: NodeWorkspace[] = [];
  
  public getNodeWorkspaces():NodeWorkspace[]
  {
    return this.nodeWorkspaces;
  }

  public getFlowWorkspaces():NodeWorkspace[]
  {
    return this.nodeWorkspaces;
  }

  private loadNodes(nodes: Node[])
  {
    this.nodes = nodes;
    this.nodes.forEach(node=>
    {
      this.addWorkspaceFor(node);
    })
  }

  private loadFlows(flows:Flow[])
  {
    this.flows = flows;
  }

  public addNewNode(node: Node)
  {
    this.nodes.push(node);

    var workspace = this.addWorkspaceFor(node);
    this.activateWorkspace(workspace);
  }

  public renameNodeInWorkspace(workspace: NodeWorkspace, newName:string)
  {
    workspace.node.name = newName;
    this.workspaceModified.emit(workspace);
  }

  private addWorkspaceFor(node: Node):NodeWorkspace
  {
    var workspace =  new NodeWorkspace(node, this.theme.sizes, this.log);
    this.nodeWorkspaces.push(workspace);
    var scene = this;
    workspace.modified.subscribe((w)=> scene.workspaceModified.emit(w));
    return workspace;
  }
  
  public activateWorkspace(workspace: NodeWorkspace): void
  {
    this.activeWorkspace = workspace;
    this.activeWorkspaceChanged.emit(workspace);
  }

  public executeCommand(command:ISceneCommand):void
  {
    command.Execute(this, this.log);
  }
}