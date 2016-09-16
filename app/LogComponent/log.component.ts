import { Component, OnInit } from '@angular/core';
import { Log, LogEntry, LogLevel } from '../Model/log'

@Component({
  selector: 'my-log',
  templateUrl: 'app/LogComponent/log.component.html'
})
export class LogComponent implements OnInit
{
  constructor(private log:Log) 
  {

  }

  public entries: LogEntry[] = null;

  ngOnInit()
  {
    this.entries = this.log.entries;

    // TODO this will still work cause Im showing the same thing (this.logger.entries)
    // but this will have to be changed when the view will be different than logic array
    this.log.entryAdded.subscribe(entry => { });
  }
}