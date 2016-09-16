import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';

import { AppComponent }  from './app.component';

import {CanvasComponent} from  './CanvasComponent/canvas.component'
import {AssetsComponent} from  './AssetsComponent/assets.component'
import {LogComponent} from  './LogComponent/log.component'
import {NodeFormComponent} from  './Forms/node-form.component'
import {PortFormComponent} from  './Forms/port-form.component'

import {Scene} from  './Model/scene'
import {Log} from  './Model/log'
import {Theme} from "./CanvasComponent/theme";


@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
  ],
  declarations: [
    AppComponent,
    CanvasComponent,
    AssetsComponent,
    NodeFormComponent,
    PortFormComponent,
    LogComponent
  ],
  bootstrap: [AppComponent],
  providers: [Scene, Log, Theme],
})

export class AppModule { }
