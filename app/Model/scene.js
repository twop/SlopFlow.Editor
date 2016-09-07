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
var node_1 = require('./node');
var port_1 = require('./port');
var logger_1 = require('./logger');
var Scene = (function () {
    function Scene(logger) {
        this.logger = logger;
        this.nodes = [];
        this.selectedNodeChanged = new core_1.EventEmitter();
        this.selectedNode = null;
        var sum = new node_1.Node("Sum");
        sum.addInput(new port_1.Port("input1", "int"));
        sum.addInput(new port_1.Port("input2", "int"));
        sum.addOutput(new port_1.Port("output", "int"));
        var greaterNode = new node_1.Node("Greater");
        greaterNode.addInput(new port_1.Port("input", "int"));
        greaterNode.addOutput(new port_1.Port("output", "int"));
        this.nodes.push(sum, greaterNode);
    }
    Scene.prototype.selectNode = function (node) {
        this.selectedNode = node;
        this.selectedNodeChanged.emit(node);
    };
    Scene.prototype.executeCommand = function (command) {
        command.Execute(this, this.logger);
    };
    Scene = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [logger_1.Logger])
    ], Scene);
    return Scene;
}());
exports.Scene = Scene;
//# sourceMappingURL=scene.js.map