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
var log_1 = require('../Model/log');
var LogComponent = (function () {
    function LogComponent(log) {
        this.log = log;
        this.entries = null;
    }
    LogComponent.prototype.ngOnInit = function () {
        this.entries = this.log.entries;
        // TODO this will still work cause Im showing the same thing (this.logger.entries)
        // but this will have to be changed when the view will be different than logic array
        this.log.entryAdded.subscribe(function (entry) { });
    };
    LogComponent = __decorate([
        core_1.Component({
            selector: 'my-log',
            templateUrl: 'app/LogComponent/log.component.html'
        }), 
        __metadata('design:paramtypes', [log_1.Log])
    ], LogComponent);
    return LogComponent;
}());
exports.LogComponent = LogComponent;
//# sourceMappingURL=log.component.js.map