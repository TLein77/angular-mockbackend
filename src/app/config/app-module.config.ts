import {AppComponent} from "../app.component";
import {DashboardComponent} from "../dashboard/dashboard.component";
import {HeroSearchComponent} from "../hero-search/hero-search.component";
import {HeroesComponent} from "../heroes/heroes.component";
import {HeroDetailComponent} from "../hero-detail/hero-detail.component";
import {BrowserModule} from "@angular/platform-browser";
import {FormsModule} from "@angular/forms";
import {AppRoutingModule} from "../app-routing.module";
import {BaseRequestOptions, Http, HttpModule} from "@angular/http";
import {MockBackend} from "@angular/http/testing";
import {MockBackendService} from "../mock-backend/mock-backend.service";

export const appComponents = [
    AppComponent,
    DashboardComponent,
    HeroSearchComponent,
    HeroesComponent,
    HeroDetailComponent
];

export const appImports = getAppModules();

export const appProviders = getAppProviders();

function getAppProviders(): any[] {
    let providers = <any>[MockBackendService, MockBackend];
    if (process.env.ENV === 'mock') {
        providers.push(BaseRequestOptions);
        providers.push({
            provide: Http,
            deps: [MockBackend, BaseRequestOptions],
            useFactory: (backend: MockBackend, options: BaseRequestOptions) => { return new Http(backend, options); }
        });
    }
    return providers;
}

function getAppModules(): any[] {
    let modules = [BrowserModule, FormsModule, AppRoutingModule];
    if (process.env.ENV !== 'mock') {
        modules.push(HttpModule);
    }
    return modules;
}