import {Component} from "@angular/core";
import {MockBackendService} from "./mock-backend/mock-backend.service";

import '../../public/css/styles.css';

@Component({
    selector: 'my-app',
    templateUrl: 'app.component.html',
    styleUrls: ['app.component.css']
})
export class AppComponent {
    title = 'Tour of Heroes';

    constructor(
        private mockBackendService: MockBackendService
    ) {
        if (process.env.ENV === 'mock') {
            this.mockBackendService.start();
        }
    }
}