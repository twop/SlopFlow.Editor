import {Injectable} from '@angular/core';

import {NgRedux} from 'ng2-redux';
import { StateWithHistory } from 'redux-undo';
import {IAppState} from '../store/store';


import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/filter'
import 'rxjs/add/operator/merge'
import {FlowObject} from '../store/flow.types';


@Injectable()
export class StoreObservablesService
{
  readonly selectedObjectWithHistory$: Observable<StateWithHistory<FlowObject>>;
  readonly selectedObject$: Observable<FlowObject>;

  constructor(private store: NgRedux<IAppState>)
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

