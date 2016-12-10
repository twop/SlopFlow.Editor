import {NgModule}      from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule}   from '@angular/forms';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import {NgReduxModule, NgRedux} from 'ng2-redux';
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
import {RAssetsComponent} from './components/assets/assets.component';
import {RWorkspaceComponent} from './components/workspace/workspace.component';
import {RNodeComponent} from './components/workspace/node.component';
import {RLayoutService} from './services/layout.service';
import {RNodeWorkspaceComponent} from './components/workspace/nodeWorkspace.component';
import {Iterable} from 'immutable';
import {NodeActions} from './actions/node.actions';
import {UserStoryService} from './services/userStory.service';
import {PortDialogComponent} from './dialogs/portDialog.component';
import {NodeDialogComponent} from './dialogs/nodeDialog.component';



const reduxLoggerOptions ={
  // Transform Immutable objects into JSON
  stateTransformer: (state) =>
  {
    const newState = {};
    for (let i of Object.keys(state))
    {
      if (Iterable.isIterable(state[i]))
      {
        newState[i] = state[i].toJS();
      } else
      {
        newState[i] = state[i];
      }
    }
    return newState;
  }
};


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
    FlowFormComponent,
    RAssetsComponent,
    RWorkspaceComponent,
    RNodeComponent,
    RNodeWorkspaceComponent,
    NodeDialogComponent,
    PortDialogComponent
  ],
  entryComponents: [
    NodeFormComponent,
    PortFormComponent,
    FlowFormComponent,
    NodeDialogComponent,
    PortDialogComponent],

  bootstrap: [AppComponent],
  providers: [
    Scene,
    ContextToolbarService,
    Log,
    DataAccessService,
    LayoutService,
    ModalService,
    SceneActions,
    RLayoutService,
    NodeActions,
    UserStoryService
  ],
})
export class AppModule
{
  constructor(ngRedux: NgRedux<IAppState>)
  {
    ngRedux.configureStore(rootReducer, INITIAL_STATE, [createLogger()]);
  }
}
