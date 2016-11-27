import {NgModule}      from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule}   from '@angular/forms';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

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

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    NgbModule.forRoot()
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
  ],
  entryComponents: [NodeFormComponent, PortFormComponent],
  bootstrap: [AppComponent],
  providers: [
    Scene,
    ContextToolbarService,
    Log,
    DataAccessService,
    LayoutService,
    ModalService
  ],
})

export class AppModule
{
}
