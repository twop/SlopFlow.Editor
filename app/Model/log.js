"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var Log = (function () {
    function Log() {
        this.entryAdded = new core_1.EventEmitter();
        this.entries = [];
    }
    Log.prototype.error = function (error) {
        this.addEntry(new LogEntry(error, LogLevel.Error));
    };
    Log.prototype.warning = function (warning) {
        this.addEntry(new LogEntry(warning, LogLevel.Warning));
    };
    Log.prototype.debug = function (debugInfo) {
        this.addEntry(new LogEntry(debugInfo, LogLevel.Debug));
        console.debug(debugInfo);
    };
    Log.prototype.addEntry = function (entry) {
        this.entries.push(entry);
        this.entryAdded.emit(entry);
    };
    Log = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], Log);
    return Log;
}());
exports.Log = Log;
var LogEntry = (function () {
    function LogEntry(text, logLevel) {
        var params = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            params[_i - 2] = arguments[_i];
        }
        this.text = text;
        this.logLevel = logLevel;
    }
    return LogEntry;
}());
exports.LogEntry = LogEntry;
(function (LogLevel) {
    LogLevel[LogLevel["Debug"] = 0] = "Debug";
    LogLevel[LogLevel["Warning"] = 1] = "Warning";
    LogLevel[LogLevel["Error"] = 2] = "Error";
})(exports.LogLevel || (exports.LogLevel = {}));
var LogLevel = exports.LogLevel;
//# sourceMappingURL=log.js.map