import {NgModule} from "@angular/core";
import {FormsModule} from "@angular/forms";
import {BrowserModule} from "@angular/platform-browser";

import {AppComponent} from "./app.component";
import {AppRoutingModule} from "./app-routing.module";
import {DashboardComponent} from "./dashboard/dashboard.component";
import {HeroService} from "./hero/hero.service";
import {HeroesComponent} from "./heroes/heroes.component";
import {HeroDetailComponent} from "./hero-detail/hero-detail.component";
import {HeroSearchComponent} from "./hero-search/hero-search.component";

/** Imports used for In Memory DB **/
//import {InMemoryWebApiModule} from "angular-in-memory-web-api";
//import {InMemoryDataService} from "./in-memory-data.service";

/** Imports used for MockBackend **/
import {BaseRequestOptions, Http} from "@angular/http";
import {MockBackend} from "@angular/http/testing";
import {MockBackendService} from "./mock-backend/mock-backend.service";

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        AppRoutingModule
        //HttpModule,
        //InMemoryWebApiModule.forRoot(InMemoryDataService)
    ],
    declarations: [
        AppComponent,
        HeroesComponent,
        HeroDetailComponent,
        DashboardComponent,
        HeroSearchComponent
    ],
    providers: [
        HeroService,
        BaseRequestOptions,
        MockBackend,
        {
            provide: Http,
            deps: [MockBackend, BaseRequestOptions],
            useFactory: (backend: MockBackend, options: BaseRequestOptions) => { return new Http(backend, options); }
        },
        MockBackendService
    ],
    bootstrap: [AppComponent]
})
export class AppModule {}