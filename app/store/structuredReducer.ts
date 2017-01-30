import { ErrorHandler } from '@angular/router/src/router';
import { Action, ActionReducer as Reducer } from '@ngrx/store';

export interface Handler<TState, TPayload>
{
  (state: TState, payload: TPayload): TState;
}

export interface Handlers<TState>
{
  [actionType: string]: Handler<TState, any>;
}

export interface StatePipe<TState, TParent>
{
  diveIn(parent: TParent, action: Action): TState;
  bubbleUp(parent: TParent, newChild: TState): TParent;
}

export interface HandlerNode<TState>
{
  pipe?: StatePipe<TState, any>
  handlers: Handlers<TState>;
  children?: HandlerNode<any>[]
}

export function createReducer<TState>(handlers: Handlers<TState>, initialState?: TState): Reducer<TState>
{
  return (state: TState = initialState, action: Action): TState => 
  {
    const handler = handlers[action.type];
    return handler ? handler(state, action) : state;
  };
}

function bubbleHandler<TChild, TParent>(handler: Handler<TChild, any>, {diveIn, bubbleUp}: StatePipe<TChild, TParent>): Handler<TParent, any>
{
  return (state: TParent, action: Action): TParent => bubbleUp(state, handler(diveIn(state, action), action));
}

export function flattenNode<TState>(node: HandlerNode<TState>): Handlers<TState>
{
  const result: Handlers<TState> = { ...(node.handlers || {}) };

  for (const child of node.children || [])
  {
    const childrenHandlers: Handlers<any> = (child.children || []).reduce((handlers, child) => Object.assign(handlers, flattenNode(child)), {});

    const combined = { ...child.handlers, ...childrenHandlers };

    for (const actionType of Object.keys(combined))
    {
      result[actionType] = bubbleHandler(combined[actionType], child.pipe);
    }
  }

  return result;
}

export function createHandlers<T>(reducer: Reducer<T>, actionTypes: string[]): Handlers<T>
{
  return actionTypes.reduce((handlers, action) => Object.assign(handlers, { [action]: reducer }), {});
}