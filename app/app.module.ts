import { StoreObservablesService } from './services/storeObservables.service';
import { NodeContainer } from './components/workspace/node.container';
import { RouterModule } from '@angular/router';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { storeLogger } from "ngrx-store-logger";
import { StoreModule } from '@ngrx/store';
import { combineReducers } from "@ngrx/store";
import { routerReducer, RouterStoreModule } from '@ngrx/router-store';

import { AppComponent } from './app.component';

import { LogComponent } from './components/log/log.component'
import { Log } from './services/log'

import { ToolbarComponent } from './components/workspace/toolbar.component';
import { ContextToolbarService } from './services/contextToolbar.service';
import { ContextToolbarComponent } from './components/workspace/contextToolbar.component';
//import { rootReducer, INITIAL_STATE } from './store/store';
import { SceneActionCreators } from './actions/scene.actions';
import { AssetsComponent } from './components/assets/assets.component';
import { WorkspaceComponent } from './components/workspace/workspace.component';
import { NodeComponent } from './components/workspace/node.component';
import { LayoutService } from './services/layout.service';
import { NodeWorkspaceComponent } from './components/workspace/nodeWorkspace.component';
import { NodeActionCreators } from './actions/node.actions';
import { PortDialogComponent } from './dialogs/portDialog.component';
import { NodeDialogComponent } from './dialogs/nodeDialog.component';
import { ConfirmatioDialogComponent } from './dialogs/confirmatioDialog.component';
import { AuthorizationDialogComponent } from './dialogs/authorizationDialog.component'
import { FlowWorkspaceComponent } from './components/workspace/flowWorkspace.component';
import { FlowActionCreators } from './actions/flow.actions';
import { DialogService } from './services/dialog.service';
import { routes } from './routes';
import { compose } from '@ngrx/core/compose';
import { NotFoundPageComponent } from './components/pageNotFound.component';
import { sceneReducer } from './store/scene.reducers';
import { FlowContainer } from './components/workspace/flow.container';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    NgbModule.forRoot(),
    StoreModule.provideStore(compose(storeLogger(), combineReducers)({scene: sceneReducer, router: routerReducer})),
    StoreDevtoolsModule.instrumentOnlyWithExtension(),
    RouterModule.forRoot(routes),
    RouterStoreModule.connectRouter()
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
    FlowWorkspaceComponent,
    FlowContainer,
    NodeContainer,
    NotFoundPageComponent
  ],
  entryComponents: [
    NodeDialogComponent,
    PortDialogComponent,
    ConfirmatioDialogComponent,
    AuthorizationDialogComponent],

  bootstrap: [AppComponent],
  providers: [
    ContextToolbarService,
    StoreObservablesService,
    Log,
    SceneActionCreators,
    LayoutService,
    NodeActionCreators,
    FlowActionCreators,
    DialogService
  ],
})
export class AppModule { }
