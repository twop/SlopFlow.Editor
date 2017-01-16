import { History } from '../store/undoable';
import { Injectable } from '@angular/core';

import { IAppState } from '../store/store';


import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/merge'
import { IFlow } from '../store/flow.types';
import { Store } from '@ngrx/store';


@Injectable()
export class StoreObservablesService
{
  readonly flowHistory$: Observable<History<IFlow>>
  readonly flow$: Observable<IFlow>

  constructor(store: Store<IAppState>)
  {
    this.flowHistory$ = store.select(
      (state: IAppState) => state.scene.flows.find(fh => fh.present.id == state.scene.selected));
    
    this.flow$ = this.flowHistory$.map(fh=>fh && fh.present);
  }
}

