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
var menu_service_1 = require("../menu.service");
var Item = (function () {
    function Item() {
    }
    return Item;
}());
var MENU = [
    {
        value: 'load',
        text: "Загрузить"
    },
    {
        value: 'view',
        text: "Просмотреть"
    }
];
var MenuTrackComponent = (function () {
    function MenuTrackComponent(ms) {
        this.ms = ms;
        this.menu = MENU;
    }
    MenuTrackComponent.prototype.onSelect = function (item, $event) {
        //console.log(item);
        this.ms.menuOpen = false;
    };
    MenuTrackComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'menu-track',
            template: "<ul>\n            <li *ngFor=\"let item of menu\" (click)=\"onSelect(item, $event)\">{{item.text}}</li>\n        </ul>",
            styleUrls: ['./menu-track.css'],
        }), 
        __metadata('design:paramtypes', [menu_service_1.MenuService])
    ], MenuTrackComponent);
    return MenuTrackComponent;
}());
exports.MenuTrackComponent = MenuTrackComponent;
//# sourceMappingURL=menu-track.component.js.map