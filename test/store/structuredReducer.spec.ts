import { ExtractionResult } from '@angular/compiler/src/i18n/extractor_merger';
import { suite, test } from "mocha-typescript";
import { assert } from "chai"

import { assign } from '../../app/store/store';

import { Action, ActionReducer } from '@ngrx/store';
import { createHandlers, createReducer, flattenNode, HandlerNode, Handlers } from '../../app/store/structuredReducer';

@suite
class StructuredReducerTests
{
  @test createReducer_HandlesDirectActions()
  {
    const handlers =
      {
        ["add"]: (state: number, payload: { num: number }): number => state + payload.num
      };

    const reducer: ActionReducer<number> = createReducer(handlers);
    const action = { type: "add", num: 1 };

    assert.equal(reducer(1, action), 2);
  }

  @test createReducer_SetsInitialState()
  {
    type State = { num: number };
    const initialState: State = Object.freeze({ num: 1 });
    const reducer: ActionReducer<State> = createReducer({}, initialState);

    const action = { type: "sometype", num: 0 };

    assert.deepEqual(reducer(undefined, action), initialState);
  }

  @test createHandlers_InsertsAllKeys()
  {
    type MyAction = { type: string, num: number };
    const reducer: ActionReducer<number> = (state: number, action: MyAction) => state + action.num;

    const actionTypes = ["one, two"];

    const action: MyAction = { type: "doesnt matter", num: 1 };
    
    const handlers: Handlers<number> = createHandlers(reducer, actionTypes);

    for (const actionType of actionTypes)
    {
      assert.deepEqual(handlers[actionType](1, action), 2);
    }
  }

  @test flattenNode_BubbleUpHandler()
  {
    type State = { num: number };
    const initialState: State = Object.freeze({ num: 1 });

    const childHandlers =
      {
        ["add"]: (state: number, payload: { num: number }): number => state + payload.num
      };

    const rootNode: HandlerNode<State> =
      {
        handlers: {},
        children: [
          {
            handlers: childHandlers,
            pipe: {
              diveIn: (parent: State, action: Action) => parent.num,
              bubbleUp: (parent: State, newChild: number) => assign({ ...parent }, { num: newChild })
            }
          }]
      }

    const handler = flattenNode(rootNode)["add"];
    assert.ok(handler);

    const newState: State = handler(initialState, { num: 1 });
    assert.deepEqual(newState, { num: 2 });
  }
}