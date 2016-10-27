import { Component, OnInit } from '@angular/core';
import { Log, LogEntry } from './log'

@Component({
  selector: 'my-log',
  templateUrl: 'app/LogComponent/log.component.html'
})
export class LogComponent implements OnInit
{
  constructor(private log:Log) 
  {}

  public entries: Array<LogEntry> = [];

  ngOnInit()
  {
    this.entries = this.log.entries.slice();
    this.entries.reverse();
    this.log.entryAdded.subscribe((entry: LogEntry) => {this.entries.unshift(entry)});
  }
}