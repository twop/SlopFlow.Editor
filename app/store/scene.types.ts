import {makeTypedFactory, TypedRecord} from 'typed-immutable-record';
import {List} from 'immutable'

export interface INode
{
  id:number;
  name:string;
}
export interface INodeRecord extends TypedRecord<INodeRecord>, INode {}
export const NodeFactory = makeTypedFactory<INode, INodeRecord>({name:"newNode", id:0});


export interface IWorkspace
{
  node:INode;
}
export interface IWorkspaceRecord extends TypedRecord<IWorkspaceRecord>, IWorkspace {}
export const WorkspaceFactory = makeTypedFactory<IWorkspace, IWorkspaceRecord>({node: null});


export interface IScene
{
  workspaces:List<IWorkspace>;
}
export const InitialScene = {workspaces: List<IWorkspace>()};
export interface ISceneRecord extends TypedRecord<ISceneRecord>, IScene {}
export const SceneFactory = makeTypedFactory<IScene, ISceneRecord>(InitialScene);

