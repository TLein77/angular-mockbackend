import {Routes, RouterModule} from "@angular/router";
import {HeroDetailComponent} from "../hero-detail/hero-detail.component";
import {HeroesComponent} from "../heroes/heroes.component";
import {DashboardComponent} from "../dashboard/dashboard.component";
import {NgModule} from "@angular/core";

const routes: Routes = [
    {path: 'dashboard', component: DashboardComponent},
    {path: 'heroes', component: HeroesComponent},
    {path: 'detail/:id', component: HeroDetailComponent},
    {path: '', redirectTo: '/dashboard', pathMatch: 'full'}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}