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
 * Created by max on 05.01.17.
 */
const core_1 = require("@angular/core");
const common_1 = require("@angular/common");
const router_1 = require("@angular/router");
let LeafletResolver = class LeafletResolver {
    resolve() {
        return System.import('lib/leaflet/leaflet.css')
            .then((css) => {
            return System.import("lib/leaflet/leaflet-src.js")
                .then(L => {
                this.L = L;
                return L;
            });
        });
    }
};
LeafletResolver = __decorate([
    core_1.Injectable()
], LeafletResolver);
exports.LeafletResolver = LeafletResolver;
let JournalComponent = class JournalComponent {
    constructor(location, route) {
        this.location = location;
        this.route = route;
        console.log(route.snapshot.data['L']);
        this.list = [
            '1',
            '2'
        ];
    }
    onClose() {
        this.location.back();
    }
};
JournalComponent = __decorate([
    core_1.Component({
        //noinspection TypeScriptUnresolvedVariable
        moduleId: module.id,
        templateUrl: './journal.component.html',
        styleUrls: ['./journal.component.css'],
    }),
    __metadata("design:paramtypes", [common_1.Location, router_1.ActivatedRoute])
], JournalComponent);
exports.JournalComponent = JournalComponent;
//# sourceMappingURL=journal.component.js.map