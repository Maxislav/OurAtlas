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
/**
 * Created by max on 05.01.17.
 */
const core_1 = require("@angular/core");
const common_1 = require("@angular/common");
const router_1 = require("@angular/router");
const journal_service_1 = require("../../service/journal.service");
const main_user_service_1 = require("../../service/main.user.service");
let LeafletResolver = class LeafletResolver {
    resolve() {
        return System.import(["lib/leaflet/leaflet-src.js", 'lib/leaflet/leaflet.css'])
            .then(([L]) => {
            this.L = L;
            return L;
        });
    }
};
LeafletResolver = __decorate([
    core_1.Injectable()
], LeafletResolver);
exports.LeafletResolver = LeafletResolver;
let JournalComponent = class JournalComponent {
    constructor(location, route, journalService, el, userService) {
        this.location = location;
        this.route = route;
        this.journalService = journalService;
        this.el = el;
        this.userService = userService;
        this.offset = 0;
        this.deviceSelected = null;
        this.deviceList = userService.user.devices;
        console.log('deviceList -> ', this.deviceList);
        this.list = journalService.list;
        this.selectDate = null; //this.journalService.selectDate;
    }
    ngOnInit() {
        this.el.nativeElement.getElementsByClassName('scroll')[0].style.maxHeight = window.innerHeight - 200 + 'px';
    }
    onSelectDevice(device) {
        this.deviceSelected = device;
        this.journalService.getLastDeviceDate(device.device_key)
            .then(d => {
            if (d.error)
                throw new Error(d.error);
            this.selectDate = this.dateRoundDay(new Date(d.date));
            this.getTrack(device.device_key);
        });
    }
    stepGo(step) {
        if (0 < step) {
            this.selectDate = this.stepForwardDate(this.selectDate);
        }
        if (step < 0) {
            this.selectDate = this.stepBackDate(this.selectDate);
        }
        this.getTrack(this.deviceSelected.device_key);
    }
    getTrack(device_key) {
        const from = this.selectDate;
        const to = this.stepForwardDate(this.selectDate);
        this.journalService.getTrack(device_key, from, to)
            .then(data => {
            console.log(data);
        });
    }
    onClose() {
        this.location.back();
    }
    ngOnDestroy() {
        this.journalService.cleadData();
    }
    stepBackDate(d) {
        return new Date(d.getFullYear(), d.getMonth(), d.getDate() - 1);
    }
    stepForwardDate(d) {
        return new Date(d.getFullYear(), d.getMonth(), d.getDate() + 1);
    }
    dateRoundDay(d) {
        return new Date(d.getFullYear(), d.getMonth(), d.getDate());
    }
};
JournalComponent = __decorate([
    core_1.Component({
        //noinspection TypeScriptUnresolvedVariable
        moduleId: module.id,
        templateUrl: './journal.component.html',
        styleUrls: ['./journal.component.css'],
    }),
    __metadata("design:paramtypes", [common_1.Location,
        router_1.ActivatedRoute,
        journal_service_1.JournalService,
        core_1.ElementRef,
        main_user_service_1.UserService])
], JournalComponent);
exports.JournalComponent = JournalComponent;
//# sourceMappingURL=journal.component.js.map