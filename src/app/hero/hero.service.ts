import {Injectable} from "@angular/core";
import {Hero} from "./hero.model";
import {Http, Headers} from "@angular/http";

@Injectable()
export class HeroService {
    private heroesUrl = 'api/heroes'; // URL to web api

    constructor(private http: Http) {
    }

    getHeroes(): Promise<Hero[]> {
        return this.http.get(this.heroesUrl)
            .toPromise()
            .then(response => response.json().data as Hero[])
            .catch(this.handleError);
    }

    getHero(id: number): Promise<Hero> {
        const url = `${this.heroesUrl}/${id}`;
        return this.http.get(url)
            .toPromise()
            .then(response => response.json().data as Hero[])
            .catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occured', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }
}