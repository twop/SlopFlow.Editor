import {Injectable} from '@angular/core'

@Injectable()
export class Logger
{
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
  }
}

export class LogEntry
{
  constructor(public text: string, public logLevel: LogLevel, ...params: Object[])
  { }
}

enum LogLevel
{
  Debug,
  Warning,
  Error,
}