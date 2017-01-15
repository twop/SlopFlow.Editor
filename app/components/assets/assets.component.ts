import { ActivatedRoute } from '@angular/router';
import { go } from '@ngrx/router-store';
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

import { sceneActionCreators } from '../../actions/scene.actions';
import { IAppState } from '../../store/store';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'

import { IFlow } from '../../store/flow.types';
import { DialogService } from '../../services/dialog.service';
import { Store } from '@ngrx/store';
import { History } from '../../store/undoable';

@Component({
  selector: 'assets',
  templateUrl: 'app/components/assets/assets.component.html',
  styleUrls: ['app/components/assets/assets.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class AssetsComponent implements OnInit
{
  constructor(
    private store: Store<IAppState>,
    private dialogs: DialogService,
    private route: ActivatedRoute)
  { }

  flows: Observable<Array<History<IFlow>>> = null;
  selectedId: Observable<number> = null;

  ngOnInit(): void
  {
    this.flows = this.store.select((state: IAppState) => state.scene.flows);

    this.selectedId = this.store.select((state: IAppState) => state.scene.selected);
  }

  selectFlow(flow: IFlow)
  {
    this.store.dispatch(go(["workspace/flow", flow.id]))
    //this.store.dispatch(this.actions.selectItem(flow.id));
  }
  requestNewFlow(): void
  {
    this.dialogs.createFlow((name: string) => 
    {
      const action = sceneActionCreators.newFlow(name);
      this.store.dispatch(action);
      this.store.dispatch(go(["workspace/flow", action.payload.id]))
    });
  }
}