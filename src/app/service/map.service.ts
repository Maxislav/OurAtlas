/**
 * Created by maxislav on 20.10.16.
 */
import { Injectable, ApplicationRef } from '@angular/core';
import { SimpleChanges, OnChanges } from '@angular/core';


@Injectable()
export class MapService {

    public events: {
        load: Function[]
    };
    public map: any;
    public lat: number;
    public lng: number;
    public lngMap: number;
    public latMap: number;
    public zoom: number;
    public foo: Function;
    //private ref: ApplicationRef


    constructor(private ref: ApplicationRef){
            this.events = {
                load: []
            }
       // this.ref = ref;
        //this.emitter = new EventEmitter()
    }

    setMap(map: any){
        this.map = map;

        map.on('load', ()=>{
            let LngLat = map.getCenter();
            this.lngMap = LngLat.lng.toFixed(4);
            this.latMap = LngLat.lat.toFixed(4);
            this.ref.tick()
        });

        map.on('mousemove', (e)=>{
            this.lat = e.lngLat.lat.toFixed(4);
            this.lng = e.lngLat.lng.toFixed(4);
        });

        map.on('move', (e)=>{

            let LngLat = map.getCenter();
            this.lngMap = LngLat.lng.toFixed(4);
            this.latMap = LngLat.lat.toFixed(4);

        });
        /*this.zoom = map.getZoom();

        map.on('mousemove', (e)=>{
            this.lat = e.latlng.lat;
            this.lng = e.latlng.lng;
            this.foo && this.foo(this.lat, this.lng, this.zoom)
        });
        map.on("zoom", (e)=>{
            this.zoom = map.getZoom();
            this.foo && this.foo(this.lat, this.lng, this.zoom)
        })*/

    }

    registerEvent(name: string, f: Function){

        //console.log(this.events)

       // debugger
        this.events[name] = this.events[name] || [];
        this.events[name].push(f)
    }    

    registerChanges(foo: Function){
        this.foo = foo;
    }



}