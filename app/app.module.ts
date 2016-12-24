import {NgModule}      from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule}   from '@angular/forms';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import {NgReduxModule, NgRedux, DevToolsExtension} from 'ng2-redux';
import  * as createLogger from 'redux-logger';

import {AppComponent}  from './app.component';

import {LogComponent} from  './components/log/log.component'
import {Log} from  './services/log'

import {ToolbarComponent} from './components/workspace/toolbar.component';
import {ContextToolbarService} from './services/contextToolbar.service';
import {ContextToolbarComponent} from './components/workspace/contextToolbar.component';
import {IAppState, rootReducer, INITIAL_STATE} from './store/store';
import {SceneActions} from './actions/scene.actions';
import {AssetsComponent} from './components/assets/assets.component';
import {WorkspaceComponent} from './components/workspace/workspace.component';
import {NodeComponent} from './components/workspace/node.component';
import {LayoutService} from './services/layout.service';
import {NodeWorkspaceComponent} from './components/workspace/nodeWorkspace.component';
import {NodeActions} from './actions/node.actions';
import {PortDialogComponent} from './dialogs/portDialog.component';
import {NodeDialogComponent} from './dialogs/nodeDialog.component';
import {ConfirmatioDialogComponent} from './dialogs/confirmatioDialog.component';
import {AuthorizationDialogComponent} from './dialogs/authorizationDialog.component'
import {FlowWorkspaceComponent} from './components/workspace/flowWorkspace.component';
import { FlowActions } from './actions/flow.actions';
import { DialogService } from './services/dialog.service';


@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    NgbModule.forRoot(),
    NgReduxModule.forRoot()
  ],
  declarations: [
    AppComponent,
    LogComponent,
    ToolbarComponent,
    ContextToolbarComponent,
    AssetsComponent,
    WorkspaceComponent,
    NodeComponent,
    NodeWorkspaceComponent,
    NodeDialogComponent,
    PortDialogComponent,
    ConfirmatioDialogComponent,
    AuthorizationDialogComponent,
    FlowWorkspaceComponent
  ],
  entryComponents: [
    NodeDialogComponent,
    PortDialogComponent,
    ConfirmatioDialogComponent,
    AuthorizationDialogComponent],

  bootstrap: [AppComponent],
  providers: [
    ContextToolbarService,
    Log,
    SceneActions,
    LayoutService,
    NodeActions,
    DevToolsExtension,
    FlowActions,
    DialogService
  ],
})
export class AppModule
{
  constructor(ngRedux: NgRedux<IAppState>, devTools: DevToolsExtension)
  {
    ngRedux.configureStore(rootReducer, INITIAL_STATE, [createLogger()], [devTools.enhancer()]);
  }
}
