import { History } from '../store/undoable';
import {Injectable} from '@angular/core';

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
  readonly selectedObjectWithHistory$: Observable<History<FlowObject>>;
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

