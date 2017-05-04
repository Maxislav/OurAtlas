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
 * Created by maxislav on 25.11.16.
 */
const core_1 = require("@angular/core");
let LocalStorage = class LocalStorage {
    constructor() {
        this.prefix = window.location.hostname;
        this._mapCenter = {
            lng: null,
            lat: null,
            zoom: null
        };
        var strMapCenter = JSON.stringify(this._mapCenter);
        if (!localStorage.getItem(this.prefix + '-' + 'map-center')) {
            localStorage.setItem(this.prefix + '-' + 'map-center', strMapCenter);
        }
        else {
            this.mapCenter = JSON.parse(localStorage.getItem(this.prefix + '-' + 'map-center'));
        }
    }
    get mapCenter() {
        return this._mapCenter;
    }
    set mapCenter(value) {
        localStorage.setItem(this.prefix + '-' + 'map-center', JSON.stringify(value));
        this._mapCenter = value;
    }
    set userKey(key) {
        if (key) {
            localStorage.setItem(this.prefix + '-' + 'user-key', key);
        }
        else {
            localStorage.removeItem(this.prefix + '-' + 'user-key');
        }
        this._userKey = key;
    }
    get userKey() {
        this._userKey = localStorage.getItem(this.prefix + '-' + 'user-key');
        return this._userKey;
    }
};
LocalStorage = __decorate([
    core_1.Injectable(), 
    __metadata('design:paramtypes', [])
], LocalStorage);
exports.LocalStorage = LocalStorage;
//# sourceMappingURL=local-storage.service.js.map