export class ToolbarItem
{
  constructor(
    public actionName: string,
    public action: Function,
    public glyphicon: string = null,
    public isEnabled: ()=>boolean = ()=> true)
    {}
}

export class Toolbar
{
  constructor(public name:string = null, ...toolbarItems: ToolbarItem[])
  {
    this.items.push(...toolbarItems);
  }

  public readonly items: Array<ToolbarItem> = [];
}

export class Glyphicons
{
  static readonly edit = "glyphicon-edit";
  static readonly delete = "glyphicon-trash";
  static readonly redo = "glyphicon-circle-arrow-right";
  static readonly undo = "glyphicon-circle-arrow-left";
  static readonly addNew = "glyphicon-plus-sign";
}