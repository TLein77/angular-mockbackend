import {NgModule} from "@angular/core";
import {AppComponent} from "./app.component";
import {appImports, appComponents, appProviders} from "./config/app-module.config";
import './rxjs-extensions';

@NgModule({
    imports: [ ...appImports ],
    declarations: [ ...appComponents ],
    providers: [ ...appProviders ],
    bootstrap: [AppComponent]
})
export class AppModule {}