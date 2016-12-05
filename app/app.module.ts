import {NgModule}      from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule}   from '@angular/forms';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import { NgReduxModule, NgRedux } from 'ng2-redux';
import  * as createLogger from 'redux-logger';

import {AppComponent}  from './app.component';

import {WorkspaceComponent} from  './WorkspaceComponent/workspace.component'

import {AssetsComponent} from  './AssetsComponent/assets.component'
import {LogComponent} from  './LogComponent/log.component'
import {NodeFormComponent} from  './Forms/nodeForm.component'
import {PortFormComponent} from  './Forms/portForm.component'

import {Scene} from  './Scene/scene'
import {Log} from  './LogComponent/log'

import {DataAccessService} from './DataAccess/dataAccess.service'
import {NodeComponent} from './WorkspaceComponent/node.component';
import {NodeWorkspaceComponent} from './WorkspaceComponent/nodeWorkspace.component';
import {FlowWorkspaceComponent} from './WorkspaceComponent/flowWorkspace.component';
import {LayoutService} from './Scene/layout.service';
import {ToolbarComponent} from './WorkspaceComponent/toolbar.component';
import {ContextToolbarService} from './Scene/contextToolbar.service';
import {ContextToolbarComponent} from './WorkspaceComponent/contextToolbar.component';
import {ModalService} from './Forms/modal.service';
import {FlowFormComponent} from './Forms/flowForm.component';
import {IAppState, rootReducer, INITIAL_STATE} from './store/store';
import {SceneActions} from './actions/scene.actions';


@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    NgbModule.forRoot(),
    NgReduxModule.forRoot()
  ],
  declarations: [
    AppComponent,
    WorkspaceComponent,
    AssetsComponent,
    NodeFormComponent,
    PortFormComponent,
    LogComponent,
    NodeComponent,
    NodeWorkspaceComponent,
    FlowWorkspaceComponent,
    ToolbarComponent,
    ContextToolbarComponent,
    FlowFormComponent
  ],
  entryComponents: [NodeFormComponent, PortFormComponent, FlowFormComponent],
  bootstrap: [AppComponent],
  providers: [
    Scene,
    ContextToolbarService,
    Log,
    DataAccessService,
    LayoutService,
    ModalService,
    SceneActions
  ],
})

export class AppModule
{
  constructor(ngRedux: NgRedux<IAppState>)
  {
    ngRedux.configureStore(rootReducer, INITIAL_STATE, [ createLogger() ]);
  }
}
