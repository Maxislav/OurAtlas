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
var socket_oi_service_1 = require("./socket.oi.service");
var DeviceService = (function () {
    function DeviceService(io) {
        this.io = io;
        this.socket = io.socket;
        this._devices = [];
    }
    DeviceService.prototype.updateDevices = function (hash) {
        this.socket.$emit('getDevice', { hash: hash })
            .then(function (d) {
            console.log(d);
        })
            .catch(function (err) {
            console.log(err);
        });
    };
    DeviceService.prototype.onAddDevice = function (device) {
        this.socket.$emit('onAddDevice', device)
            .then(function (d) {
            console.log(d);
        });
    };
    Object.defineProperty(DeviceService.prototype, "devices", {
        get: function () {
            return this._devices;
        },
        set: function (devices) {
            var _this = this;
            this._devices.length = 0;
            devices.forEach(function (device) {
                _this._devices.push(device);
            });
        },
        enumerable: true,
        configurable: true
    });
    DeviceService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [socket_oi_service_1.Io])
    ], DeviceService);
    return DeviceService;
}());
exports.DeviceService = DeviceService;
//# sourceMappingURL=device.service.js.map