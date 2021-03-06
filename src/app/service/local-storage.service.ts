/**
 * Created by maxislav on 25.11.16.
 */
import {Injectable} from "@angular/core";

@Injectable()
export class LocalStorage{
    

    private prefix: string;
    private _userKey: string;
    private _mapCenter: {
        lng: number,
        lat:number,
        zoom: number
    };

    constructor(){
        this.prefix = window.location.hostname;
        this._mapCenter = {
            lng: null,
            lat: null,
            zoom: null
        };
        var strMapCenter =  JSON.stringify(this._mapCenter);
        if(!localStorage.getItem(this.prefix+'-'+'map-center')){
            localStorage.setItem(this.prefix+'-'+'map-center', strMapCenter)
        }else{
            this.mapCenter = JSON.parse(localStorage.getItem(this.prefix+'-'+'map-center'))
        }

    }

    get mapCenter():{lng:number; lat:number; zoom:number} {
        return this._mapCenter;
    }

    set mapCenter(value:{lng:number; lat:number; zoom:number}) {
        localStorage.setItem(this.prefix+'-'+'map-center', JSON.stringify(value));
        this._mapCenter = value;
    }

    set userKey(key){
        if(key){
            localStorage.setItem(this.prefix+'-'+'user-key',key);
        }else{
            localStorage.removeItem(this.prefix+'-'+'user-key')
        }

        this._userKey = key;
    }

    get userKey(){
        this._userKey = localStorage.getItem(this.prefix+'-'+'user-key');
        return this._userKey;
    }

}