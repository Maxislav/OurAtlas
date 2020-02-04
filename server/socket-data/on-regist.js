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
Object.defineProperty(exports, "__esModule", { value: true });
const ProtoData = require("./proto-data");
const autobind_1 = require("../util/autobind");
class OnRegist extends ProtoData {
    constructor(socket, util, logger) {
        super(socket, util);
        this.socket = socket;
        this.util = util;
        this.logger = logger;
        socket.on('onRegist', this.onRegist.bind(this));
        this.socket.$get('updatePass', this.updatePass);
    }
    onRegist(d) {
        this.util.onRegist(d)
            .then(d => {
            if (d && d.result == 'ok') {
                this.socket.emit('onRegist', {
                    result: 'ok',
                    message: null
                });
            }
            else {
                this.socket.emit('onRegist', d);
            }
        }, err => {
            console.error(err);
        })
            .catch((err) => {
            console.error('Cache onRegist', err);
            this.socket.emit('onRegist', { result: false, status: 500, message: err });
        });
    }
    updatePass(req, res) {
        res.end({
            result: 'ok',
            data: req.data
        });
    }
}
__decorate([
    autobind_1.autobind(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], OnRegist.prototype, "updatePass", null);
exports.OnRegist = OnRegist;
//# sourceMappingURL=on-regist.js.map