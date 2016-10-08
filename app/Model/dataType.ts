export class DataType
{
  constructor(public name:string, public mappings:TypeMapping[] = [], public isPredefined:boolean = false)
  {
  }
}

export class TypeMapping
{
  constructor(public forLanguage:SupportedLanguage, public mapToType:string)   {}
}

export enum SupportedLanguage
{
  CSharp,
  JavaScript,
}

export class DefaultTypes
{
  static float: DataType = new DataType ("float",
    [
      new TypeMapping(SupportedLanguage.CSharp, "float"),
      new TypeMapping(SupportedLanguage.JavaScript, "number"),
    ],
    true);

  static string: DataType = new DataType ("string",
    [
      new TypeMapping(SupportedLanguage.CSharp, "string"),
      new TypeMapping(SupportedLanguage.JavaScript, "string"),
    ],
    true);

  static boolean: DataType = new DataType ("bool",
    [
      new TypeMapping(SupportedLanguage.CSharp, "bool"),
      new TypeMapping(SupportedLanguage.JavaScript, "boolean"),
    ],
    true);

  static int: DataType = new DataType ("int",
    [
      new TypeMapping(SupportedLanguage.CSharp, "int"),
      new TypeMapping(SupportedLanguage.JavaScript, "number"),
    ],
    true);

  static all:DataType[] = [DefaultTypes.float, DefaultTypes.string, DefaultTypes.boolean, DefaultTypes.int];
}