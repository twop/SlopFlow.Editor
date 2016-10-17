import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';

import { AppComponent }  from './app.component';

import {WorkspaceComponent} from  './WorkspaceComponent/workspace.component'
import {NodeToolbarComponent} from './WorkspaceComponent/nodeToolbar.component';

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

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
  ],
  declarations: [
    AppComponent,
    WorkspaceComponent,
    AssetsComponent,
    NodeFormComponent,
    PortFormComponent,
    LogComponent,
    NodeToolbarComponent,
    NodeComponent,
    NodeWorkspaceComponent,
    FlowWorkspaceComponent
  ],
  bootstrap: [AppComponent],
  providers: [Scene, Log, DataAccessService],
})

export class AppModule { }
