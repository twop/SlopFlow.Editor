import {Injectable, EventEmitter} from '@angular/core'

@Injectable()
export class Log
{
  entryAdded = new EventEmitter<LogEntry>();

  entries: LogEntry[] = [];

  error(error: string): void
  {
    this.addEntry(new LogEntry(error, LogLevel.Error));
  }

  warning(warning: string): void
  {
    this.addEntry(new LogEntry(warning, LogLevel.Warning));
  }

  debug(debugInfo: string): void
  {
    this.addEntry(new LogEntry(debugInfo, LogLevel.Debug));
    console.debug(debugInfo);
  }

  private addEntry(entry: LogEntry): void
  {
    this.entries.push(entry);
    this.entryAdded.emit(entry);
  }
}

export class LogEntry
{
  constructor(public text: string, public logLevel: LogLevel, ...params: Object[])
  { }
}

export enum LogLevel
{
  Debug,
  Warning,
  Error,
}