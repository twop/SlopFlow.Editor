import {Injectable, EventEmitter} from '@angular/core'

import {Node} from '../Model/node'
import {Log} from '../LogComponent/log'

import {ISceneCommand} from './Commands/sceneCommand'
import {DataAccessService} from '../DataAccess/dataAccess.service'

import {NodeWorkspace} from './nodeWorkspace';
import {Workspace} from './workspace';
import {Flow} from '../Model/flow';
import {FlowWorkspace} from './flowWorkspace';
import {LayoutService} from './layout.service';
import {ModalService} from '../Forms/modal.service';

@Injectable()
export class Scene
{
  constructor(
    private log:Log,
    private dataService:DataAccessService,
    private layoutService:LayoutService,
    private modalService: ModalService)
  {
    this.dataService = dataService;
    this.dataService.getAppData().then(appData =>
    {
      this.loadNodes(appData.nodes);
      this.loadFlows(appData.flows);

      this.activeWorkspace = this.nodeWorkspaces.length && this.nodeWorkspaces[0];
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

    const workspace = this.addNodeWorkspaceFor(node);
    this.activateWorkspace(workspace);
  }

  public addNewFlow(flow: Flow)
  {
    this.flows.push(flow);

    const workspace = this.addFlowWorkspaceFor(flow);
    this.activateWorkspace(workspace);
  }

  public renameNodeInWorkspace(workspace: NodeWorkspace, newName:string)
  {
    workspace.node.name = newName;
    this.workspaceModified.emit(workspace);
  }

  private addNodeWorkspaceFor(node: Node):NodeWorkspace
  {
    const scene = this;

    const workspace =  new NodeWorkspace(scene, node, this.log, this.layoutService, this.modalService);
    this.nodeWorkspaces.push(workspace);
    workspace.modified.subscribe((w)=> scene.workspaceModified.emit(w));
    return workspace;
  }

  private addFlowWorkspaceFor(flow: Flow):FlowWorkspace
  {
    const workspace =  new FlowWorkspace(flow, this.log, this.layoutService, this.modalService);
    this.flowWorkspaces.push(workspace);
    const scene = this;
    workspace.modified.subscribe((w)=> scene.workspaceModified.emit(w));
    return workspace;
  }
  
  public activateWorkspace(workspace: Workspace): void
  {
    this.activeWorkspace = workspace;
    this.activeWorkspaceChanged.emit(workspace);
  }

  public executeCommand(command:ISceneCommand):void
  {
    command.Execute(this, this.log);
  }
}