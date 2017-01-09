import {Injectable} from '@angular/core';

import { StateWithHistory } from 'redux-undo';
import {IAppState} from '../store/store';


import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/filter'
import 'rxjs/add/operator/merge'
import {FlowObject} from '../store/flow.types';
import { Store } from '@ngrx/store';


@Injectable()
export class StoreObservablesService
{
  readonly selectedObjectWithHistory$: Observable<StateWithHistory<FlowObject>>;
  readonly selectedObject$: Observable<FlowObject>;

  constructor(private store: Store<IAppState>)
  {
    this.selectedObjectWithHistory$ = store
      .select((state: IAppState) =>
      {
        return state.scene.nodes.find(nh => nh.present.id == state.scene.selected)
          && state.scene.flows.find(fh => fh.present.id == state.scene.selected);
      })

    this.selectedObject$ = this.selectedObjectWithHistory$.map(objHistory => objHistory && objHistory.present);
  }
}

