let typeCache: { [label: string]: boolean } = {};
export function type<T>(label: T | ''): T
{
  if (typeCache[<string>label])
  {
    throw new Error(`Action type "${label}" is not unique"`);
  }

  typeCache[<string>label] = true;

  return <T>label;
}

export function createActionTypeChecker<T extends { type: string }>(actions: { [key: string]: string })
{
  return (action: { type: string }): action is T =>
  {
    return Object.keys(actions).some(key => actions[key] === action.type);
  }
}