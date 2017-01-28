/**
 * Created by maxislav on 16.08.16.
 */
import {NgModule}      from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule}   from '@angular/forms';

import {AppComponent}  from './app.component';
import {routing} from './app.routing';
import {HeroesComponent} from "./heroes.component";
import {TransactionResolver} from "./transaction.resolve";
import {AuthComponent} from "./component/auth-component/auth.component";
import {MapComponent} from "./map.component";
import {InfoPositionComponent} from "./component/info-position/info-position-component";
import {MenuComponent} from "./component/menu/menu.component";
import {LocalStorage} from "./service/local-storage.service";
import {MenuTrackComponent} from "./component/menu/menu-track/menu-track.component";
import {Io} from "./service/socket.oi.service";
import {TrackService} from "./service/track.service";
import {TrackList} from "./component/menu/track-list/track-list.component";
import {MenuLoginComponent} from "./component/menu/menu-login/menu-login.component";
import {RegistrationComponent} from "./component/registration/registration.component";
import {Md5} from "./service/md5.service";
import {ToastComponent, ToastService} from "./component/toast/toast.component";
import {DeviceComponent} from "./component/device/device.component";
import {AuthService} from "./service/auth.service";
import {DeviceService} from "./service/device.service";
import {LogService} from "./service/log.service";
import {MarkerService} from "./service/marker.service";
import {MapService} from "./service/map.service";
import {LoginService} from "./service/login.service";
import {MenuAthleteComponent} from "./component/menu/menu-athlete/menu.athlete.component";
import {ProfileComponent} from "./component/profile/profile.component";
import {JournalComponent, LeafletResolver} from "./component/journal-component/journal.component";
import {FriendsComponent, UsersContainer} from "./component/friends-component/friends-component";
import {FriendsService} from "./service/friends.service";
import {UserService} from "./service/main.user.service";
import {TimerService} from "./service/timer.service";
import {PrivateArea} from "./component/private-area/private-area";
import {MapResolver} from "./directive/mapbox-gl.directive";
import {PrivateAreaService} from "./service/private.area.service";
import {NoFoundComponent} from "./no-found.component";
import {MapboxGlDirective} from "./directive/mapbox-gl.directive";
import {HelpContainer} from "./component/device/device.component";
import {OneTrack} from "./component/journal-component/one-track.component/one-track.component";

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        routing
    ],
    /**
     * Компоненты
     */
    declarations: [
        OneTrack,
        UsersContainer,
        RegistrationComponent,
        InfoPositionComponent,
        MapComponent,
        AuthComponent,
        AppComponent,
        HeroesComponent,
        HelpContainer,
        MenuComponent,
        MenuTrackComponent,
        MenuLoginComponent,
        MapboxGlDirective,
        TrackList,
        ToastComponent,
        DeviceComponent,
        MenuAthleteComponent,
        ProfileComponent,
        JournalComponent,
        FriendsComponent,
        PrivateArea,
        NoFoundComponent
    ],

    providers: [
        LeafletResolver,
        TransactionResolver,
        MenuComponent,
        LocalStorage,
        Io,
        TrackService,
        Md5,
        ToastService,
        AuthService,
        DeviceService,
        LogService,
        MapService,
        MarkerService,
        LoginService,
        FriendsService,
        UserService,
        TimerService,
        MapResolver,
        PrivateAreaService
    ],
    bootstrap: [
        AppComponent
    ]
})
export class AppModule {
}
