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
const core_1 = require("@angular/core");
const mercator_service_1 = require("./service/mercator.service");
const hero_service_1 = require("./hero.service");
const map_service_1 = require("./service/map.service");
const log_service_1 = require("./service/log.service");
let MapComponent = class MapComponent {
    constructor(mercator, mapService, ls) {
        this.ls = ls;
    }
};
MapComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        template: [
            '<info-position>',
            '</info-position>',
            '<router-outlet></router-outlet>',
            '<mapbox-gl> map loading...</mapbox-gl>'
        ].join(''),
        styleUrls: ['./css/map.component.css'],
        providers: [hero_service_1.HeroService]
    }),
    __metadata("design:paramtypes", [mercator_service_1.Mercator, map_service_1.MapService, log_service_1.LogService])
], MapComponent);
exports.MapComponent = MapComponent;
//# sourceMappingURL=map.component.js.map