import {Injectable, EventEmitter} from '@angular/core'

import {Node} from '../Model/node'
import {Log} from '../LogComponent/log'

import {ISceneCommand} from './Commands/sceneCommand'
import {DataAccessService} from '../DataAccess/dataAccess.service'

import {NodeWorkspace} from './nodeWorkspace';
import {Workspace} from './workspace';
import {Flow} from '../Model/flow';
import {FlowWorkspace} from './flowWorkspace';

@Injectable()
export class Scene
{
  constructor(private log:Log, private dataService:DataAccessService)
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

  private nodes: Node[] = [];
  private nodeWorkspaces: NodeWorkspace[] = [];

  private flows:Flow[] = [];
  private flowWorkspaces: FlowWorkspace[] = [];
  
  public getNodeWorkspaces():NodeWorkspace[]
  {
    return this.nodeWorkspaces;
  }

  public getFlowWorkspaces():FlowWorkspace[]
  {
    return this.flowWorkspaces;
  }

  private loadNodes(nodes: Node[])
  {
    this.nodes = nodes;
    this.nodes.forEach(node=>
    {
      this.addNodeWorkspaceFor(node);
    });
  }

  private loadFlows(flows:Flow[])
  {
    this.flows = flows;
    this.flows.forEach(flow=>
    {
      this.addFlowWorkspaceFor(flow);
    });
  }

  public addNewNode(node: Node)
  {
    this.nodes.push(node);

    var workspace = this.addNodeWorkspaceFor(node);
    this.activateWorkspace(workspace);
  }

  public renameNodeInWorkspace(workspace: NodeWorkspace, newName:string)
  {
    workspace.node.name = newName;
    this.workspaceModified.emit(workspace);
  }

  private addNodeWorkspaceFor(node: Node):NodeWorkspace
  {
    var workspace =  new NodeWorkspace(node, this.log);
    this.nodeWorkspaces.push(workspace);
    var scene = this;
    workspace.modified.subscribe((w)=> scene.workspaceModified.emit(w));
    return workspace;
  }

  private addFlowWorkspaceFor(flow: Flow):FlowWorkspace
  {
    var workspace =  new FlowWorkspace(flow, this.log);
    this.flowWorkspaces.push(workspace);
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