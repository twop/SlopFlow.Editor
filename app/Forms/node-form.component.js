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
var node_model_1 = require('./node-model');
var node_event_service_1 = require('../Common/node-event.service');
var scene_1 = require('../Model/scene');
var newNodeCommand_1 = require('../Commands/newNodeCommand');
var NodeFormComponent = (function () {
    function NodeFormComponent(scene, nodeEventService) {
        this.scene = scene;
        this.model = null;
        var formComponent = this;
        nodeEventService.requestNewNode.subscribe(function (name) { formComponent.showCreateNodeForm(name); });
    }
    NodeFormComponent.prototype.onSubmit = function () {
        this.scene.executeCommand(new newNodeCommand_1.NewNodeCommand(this.model));
        this.model = null;
    };
    NodeFormComponent.prototype.onCancel = function () {
        this.model = null;
    };
    NodeFormComponent.prototype.showCreateNodeForm = function (nodeName) {
        this.model = new node_model_1.NodeModel(nodeName);
    };
    Object.defineProperty(NodeFormComponent.prototype, "hasModel", {
        get: function () {
            return this.model != null;
        },
        enumerable: true,
        configurable: true
    });
    NodeFormComponent = __decorate([
        core_1.Component({
            selector: 'node-form',
            templateUrl: 'app/Forms/node-form.component.html'
        }), 
        __metadata('design:paramtypes', [scene_1.Scene, node_event_service_1.NodeEventService])
    ], NodeFormComponent);
    return NodeFormComponent;
}());
exports.NodeFormComponent = NodeFormComponent;
//# sourceMappingURL=node-form.component.js.map