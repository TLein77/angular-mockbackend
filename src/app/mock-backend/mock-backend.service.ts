import {Injectable} from "@angular/core";
import {MockBackend, MockConnection} from "@angular/http/testing";
import {Response, ResponseOptions} from "@angular/http";
import {Hero} from "../hero/hero.model";
import {HEROES} from "./mock-heroes";

@Injectable()
export class MockBackendService {
    constructor(
        private backend: MockBackend
    ) {}

    start(): void {
        this.backend.connections.subscribe( (c: MockConnection) => {
            const URL = "http://localhost:8080/api/heroes";
            let heroIdRegex = /\/api\/heroes\/([0-9]+)/i;
            let heroes: Hero[] = HEROES;

            // GET
            if (c.request.url === URL && c.request.method === 0) {
                c.mockRespond(new Response(new ResponseOptions({
                    body: JSON.stringify(heroes)
                })));
            }
            // GET
            else if (c.request.url.match(heroIdRegex) && c.request.method === 0) {
                let matches = heroes.filter((hero) => {
                    return hero.id === +(c.request.url.match(heroIdRegex)[1])
                });
                c.mockRespond(new Response( new ResponseOptions({
                    body: JSON.stringify(matches[0])
                })));
            }
            // GET
            else if (c.request.url.indexOf(URL+'/?name=') !== -1 && c.request.method === 0) {
                let name = this.getParameterByName('name', c.request.url);
                let matches = heroes.filter(hero => {
                    return hero.name.toUpperCase().indexOf(name.toUpperCase()) !== -1
                });
                c.mockRespond(new Response(new ResponseOptions({
                    body: JSON.stringify(matches)
                })));
            }
            // POST
            else if (c.request.url === URL && c.request.method === 1) {
                let newHeroName = JSON.parse(c.request.getBody());
                let name: string = newHeroName.name;
                let newHeroId = Math.max.apply(Math, heroes.map(function(hero) {return hero.id;})) + 1;
                let newHero: Hero = new Hero(newHeroId, name);
                heroes.push(newHero);

                c.mockRespond(new Response(new ResponseOptions({
                    body: JSON.stringify(newHero)
                })));
            }
            // PUT
            else if (c.request.url.match(heroIdRegex) && c.request.method === 2) {
                let updatedHero: Hero = JSON.parse(c.request.getBody());
                let matches = heroes.filter((hero) => {
                    return hero.id === +(c.request.url.match(heroIdRegex)[1])
                });
                if (matches && matches.length === 1) {
                    Object.assign(matches[0], updatedHero);
                }

                c.mockRespond(new Response(new ResponseOptions({
                    body: JSON.stringify(matches[0])
                })));
            }
            // DELETE
            else if (c.request.url.match(heroIdRegex) && c.request.method === 3) {
                let heroId = +(c.request.url.match(heroIdRegex)[1]);

                heroes.splice(heroes.findIndex((hero: Hero) => hero.id === heroId), 1);

                c.mockRespond(new Response(new ResponseOptions({
                    body: JSON.stringify({})
                })));
            }
        });
    }

    private getParameterByName(name: string, url: string): string {
        name = name.replace(/[\[\]]/g, "\\$&");
        var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
            results = regex.exec(url);
        if (!results) return null;
        if (!results[2]) return '';
        return decodeURIComponent(results[2].replace(/\+/g, " "));
    }
}