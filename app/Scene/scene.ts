///<reference path="../../node_modules/@angular/core/src/facade/async.d.ts"/>
import {Injectable, EventEmitter} from '@angular/core'

import {Node} from '../Model/node'
import {Log} from '../LogComponent/log'

import {ISceneCommand} from './Commands/sceneCommand'
import {DataAccessService} from '../DataAccess/dataAccess.service'

import {Theme} from "../Common/theme";
import {NodeWorkspace} from './nodeWorkspace';

@Injectable()
export class Scene
{
  constructor(private log:Log, private dataService:DataAccessService, private theme: Theme)
  {
    this.dataService = dataService;
    this.dataService.getNodes().then(nodes => 
    {
      this.loadNodes(nodes);
    });
  }

  public activeWorkspaceChanged = new EventEmitter<NodeWorkspace>();
  public workspaceModified = new EventEmitter<NodeWorkspace>();
  public activeWorkspace: NodeWorkspace = null;

  private nodes: Node[] = [];
  private workspaces: NodeWorkspace[] = [];
  
  public getWorkspaces():NodeWorkspace[]
  {
    return this.workspaces;
  }

  private loadNodes(nodes)
  {
    this.nodes = nodes;
    this.nodes.forEach(node=>
    {
      this.addWorkspaceFor(node);
    })
  }

  public addNewNode(node: Node)
  {
    this.nodes.push(node);

    var workspace = this.addWorkspaceFor(node);
    this.activateWorkspace(workspace);
  }

  public renameNodeInWorkspace(workspace: NodeWorkspace, newName:string)
  {
    workspace.name = newName;
    workspace.node.name = newName;
    this.workspaceModified.emit(workspace);
  }

  private addWorkspaceFor(node: Node):NodeWorkspace
  {
    var workspace =  new NodeWorkspace(node, this.theme.sizes, this.log);
    this.workspaces.push(workspace);
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