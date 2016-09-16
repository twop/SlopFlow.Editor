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
var platform_browser_1 = require('@angular/platform-browser');
var forms_1 = require('@angular/forms');
var app_component_1 = require('./app.component');
var canvas_component_1 = require('./CanvasComponent/canvas.component');
var assets_component_1 = require('./AssetsComponent/assets.component');
var log_component_1 = require('./LogComponent/log.component');
var node_form_component_1 = require('./Forms/node-form.component');
var port_form_component_1 = require('./Forms/port-form.component');
var scene_1 = require('./Model/scene');
var log_1 = require('./Model/log');
var theme_1 = require("./CanvasComponent/theme");
var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            imports: [
                platform_browser_1.BrowserModule,
                forms_1.FormsModule,
            ],
            declarations: [
                app_component_1.AppComponent,
                canvas_component_1.CanvasComponent,
                assets_component_1.AssetsComponent,
                node_form_component_1.NodeFormComponent,
                port_form_component_1.PortFormComponent,
                log_component_1.LogComponent
            ],
            bootstrap: [app_component_1.AppComponent],
            providers: [scene_1.Scene, log_1.Log, theme_1.Theme],
        }), 
        __metadata('design:paramtypes', [])
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map