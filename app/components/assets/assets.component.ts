import {Component, OnInit, ChangeDetectionStrategy} from '@angular/core';

import {SceneActions} from '../../actions/scene.actions';
import {NgRedux} from 'ng2-redux';
import {IAppState} from '../../store/store';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map'

import {INode} from '../../store/scene.types';
import {OrderedMap} from 'immutable';

@Component({
  selector: 'r-assets',
  templateUrl: 'app/components/assets/assets.component.html',
  styleUrls: ['app/components/assets/assets.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class RAssetsComponent implements OnInit
{
  constructor(
    private ngRedux: NgRedux<IAppState>,
    private actions: SceneActions)
  {}

  nodes: Observable<Array<INode>> = null;
  selectedId: Observable<number> = null;

  ngOnInit(): void
  {
    this.nodes = this.ngRedux
      .select((state: IAppState) => state.scene.nodes)
      .map((map: OrderedMap<number, INode>) => map.toArray());

    this.selectedId = this.ngRedux.select((state: IAppState) => state.scene.selected);

    this.nodes.subscribe(nodes => console.log(`new nodes: ${nodes}`));
    this.selectedId.subscribe(selection => console.log(`selected: ${selection}`));
  }

  selectNode(node: INode)
  {
    this.actions.selectNode(node.id);
  }

  requestNewNode(): void
  {
    this.actions.newNode("NewNode");
    //this.modalService.openNewNodeDialog(this.scene, "NewNode");
  }

  requestNewFlow(): void
  {
    //this.modalService.openNewFlowDialog(this.scene, "NewFlow");
  }
}