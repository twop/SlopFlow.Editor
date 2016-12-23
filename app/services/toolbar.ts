export class ToolbarItem
{
  constructor(
    public actionName: string,
    public action: Function,
    public icon: string = null,
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

export class ToolbarIcons
{
  static readonly edit = "edit";
  static readonly delete = "trash";
  static readonly redo = "repeat";
  static readonly undo = "undo";
  static readonly addNew = "plus-circle";
}