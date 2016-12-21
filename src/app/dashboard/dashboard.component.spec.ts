import {TestBed, ComponentFixture} from "@angular/core/testing";
import {DashboardComponent} from "./dashboard.component";
import {HeroSearchComponent} from "../hero-search/hero-search.component";
import {RouterStub, RouterLinkStubDirective} from "../testing/router-stubs";
import {Router} from "@angular/router";
import {DebugElement} from "@angular/core";
import {By} from "@angular/platform-browser";
import {appProviders} from "../config/app-module.config";

let comp: DashboardComponent;
let fixture: ComponentFixture<DashboardComponent>;
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
        if (comp.heroes && comp.heroes.length > 0) {
            this.linksDes = fixture.debugElement.queryAll(By.directive(RouterLinkStubDirective));
            this.links = this.linksDes.map(de => de.injector.get(RouterLinkStubDirective) as RouterLinkStubDirective);
        }
    }
}

function createComponent() {
    fixture = TestBed.createComponent(DashboardComponent);
    comp = fixture.componentInstance;
    page = new Page();
    page.addPageElements();
}

describe('Dashboard', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [],
            declarations: [DashboardComponent, HeroSearchComponent, RouterLinkStubDirective],
            providers: [
                ...appProviders,
                {provide: Router, useClass: RouterStub}
            ]
        }).compileComponents();
        createComponent();
    });

    it('should work', () => {
        expect(fixture.componentInstance instanceof DashboardComponent).toBeTruthy('should create DashboardComponent');
    });
});
