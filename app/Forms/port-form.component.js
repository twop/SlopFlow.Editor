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
var port_model_1 = require('./port-model');
var node_event_service_1 = require('../Common/node-event.service');
var newPortCommand_1 = require('../Commands/newPortCommand');
var scene_1 = require('../Model/scene');
var port_1 = require('../Model/port');
var PortFormComponent = (function () {
    function PortFormComponent(scene, nodeEventService) {
        this.scene = scene;
        this.model = null;
        var formComponent = this;
        nodeEventService.requestNewPort.subscribe(function (name) { formComponent.showCreatePortForm(name); });
    }
    PortFormComponent.prototype.onSubmit = function () {
        var port = new port_1.Port(this.model.name, "new type");
        this.scene.executeCommand(new newPortCommand_1.NewPortCommand(port, true));
        this.model = null;
    };
    PortFormComponent.prototype.onCancel = function () {
        this.model = null;
    };
    PortFormComponent.prototype.showCreatePortForm = function (nodeName) {
        this.model = new port_model_1.PortModel(nodeName);
    };
    Object.defineProperty(PortFormComponent.prototype, "hasModel", {
        get: function () {
            return this.model != null;
        },
        enumerable: true,
        configurable: true
    });
    PortFormComponent = __decorate([
        core_1.Component({
            selector: 'port-form',
            templateUrl: 'app/Forms/port-form.component.html'
        }), 
        __metadata('design:paramtypes', [scene_1.Scene, node_event_service_1.NodeEventService])
    ], PortFormComponent);
    return PortFormComponent;
}());
exports.PortFormComponent = PortFormComponent;
//# sourceMappingURL=port-form.component.js.map