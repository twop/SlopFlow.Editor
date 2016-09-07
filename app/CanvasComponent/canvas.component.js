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
var core_1 = require("@angular/core");
var scene_1 = require("../Model/scene");
var point_1 = require("../Model/point");
var theme_1 = require("./theme");
var nodeView_1 = require("./nodeView");
var node_event_service_1 = require('../Common/node-event.service');
var CanvasComponent = (function () {
    function CanvasComponent(scene, theme, eventService) {
        this.scene = scene;
        this.theme = theme;
        this.eventService = eventService;
        this.canvas = null;
        this.nodeView = null;
        var canvasComponent = this;
        scene.selectedNodeChanged.subscribe(function (n) { canvasComponent.onSelectedNodeChanged(n); });
    }
    CanvasComponent.prototype.ngAfterViewInit = function () {
        this.canvas = this.myCanvas.nativeElement;
        this.context = this.canvas.getContext("2d");
        //this.tick();
    };
    CanvasComponent.prototype.addPort = function () {
        this.eventService.requestNewPort.emit("new port");
        this.update();
    };
    CanvasComponent.prototype.onSelectedNodeChanged = function (node) {
        if (node) {
            this.nodeView = new nodeView_1.NodeView(new point_1.Point(100, 100), this.theme, node);
        }
        else {
            this.nodeView = null;
        }
        this.update();
    };
    CanvasComponent.prototype.update = function () {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        if (this.nodeView) {
            this.nodeView.Invalidate();
            this.context.save();
            this.nodeView.paint(this.context);
            this.context.restore();
        }
    };
    __decorate([
        core_1.ViewChild("myCanvas"), 
        __metadata('design:type', Object)
    ], CanvasComponent.prototype, "myCanvas", void 0);
    CanvasComponent = __decorate([
        core_1.Component({
            selector: "my-canvas",
            styleUrls: ['app/CanvasComponent/canvas.component.css'],
            templateUrl: 'app/CanvasComponent/canvas.component.html',
        }), 
        __metadata('design:paramtypes', [scene_1.Scene, theme_1.Theme, node_event_service_1.NodeEventService])
    ], CanvasComponent);
    return CanvasComponent;
}());
exports.CanvasComponent = CanvasComponent;
//# sourceMappingURL=canvas.component.js.map