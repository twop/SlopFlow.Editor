import { ActionReducer, Action } from "@ngrx/store";

export interface History<T>
{
  past: T[];
  present: T;
  future: T[];
}

export interface UndoableConfig
{
  undoAction: string;
  redoAction: string;
  limit: number;
}

export function undoable<T>(reducer: ActionReducer<T>, config: UndoableConfig): ActionReducer<History<T>>
{
  const initialState: History<T> = {
    past: [],
    present: reducer(undefined, { type: 'some type' }),
    future: []
  };

  let firstInsert: boolean = true;

  return function (state = initialState, action: Action)
  {
    const { past, present, future } = state;
    switch (action.type)
    {
      case config.undoAction:
        {
          const previous = past[past.length - 1];
          const newPast = past.slice(0, past.length - 1);
          return {
            past: newPast,
            present: previous,
            future: [present, ...future]
          };
        }
      case config.redoAction:
        const next = future[0];
        const newFuture = future.slice(1);
        return {
          past: [...past, present],
          present: next,
          future: newFuture
        };
      default:
        // Delegate handling the action to the passed reducer
        const newPresent = reducer(present, action);
        if (present === newPresent)
        {
          return state
        }

        const historyOverflow = config.limit && (past.length + 1) >= config.limit;
        const trimmedPast = historyOverflow ? past.slice(1) : past;
        const newPast = firstInsert ? [present] : [...trimmedPast, present]
        firstInsert = false;
        return {
          past: newPast,
          present: newPresent,
          future: []
        }
    }
  }
}