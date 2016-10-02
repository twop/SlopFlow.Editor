import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';

import { AppComponent }  from './app.component';

import {WorkspaceComponent} from  './WorkspaceComponent/workspace.component'
import {AssetsComponent} from  './AssetsComponent/assets.component'
import {LogComponent} from  './LogComponent/log.component'
import {NodeFormComponent} from  './Forms/nodeForm.component'
import {PortFormComponent} from  './Forms/portForm.component'

import {Scene} from  './Scene/scene'
import {Log} from  './LogComponent/log'
import {Theme} from "./Common/theme";
//import {SceneView} from "./WorkspaceComponent/sceneView";
import {DataAccessService} from './DataAccess/dataAccess.service'

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
  ],
  bootstrap: [AppComponent],
  providers: [Scene, Log, Theme, DataAccessService],
})

export class AppModule { }
