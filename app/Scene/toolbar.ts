export class Glyphicons
{
  static readonly edit = "glyphicon-edit";
  static readonly delete = "glyphicon-trash";
  static readonly redo = "glyphicon-circle-arrow-right";
  static readonly undo = "glyphicon-circle-arrow-left";
  static readonly addNew = "glyphicon-plus-sign";
}

export class ToolbarItem
{
  constructor(
    public actionName: string,
    public action: Function,
    public enabled: boolean = true,
    public glyphicon: string = null)
  {}
}

export class Toolbar
{
  public readonly items: Array<ToolbarItem> = [];
}
