import { DraggableDirective } from './directives/draggable';
import { HttpModule } from '@angular/http';
import { NodeDialogComponent } from './dialogs/nodeDialog.component';
import { StoreObservablesService } from './services/storeObservables.service';
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
import { ContextToolbarComponent } from './components/workspace/contextToolbar.component';
import { AssetsComponent } from './components/assets/assets.component';
import { WorkspaceComponent } from './components/workspace/workspace.component';
import { NodeComponent } from './components/workspace/node.component';
import { LayoutService } from './services/layout.service';
import { PortDialogComponent } from './dialogs/portDialog.component';
import { ConfirmatioDialogComponent } from './dialogs/confirmatioDialog.component';
import { AuthorizationDialogComponent } from './dialogs/authorizationDialog.component'
import { FlowCanvasComponent } from './components/workspace/flowCanvas';
import { DialogService } from './services/dialog.service';
import { routes } from './routes';
import { compose } from '@ngrx/core/compose';
import { NotFoundPageComponent } from './components/pageNotFound.component';
import { sceneReducer } from './store/scene.reducers';
import { FlowContainer } from './components/workspace/flow.container';

import { Ng2AutoCompleteModule } from 'ng2-auto-complete';
import { CreateElementDialog } from './dialogs/createElement.dialog';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    NgbModule.forRoot(),
    StoreModule.provideStore(compose(storeLogger(), combineReducers)({scene: sceneReducer, router: routerReducer})),
    StoreDevtoolsModule.instrumentOnlyWithExtension(),
    RouterModule.forRoot(routes),
    RouterStoreModule.connectRouter(),
    Ng2AutoCompleteModule,
  ],
  declarations: [
    AppComponent,
    LogComponent,
    ToolbarComponent,
    ContextToolbarComponent,
    AssetsComponent,
    WorkspaceComponent,
    NodeComponent,
    PortDialogComponent,
    NodeDialogComponent,
    ConfirmatioDialogComponent,
    AuthorizationDialogComponent,
    FlowCanvasComponent,
    FlowContainer,
    NotFoundPageComponent,
    CreateElementDialog,
    DraggableDirective
  ],
  entryComponents: [
    PortDialogComponent,
    NodeDialogComponent,
    ConfirmatioDialogComponent,
    CreateElementDialog,
    AuthorizationDialogComponent],

  bootstrap: [AppComponent],
  providers: [
    StoreObservablesService,
    Log,
    LayoutService,
    DialogService
  ],
})
export class AppModule { }
