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
var scene_1 = require('../Model/scene');
var node_event_service_1 = require('../Common/node-event.service');
var AssetsComponent = (function () {
    function AssetsComponent(scene, nodeEventService) {
        this.scene = scene;
        this.nodeEventService = nodeEventService;
        this.nodes = this.scene.nodes;
    }
    AssetsComponent.prototype.selectNode = function (node) {
        this.scene.selectNode(node);
    };
    AssetsComponent.prototype.addNewNode = function () {
        //TODO: add a name validation
        this.nodeEventService.requestNewNode.emit("NewName");
    };
    AssetsComponent = __decorate([
        core_1.Component({
            selector: 'my-assets',
            templateUrl: 'app/AssetsComponent/assets.component.html',
            styleUrls: ['app/AssetsComponent/assets.component.css'],
        }), 
        __metadata('design:paramtypes', [scene_1.Scene, node_event_service_1.NodeEventService])
    ], AssetsComponent);
    return AssetsComponent;
}());
exports.AssetsComponent = AssetsComponent;
//# sourceMappingURL=assets.component.js.map