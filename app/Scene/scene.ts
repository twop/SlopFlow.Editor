import {Injectable, EventEmitter} from '@angular/core'

import {Node} from './node'
import {Log} from '../LogComponent/log'

import {ISceneCommand} from './Commands/sceneCommand'
import {DataAccessService} from '../DataAccess/dataAccess.service'

import {Theme} from "../Common/theme";
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
      this.addWorkspaceFor(node);
    })
  }

  public addNewNode(node: Node)
  {
    this.nodes.push(node);
    node.recalculateSize(this.theme.sizes);

    var workspace = this.addWorkspaceFor(node);
    this.activateWorkspace(workspace);
  }

  public renameNodeInWorkspace(workspace: Workspace, newName:string)
  {
    workspace.name = newName;
    workspace.node.name = newName;
    this.workspaceModified.emit(workspace);
  }

  private addWorkspaceFor(node: Node):Workspace
  {
    var workspace =  new Workspace(node, this.theme.sizes, this.log);
    this.workspaces.push(workspace);
    var scene = this;
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