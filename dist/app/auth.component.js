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
/**
 * Created by maxislav on 10.10.16.
 */
var core_1 = require('@angular/core');
var core_2 = require('@angular/core');
var mercator_service_1 = require("./service/mercator.service");
var map_service_1 = require("./service/map.service");
var position_size_service_1 = require("./service/position-size.service");
var info_position_component_1 = require("./component/info-position/info-position-component");
var menu_component_1 = require("./component/menu/menu.component");
var local_storage_service_1 = require("./service/local-storage.service");
//noinspection TypeScriptCheckImport
var AuthComponent = (function () {
    function AuthComponent(el, ls) {
        this.ls = ls;
        console.log(ls.userKey);
    }
    AuthComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            templateUrl: 'template/auth.component.html',
            providers: [mercator_service_1.Mercator, map_service_1.MapService, info_position_component_1.InfoPositionComponent, position_size_service_1.PositionSize, menu_component_1.MenuComponent],
            styleUrls: [
                'css/auth.component.css',
            ]
        }), 
        __metadata('design:paramtypes', [core_2.ElementRef, local_storage_service_1.LocalStorage])
    ], AuthComponent);
    return AuthComponent;
}());
exports.AuthComponent = AuthComponent;
//# sourceMappingURL=auth.component.js.map