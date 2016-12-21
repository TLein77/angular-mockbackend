import {Injectable} from "@angular/core";
import {Http, Response} from "@angular/http";
import {Observable} from "rxjs";
import {Hero} from "../hero/hero.model";

@Injectable()
export class HeroSearchService {

    constructor(
        private http: Http
    ) {}

    search(term:string): Observable<Hero[]> {
        return this.http
            .get(`http://localhost:8080/api/heroes/?name=${term}`)
            .map((r: Response) => r.json() as Hero[]);
    }
}