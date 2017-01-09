import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { StoreModule } from '@ngrx/store';

import { AppComponent } from './app.component';

import { LogComponent } from './components/log/log.component'
import { Log } from './services/log'

import { ToolbarComponent } from './components/workspace/toolbar.component';
import { ContextToolbarService } from './services/contextToolbar.service';
import { ContextToolbarComponent } from './components/workspace/contextToolbar.component';
import {rootReducer, INITIAL_STATE} from './store/store';
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

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    NgbModule.forRoot(),
    StoreModule.provideStore(rootReducer, INITIAL_STATE),
    StoreDevtoolsModule.instrumentOnlyWithExtension(),
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
    SceneActionCreators,
    LayoutService,
    NodeActionCreators,
    FlowActionCreators,
    DialogService
  ],
})
export class AppModule {}
