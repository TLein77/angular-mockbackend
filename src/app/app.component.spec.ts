import {TestBed, ComponentFixture} from "@angular/core/testing";
import {AppComponent} from "./app.component";
import {appImports, appComponents, appProviders} from "./config/app-module.config";
import {RouterStub, RouterLinkStubDirective} from "./testing/router-stubs";
import {Router} from "@angular/router";
import {DashboardComponent} from "./dashboard/dashboard.component";
import {HeroesComponent} from "./heroes/heroes.component";
import {HeroDetailComponent} from "./hero-detail/hero-detail.component";
import {HeroSearchComponent} from "./hero-search/hero-search.component";
import {By} from "@angular/platform-browser";
import {DebugElement} from "@angular/core";
import {MockBackendService} from "./mock-backend/mock-backend.service";

let comp: AppComponent;
let fixture: ComponentFixture<AppComponent>;
let page: Page;

class Page {

    navSpy: jasmine.Spy;
    linksDes: DebugElement[];
    links: RouterLinkStubDirective[];

    constructor() {
        const compInjector = fixture.debugElement.injector;
        const router = compInjector.get(Router);

        this.navSpy = spyOn(router, 'navigate');
    }

    addPageElements() {
        fixture.detectChanges();
        this.linksDes = fixture.debugElement.queryAll(By.directive(RouterLinkStubDirective));
        this.links = this.linksDes.map(de => de.injector.get(RouterLinkStubDirective) as RouterLinkStubDirective);
    }
}

function createComponent() {
    fixture = TestBed.createComponent(AppComponent);
    comp = fixture.componentInstance;
    page = new Page();
    page.addPageElements();
}

describe('App', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [ ...appImports ],
            declarations: [ ...appComponents ],
            providers: [ ...appProviders, {provide: Router, useClass: RouterStub}, MockBackendService ]
        }).compileComponents().then();
        createComponent();
    });

    /*it ('should work', () => {
        expect(fixture.componentInstance instanceof AppComponent).toBeTruthy('should create AppComponent');
    });*/
});
