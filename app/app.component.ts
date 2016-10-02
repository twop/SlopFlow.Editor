import { Component } from '@angular/core';

import { NodeEventService } from './Common/nodeEvent.service';

@Component({
  selector: 'my-app',
  styleUrls: ['app/app.component.css'],
  templateUrl: 'app/app.component.html',
  providers: [NodeEventService],
})

export class AppComponent 
{
  title = 'SlopFlow editor';
}