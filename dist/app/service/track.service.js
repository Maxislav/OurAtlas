"use strict";
/**
 * Created by maxislav on 30.11.16.
 */
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
var TrackService_1;
const core_1 = require("@angular/core");
const R = require("ramda");
const util_1 = require("./util");
const socket_oi_service_1 = require("./socket.oi.service");
const map_service_1 = require("./map.service");
const track_var_1 = require("./track.var");
const distance_1 = require("../util/distance");
const dateformat = require("dateformat/lib/dateformat.js");
const toast_component_1 = require("../component/toast/toast.component");
//console.log(dateformat)
const F = parseFloat;
const I = parseInt;
let TrackService = TrackService_1 = class TrackService {
    constructor(io, mapService, ts) {
        this.io = io;
        this.mapService = mapService;
        this.ts = ts;
        this._trackList = [];
        this.arrayDelPoints = [];
        this._popupHash = {};
        this.layerIds = [];
        this._trackList = [];
        this.util = new util_1.Util();
        const socket = this.socket = io.socket;
        socket.on('file', d => {
            let xmlStr = '';
            const unit8Array = new Uint8Array(d);
            unit8Array.forEach(unit => {
                xmlStr += String.fromCharCode(unit);
            });
            this.showGpxTrack(xmlStr, 'load');
        });
    }
    resolve() {
        return undefined;
    }
    showGpxTrack(xmlStr, src) {
        const track = [];
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(xmlStr, "text/xml");
        const forEach = Array.prototype.forEach;
        const arrTrkpt = [];
        forEach.call(xmlDoc.getElementsByTagName('trkpt'), (item, i) => {
            arrTrkpt.push(item);
        });
        arrTrkpt.forEach((item, i) => {
            if (item.getAttribute('lon')) {
                item.setAttribute('id', i);
                const ele = item.getElementsByTagName('ele') ? item.getElementsByTagName('ele')[0] : null;
                const point = new track_var_1.Point(F(item.getAttribute('lon')), F(item.getAttribute('lat')), ele ? F(ele.innerHTML) : null);
                point.date = item.getElementsByTagName('time')[0].innerHTML;
                point.id = i;
                if (!item.getElementsByTagName('speed')[0] && 0 < i) {
                    const speed = document.createElement('speed');
                    const point1 = new track_var_1.Point(F(arrTrkpt[i - 1].getAttribute('lon')), F(arrTrkpt[i - 1].getAttribute('lat')), ele ? F(ele.innerHTML) : null);
                    const point2 = new track_var_1.Point(F(item.getAttribute('lon')), F(item.getAttribute('lat')), ele ? F(ele.innerHTML) : null);
                    const dist = distance_1.distance(point1, point2) * 1000;
                    const t1 = new Date(arrTrkpt[i - 1].getElementsByTagName('time')[0].innerHTML).getTime() / 1000;
                    const t2 = new Date(item.getElementsByTagName('time')[0].innerHTML).getTime() / 1000;
                    speed.innerHTML = dist / (t2 - t1) + '';
                    item.appendChild(speed);
                }
                point.speed = item.getElementsByTagName('speed')[0] ? F(item.getElementsByTagName('speed')[0].innerHTML) * 3.6 : 0;
                track.push(point);
            }
        });
        this.showTrack(track, xmlDoc);
    }
    setMap(map) {
        this.map = map;
    }
    showTrack(points, xmlDoc) {
        const $this = this;
        const coordinates = [];
        const trackList = this.trackList;
        const color = this._getColor();
        const map = this.mapService.map;
        points.forEach((point) => {
            coordinates.push(point);
        });
        let layerId = this.getLayerId('line-') + '';
        const data = {
            "type": "Feature",
            "properties": {},
            "geometry": {
                "type": "LineString",
                "coordinates": points
            }
        };
        map.addSource(layerId, {
            "type": "geojson",
            "data": data
        });
        map.addLayer({
            "id": layerId,
            "type": "line",
            "source": layerId,
            "layout": {
                "line-join": "round",
                "line-cap": "round"
            },
            "paint": {
                "line-color": color,
                "line-width": 8,
                "line-opacity": 0.8
            }
        });
        const updateLine = (points) => {
            data.geometry.coordinates = points;
            map.getSource(layerId).setData(data);
            tr.distance = this.util.distance(tr);
        };
        let srcPoints; //= this.addSrcPoints(points, xmlDoc, update);
        let isShowPonts = false;
        let tr = {
            hide: function () {
                map.removeLayer(layerId);
                map.removeSource(layerId);
                let index = R.findIndex(R.propEq('id', layerId))(trackList);
                trackList.splice(index, 1);
                console.log('delete track index', index);
                srcPoints && srcPoints.remove();
            },
            showSrcPoint: () => {
                if (!!srcPoints) {
                    srcPoints.remove();
                    srcPoints = null;
                }
                else {
                    srcPoints = this.addSrcPoints(points, xmlDoc, updateLine);
                }
            },
            hideSrcPoint: () => {
                srcPoints && srcPoints.remove();
            },
            update: updateLine,
            id: layerId,
            coordinates: coordinates,
            points: points,
            color: color,
            distance: 0,
            date: points[0].date,
            xmlDoc: xmlDoc,
        };
        tr.distance = this.util.distance(tr);
        this.util.bearing(tr.points);
        trackList.push(tr);
        console.log(tr);
        return tr;
    }
    delPoints(trackId, points) {
        console.log(trackId, points);
    }
    static getData(points) {
        return {
            "type": "FeatureCollection",
            "features": (() => {
                const features = [];
                points.forEach((item, i) => {
                    const f = {
                        properties: {
                            color: item.color,
                            point: item,
                            id: item.id,
                        },
                        "type": "Feature",
                        "geometry": {
                            "type": "Point",
                            "coordinates": item
                        }
                    };
                    features.push(f);
                });
                return features;
            })()
        };
    }
    colorWorker(points) {
        let worker;
        worker = {
            postMessage: () => {
                System.import('dist/app/util/get-color.js')
                    .then(({ Color }) => {
                    const data = new Color(points).getColors();
                    worker.onmessage({ data });
                });
            },
            onmessage: null
        };
        /*
           if(System.baseURL.match(/178/)){
   
   
   
           }else {
               worker = new Worker(System.baseURL+'dist/app/worker/color-speed.js');
           }*/
        return new Promise((resolve, reject) => {
            worker.postMessage([points]);
            worker.onmessage = resolve;
        });
    }
    addSrcPoints(points, xmlDoc, updateLine) {
        const map = this.mapService.map;
        const layerId = this.getLayerId('cluster-');
        let sourceData;
        const updatePoints = (points) => {
            const data = TrackService_1.getData(points);
            map.getSource(layerId).setData(data);
            updateLine(points);
        };
        const delPoint = (id) => {
            let index = R.findIndex(R.propEq('id', id))(points);
            if (-1 < index)
                points.splice(index, 1);
            const find = Array.prototype.find;
            if (xmlDoc) {
                const trkpt = find.call(xmlDoc.getElementsByTagName('trkpt'), (item => {
                    return item.getAttribute('id') == id;
                }));
                trkpt.parentNode.removeChild(trkpt);
            }
            else {
                this.arrayDelPoints.push(id);
            }
            this.colorWorker(points)
                .then(e => {
                let colorPoints = e.data[0];
                updatePoints(colorPoints);
            });
            sourceData = TrackService_1.getData(points);
            map.getSource(layerId).setData(sourceData);
        };
        const mousemove = (e) => {
            const features = map.queryRenderedFeatures(e.point, {
                layers: [layerId],
            });
            if (features.length) {
                const id = features[0].properties.id;
                const p = points.find((item) => {
                    return item.id == id;
                });
                this._popupHash[id] = this._popupHash[id] || this.createPopupEdit(p, (e) => {
                    delPoint(id);
                });
                if (this._popupHash[id].isShow) {
                    this._popupHash[id].timerUpdate();
                }
                else {
                    this._popupHash[id].show();
                }
            }
        };
        this.colorWorker(points)
            .then(e => {
            let colorPoints = e.data[0];
            let stops = e.data[1];
            sourceData = TrackService_1.getData(colorPoints);
            map.addSource(layerId, {
                type: "geojson",
                data: sourceData
            });
            map.addLayer({
                id: layerId,
                type: "circle",
                "paint": {
                    "circle-color": {
                        "property": "color",
                        "stops": stops,
                        "type": "categorical"
                    },
                    "circle-radius": 8
                },
                layout: {},
                source: layerId
            });
            map.on('mousemove', mousemove);
            map.on('click', mousemove);
        });
        return {
            remove: () => {
                map.off('click', mousemove);
                map.off('mousemove', mousemove);
                map.removeLayer(layerId);
            },
            update: updatePoints
        };
    }
    createPopupEdit(point, f) {
        const map = this.mapService.map;
        const mapboxgl = this.mapService.mapboxgl;
        const div = document.createElement('div');
        div.setAttribute('class', 'info-point');
        const btn = document.createElement('button');
        const content = `<div class="time">${dateformat(point.date, 'HH:MM:ss')}</div>` +
            `<div>${point.speed.toFixed(1) + 'km/h'}</div>`;
        div.innerHTML = content;
        btn.innerHTML = 'Удалить';
        div.appendChild(btn);
        const popup = new mapboxgl.Popup({ closeOnClick: false, offset: [0, -15], closeButton: true })
            .setLngLat(new mapboxgl.LngLat(point.lng, point.lat))
            .setDOMContent(div);
        //.addTo(map);
        const delClick = () => {
            popup.remove();
            f();
        };
        btn.addEventListener('click', delClick);
        /* setTimeout(()=>{
             btn.removeEventListener('click', delClick)
             popup.remove();
         }, 5000)*/
        return {
            timer: null,
            isShow: false,
            remove() {
                btn.removeEventListener('click', delClick);
                popup.remove();
                this.isShow = false;
            },
            show() {
                popup.addTo(map);
                this.timerUpdate();
                this.isShow = true;
            },
            timerUpdate() {
                if (this.timer) {
                    clearTimeout(this.timer);
                }
                this.timer = setTimeout(() => {
                    this.remove();
                }, 5000);
            }
        };
    }
    marker(point) {
        const map = this.mapService.map;
        const mapboxgl = this.mapService.mapboxgl;
        const icoContainer = document.createElement('div');
        icoContainer.classList.add("track-icon");
        const icoEl = document.createElement('div');
        icoContainer.appendChild(icoEl);
        const iconMarker = new mapboxgl.Marker(icoContainer, { offset: [-10, -10] })
            .setLngLat([point.lng, point.lat])
            .addTo(map);
        const marker = {
            lng: point.lng,
            lat: point.lat,
            bearing: point.bearing,
            _mapBearing: map.getBearing(),
            rotate: function () {
                let angle = this.bearing - this._mapBearing;
                icoEl.style.transform = "rotate(" + I(angle + '') + "deg)";
            },
            update: function (point) {
                this.lng = point.lng;
                this.lat = point.lat;
                this.bearing = point.bearing;
                if (point.bearing) {
                    this.rotate();
                }
                iconMarker.setLngLat([point.lng, point.lat]);
            },
            remove: function () {
                iconMarker.remove();
                map.off('move', rotate);
            }
        };
        const rotate = () => {
            const mapBearing = map.getBearing();
            if (marker._mapBearing != mapBearing) {
                marker._mapBearing = mapBearing;
                marker.rotate();
            }
        };
        map.on('move', rotate);
        return marker;
    }
    getLayerId(prefix) {
        prefix = prefix || '';
        const min = 0, max = 10000;
        const rand = prefix + Math.round(min + Math.random() * (max - min)).toLocaleString();
        if (-1 < this.layerIds.indexOf(rand)) {
            return this.getLayerId(prefix);
        }
        else {
            this.layerIds.push(rand);
            return rand;
        }
    }
    getRandom(min, max, int) {
        let rand = min + Math.random() * (max - min);
        if (int) {
            rand = Math.round(rand) + '';
        }
        return rand;
    }
    _getColor() {
        const I = parseInt;
        const colors = [];
        let c = ['0', '0', '0'];
        let k = I(this.getRandom(0, 2, true));
        c.forEach((r, i) => {
            if (i != k) {
                r = I(this.getRandom(0, 255, true)).toString(16);
            }
            else {
                r = (255).toString(16);
            }
            if (r.length < 2) {
                c[i] = '0' + r;
            }
            else {
                c[i] = r;
            }
        });
        return '#' + c.join('');
    }
    saveChange() {
        console.log(this.arrayDelPoints);
        if (this.arrayDelPoints.length) {
            this.socket.$emit('delPoints', this.arrayDelPoints)
                .then((d) => {
                this.arrayDelPoints.length = 0;
                if (d && d.result == 'ok') {
                    this.ts.show({
                        type: 'success',
                        text: 'Изменения сохранены'
                    });
                }
                console.log(d);
            });
        }
        else {
            this.ts.show({
                type: 'warning',
                text: 'Лог не существует в базе или нет изменений'
            });
        }
    }
    downloadTrack(points) {
        return this.socket.$emit('downloadTrack', this.formatBeforeSend(points))
            .then(d => {
            console.log(d);
            return d;
        });
    }
    formatBeforeSend(points) {
        return R.map(point => {
            return {
                lng: point.lng,
                lat: point.lat,
                date: point.date,
                speed: point.speed
            };
        }, points);
    }
    set map(value) {
        this._map = value;
    }
    get map() {
        return this._map;
    }
    get trackList() {
        return this._trackList;
    }
    set trackList(value) {
        this._trackList = value;
    }
};
TrackService = TrackService_1 = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [socket_oi_service_1.Io, map_service_1.MapService, toast_component_1.ToastService])
], TrackService);
exports.TrackService = TrackService;
//# sourceMappingURL=track.service.js.map