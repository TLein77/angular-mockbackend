import {AppComponent} from "../app.component";
import {DashboardComponent} from "../dashboard/dashboard.component";
import {HeroSearchComponent} from "../hero-search/hero-search.component";
import {HeroesComponent} from "../heroes/heroes.component";
import {HeroDetailComponent} from "../hero-detail/hero-detail.component";
import {BrowserModule} from "@angular/platform-browser";
import {FormsModule} from "@angular/forms";
import {AppRoutingModule} from "../app-routing.module";
import {BaseRequestOptions, Http} from "@angular/http";
import {MockBackend} from "@angular/http/testing";

export const appComponents = [
    AppComponent,
    DashboardComponent,
    HeroSearchComponent,
    HeroesComponent,
    HeroDetailComponent
];

export const appImports = [
    BrowserModule,
    FormsModule,
    AppRoutingModule
];

export const appProviders = [
    BaseRequestOptions,
    MockBackend,
    {
        provide: Http,
        deps: [MockBackend, BaseRequestOptions],
        useFactory: (backend: MockBackend, options: BaseRequestOptions) => { return new Http(backend, options); }
    }
];